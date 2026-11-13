"""Grava a apresentação vertical de 30 segundos da página inicial.

Requer Playwright (Python), Chrome/Edge e ffmpeg no PATH. A narração em áudio
é reaproveitada do vídeo anterior (ela não cita preço) e as legendas da faixa
inferior seguem o arquivo .vtt publicado no site.

Tudo é injetado antes da navegação (add_init_script), para que a primeira
imagem já tenha a faixa de endereço, a legenda e o quadro fixo no lugar do
vídeo antigo. As legendas usam o relógio do vídeo (performance.now()), então
continuam em sincronia com o áudio.

Uso:
  python tools/recordar-apresentacao-30s.py --site ..\\..\\..\\ --saida assets\\video\\moss-apresentacao-30s.mp4
"""
import argparse
import json
import shutil
import subprocess
import tempfile
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from threading import Thread

from playwright.sync_api import sync_playwright

# Legendas: início, fim e texto (mesma ordem do arquivo .vtt do site).
LEGENDAS = [
    (0.4, 3.4, 'Seu negócio merece destaque na internet!'),
    (3.4, 8.8, 'Na MOSS Digital, criamos sites profissionais, lojas virtuais e sistemas personalizados.'),
    (8.8, 14.6, 'Soluções para apresentar sua empresa, divulgar seus serviços e facilitar o dia a dia.'),
    (14.6, 18.8, 'Dê o próximo passo para fortalecer sua presença digital.'),
    (18.8, 22.3, 'Acesse: mossdigital.com.br.'),
    (22.3, 26.2, 'MOSS Digital. Seu negócio conectado a novas possibilidades.'),
]

# Roteiro de rolagem: tempo em segundos (relógio do vídeo) -> alvo na página.
ROTEIRO = [
    (0.0, 'topo'),
    (3.0, 'topo'),
    (5.2, 'apresentacao'),
    (8.2, 'destaques'),
    (11.4, 'destaques+'),
    (14.6, 'preco'),
    (18.4, 'preco+'),
    (20.4, 'livros'),
    (22.4, 'portfolio'),
    (24.4, 'curriculo'),
    (26.2, 'contato'),
    (30.2, 'fim'),
]

# Cena mostrada enquanto cada frase da narração é falada.
CENAS = ['topo', 'apresentacao', 'destaques', 'preco', 'livros', 'contato']
FIM_EM = 27.2

CSS = """
.rec-topo{position:fixed;top:0;left:0;right:0;height:62px;z-index:999999;background:#06162c;
border-bottom:1px solid #14345c;display:flex;align-items:center;justify-content:center;
color:#7fe3ff;font:600 26px/1 'Segoe UI',system-ui,sans-serif;letter-spacing:.01em}
.rec-fundo{position:fixed;bottom:0;left:0;right:0;min-height:80px;z-index:999999;background:rgba(4,14,28,.93);
border-top:1px solid #14345c;display:flex;align-items:center;justify-content:center;padding:10px 28px;
text-align:center;color:#fff;font:500 22px/1.35 'Segoe UI',system-ui,sans-serif}
.rec-video{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 0%,#12406f,#06162c 72%);
display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;color:#cfe4ff;
font:600 17px/1.5 'Segoe UI',system-ui,sans-serif;text-align:center;padding:26px}
.rec-video img{width:170px;height:auto}
.rec-play{width:84px;height:84px;border-radius:50%;background:#2479ef;display:flex;align-items:center;
justify-content:center;box-shadow:0 18px 44px -14px #2479ef}
.rec-play span{width:0;height:0;border-left:26px solid #fff;border-top:16px solid transparent;
border-bottom:16px solid transparent;margin-left:6px}
.rec-fim{position:fixed;inset:0;z-index:999998;background:radial-gradient(90% 70% at 50% 18%,#123c66,#06162c 68%);
display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#eaf3ff;
text-align:center;opacity:0;transition:opacity .7s ease;pointer-events:none}
.rec-fim.visivel{opacity:1}
.rec-fim img{width:210px;height:auto}
.rec-fim b{font:800 34px/1.1 'Segoe UI',system-ui,sans-serif;letter-spacing:.01em}
.rec-fim span{font:600 28px/1.3 'Segoe UI',system-ui,sans-serif;color:#7fe3ff}
.rec-fim small{font:500 20px/1.5 'Segoe UI',system-ui,sans-serif;color:#a9c2dd;max-width:520px}
.rec-fim .rec-zap{display:inline-block;margin-top:8px;background:#25d366;color:#052e16;font:800 22px/1
system-ui,sans-serif;padding:16px 26px;border-radius:999px}
.rec-quadro{padding-top:62px}
.rec-quadro .video-frame{position:relative}
.rec-quadro video{visibility:hidden}
.rec-quadro .zap-flutuante{bottom:104px}
"""

INIT_JS = """
(() => {
  const CSS = __CSS__;
  const logomarca = 'assets/img/fotos/moss-logo-horizontal.webp';
  const injetarEstilo = () => {
    if (!document.head || document.getElementById('rec-estilo')) return;
    const estilo = document.createElement('style');
    estilo.id = 'rec-estilo';
    estilo.textContent = CSS;
    document.head.appendChild(estilo);
  };
  const quadro = () => {
    const caixa = document.querySelector('.video-frame');
    if (!caixa || caixa.querySelector('.rec-video')) return;
    const div = document.createElement('div');
    div.className = 'rec-video';
    div.innerHTML = '<img src="' + logomarca + '" alt="">' +
      '<div class="rec-play"><span></span></div>' +
      '<div>Apresentação de 30 segundos<br>MOSS Digital</div>';
    caixa.append(div);
  };
  const montar = () => {
    injetarEstilo();
    document.body.classList.add('rec-quadro');
    if (!document.getElementById('rec-topo')) {
      const topo = document.createElement('div');
      topo.className = 'rec-topo';
      topo.id = 'rec-topo';
      topo.textContent = 'mossdigital.com.br';
      const fundo = document.createElement('div');
      fundo.className = 'rec-fundo';
      fundo.id = 'rec-fundo';
      const legenda = document.createElement('span');
      legenda.id = 'rec-legenda';
      fundo.append(legenda);
      const fim = document.createElement('div');
      fim.className = 'rec-fim';
      fim.id = 'rec-fim';
      fim.innerHTML = '<img src="' + logomarca + '" alt=""><b>MOSS Digital</b>' +
        '<span>mossdigital.com.br</span>' +
        '<small>Seu negócio conectado a novas possibilidades.</small>' +
        '<span class="rec-zap">Fale com a MOSS no WhatsApp</span>';
      document.body.append(topo, fundo, fim);
    }
    quadro();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
  new MutationObserver(() => { injetarEstilo(); quadro(); })
    .observe(document, {childList: true, subtree: true});
})()
"""

# Roteiro de rolagem conduzido pelo relógio do vídeo (performance.now()).
# As cenas trocam junto com as frases da narração: cada frase tem a cena que
# combina com o que está sendo dito enquanto ela é falada.
RODAR_JS = """
async ({cenas, legendas, fimEm}) => {
  const topo = sel => { const el = document.querySelector(sel); return el ? el.getBoundingClientRect().top + window.scrollY : 0; };
  const alvo = nome => {
    switch (nome) {
      case 'topo': return 0;
      case 'apresentacao': return topo('#apresentacao') - 90;
      case 'destaques': return topo('#modelos') - 70;
      case 'destaques+': return topo('#modelos') + 360;
      case 'preco': return topo('#site-preco') - 110;
      case 'preco+': return topo('#site-preco') + 180;
      case 'livros': return topo('#livros-digitais') - 110;
      case 'portfolio': return topo('#portfolio-promo') - 110;
      case 'curriculo': return topo('#curriculo-promo') - 110;
      case 'contato': return topo('#contato') - 120;
      case 'fim': return Math.max(0, document.body.scrollHeight - window.innerHeight);
      default: return 0;
    }
  };
  const suave = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const legenda = document.getElementById('rec-legenda');
  const fim = document.getElementById('rec-fim');
  const agora = () => performance.now() / 1000;

  // Pontos de rolagem: troca de cena acontece na virada entre duas frases.
  const pontos = [[0, alvo(cenas[0])]];
  legendas.forEach((frase, i) => {
    if (i > 0) pontos.push([Math.max(0.2, frase.inicio - 0.3), alvo(cenas[i - 1])]);
    pontos.push([frase.inicio + 0.3, alvo(cenas[i])]);
  });
  pontos.push([fimEm, alvo('fim')]);
  pontos.push([fimEm + 3.2, alvo('fim')]);

  const posicao = t => {
    for (let i = 0; i < pontos.length - 1; i++) {
      const [t0, y0] = pontos[i], [t1, y1] = pontos[i + 1];
      if (t >= t0 && t <= t1) return y0 + (y1 - y0) * suave((t - t0) / Math.max(0.001, t1 - t0));
    }
    return pontos[pontos.length - 1][1];
  };

  while (agora() < pontos[pontos.length - 1][0] + 1.4) {
    const t = agora();
    window.scrollTo(0, posicao(t));
    const leg = legendas.find(l => t >= l.inicio && t < l.fim);
    if (legenda) legenda.textContent = leg ? leg.texto : '';
    if (fim) fim.classList.toggle('visivel', t >= fimEm);
    await new Promise(r => requestAnimationFrame(r));
  }
}
"""


class Servidor(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def ffmpeg(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)


def duracao(caminho):
    saida = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', str(caminho)],
        capture_output=True, text=True, check=True)
    return float(json.loads(saida.stdout)['format']['duration'])


def principal():
    ap = argparse.ArgumentParser()
    ap.add_argument('--site', required=True, help='Pasta da página inicial (raiz do site)')
    ap.add_argument('--saida', required=True, help='MP4 final')
    ap.add_argument('--poster', help='Imagem de capa (webp) gerada a partir do vídeo')
    ap.add_argument('--poster-em', type=float, default=1.8, help='Segundo do vídeo usado na capa')
    ap.add_argument('--audio', help='Faixa de áudio com a narração (m4a ou mp4)')
    ap.add_argument('--timings', help='JSON da narração (gerado por gerar-narracao-30s.py)')
    ap.add_argument('--duracao', type=float, default=30.0)
    args = ap.parse_args()

    legendas = [{'inicio': i, 'fim': f, 'texto': t} for i, f, t in LEGENDAS]
    if args.timings:
        legendas = json.loads(Path(args.timings).read_text(encoding='utf-8'))
    cenas = CENAS[:len(legendas)]

    site = Path(args.site).resolve()
    saida = Path(args.saida).resolve()
    saida.parent.mkdir(parents=True, exist_ok=True)

    servidor = ThreadingHTTPServer(('127.0.0.1', 0), partial(Servidor, directory=str(site)))
    Thread(target=servidor.serve_forever, daemon=True).start()
    porta = servidor.server_port

    with tempfile.TemporaryDirectory() as tmp:
        pasta = Path(tmp)
        with sync_playwright() as p:
            navegador = p.chromium.launch(channel='msedge')
            contexto = navegador.new_context(
                viewport={'width': 720, 'height': 1280},
                device_scale_factor=1,
                record_video_dir=str(pasta),
                record_video_size={'width': 720, 'height': 1280},
                locale='pt-BR',
            )
            pagina = contexto.new_page()
            pagina.add_init_script(script=INIT_JS.replace('__CSS__', json.dumps(CSS)))
            pagina.goto(f'http://127.0.0.1:{porta}/index.html', wait_until='load')
            pagina.wait_for_load_state('networkidle')
            pagina.evaluate('document.fonts ? document.fonts.ready : true')
            pagina.evaluate(RODAR_JS, {'cenas': cenas, 'legendas': legendas, 'fimEm': FIM_EM})

            contexto.close()
            bruto = next(pasta.glob('*.webm'))
            sem_audio = pasta / 'sem-audio.mp4'
            ffmpeg('-i', str(bruto), '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30',
                   '-preset', 'medium', '-crf', '22', '-t', f'{args.duracao}', '-movflags', '+faststart',
                   str(sem_audio))
            # A captura começa um pouco depois da navegação: repõe os quadros que faltarem.
            faltando = args.duracao - duracao(sem_audio)
            if faltando > 0.02:
                completo = pasta / 'completo.mp4'
                ffmpeg('-i', str(sem_audio), '-vf', f'tpad=stop_mode=clone:stop_duration={faltando + 0.2:.2f}',
                       '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', '-r', '30',
                       str(completo))
                sem_audio = completo
            if args.audio:
                ffmpeg('-i', str(sem_audio), '-i', args.audio, '-map', '0:v:0', '-map', '1:a:0',
                       '-c:v', 'copy', '-c:a', 'aac', '-b:a', '96k', '-ar', '24000', '-ac', '1',
                       '-t', f'{args.duracao}', '-movflags', '+faststart', str(saida))
            else:
                shutil.copy(sem_audio, saida)
            if args.poster:
                ffmpeg('-i', str(saida), '-ss', f'{args.poster_em}', '-frames:v', '1', '-q:v', '80',
                       '-c:v', 'libwebp', '-quality', '84', str(args.poster))
            navegador.close()
    servidor.shutdown()
    print(f'OK: {saida} ({saida.stat().st_size // 1024} KB)')


if __name__ == '__main__':
    principal()
