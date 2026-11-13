"""Gera a narração natural da apresentação de 30 segundos.

Usa vozes neurais do Edge (edge-tts) em português do Brasil. Cada frase é
sintetizada em velocidade de conversa, tem o silêncio das bordas cortado e é
encaixada numa linha do tempo com pausas curtas entre as frases. A linha do
tempo vira a legenda .vtt e o roteiro de rolagem do vídeo, então a voz fica
natural e alinhada às cenas.

Requer edge-tts e ffmpeg no PATH.

Uso:
  python tools/gerar-narracao-30s.py --saida assets\\video\\narracao.m4a --timings narracao.json --vtt assets\\video\\moss-apresentacao-30s.vtt
"""
import argparse
import asyncio
import json
import subprocess
import tempfile
from pathlib import Path

import edge_tts

# Frases da narração, na ordem do roteiro.
FRASES = [
    'Seu negócio merece destaque na internet!',
    'Na MOSS Digital, criamos sites profissionais, lojas virtuais e sistemas personalizados.',
    'Soluções para apresentar sua empresa, divulgar seus serviços e facilitar o dia a dia.',
    'Dê o próximo passo para fortalecer sua presença digital.',
    'Acesse: mossdigital.com.br.',
    'MOSS Digital. Seu negócio conectado a novas possibilidades.',
]


def ffprobe_duracao(caminho):
    saida = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', str(caminho)],
        capture_output=True, text=True, check=True)
    return float(json.loads(saida.stdout)['format']['duration'])


def ffmpeg(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)


async def falar(texto, voz, taxa, destino):
    await edge_tts.Communicate(texto, voz, rate=taxa, volume='+0%').save(str(destino))


def marca_tempo(segundos):
    horas = int(segundos // 3600)
    minutos = int((segundos % 3600) // 60)
    resto = segundos % 60
    return f'{horas:02d}:{minutos:02d}:{resto:06.3f}'


def principal():
    ap = argparse.ArgumentParser()
    ap.add_argument('--saida', required=True, help='Faixa de áudio final')
    ap.add_argument('--timings', help='JSON com os tempos de cada frase')
    ap.add_argument('--vtt', help='Arquivo .vtt com as legendas sincronizadas')
    ap.add_argument('--voz', default='pt-BR-FranciscaNeural')
    ap.add_argument('--taxa', default='+0%', help='Velocidade da fala (padrão: natural)')
    ap.add_argument('--inicio', type=float, default=0.4, help='Pausa antes da primeira frase')
    ap.add_argument('--pausa', type=float, default=0.55, help='Pausa entre as frases')
    ap.add_argument('--duracao', type=float, default=30.0)
    args = ap.parse_args()

    with tempfile.TemporaryDirectory() as tmp:
        pasta = Path(tmp)
        pedacos = []
        for indice, frase in enumerate(FRASES):
            bruto = pasta / f'frase-{indice}.mp3'
            limpo = pasta / f'frase-{indice}-limpa.mp3'
            asyncio.run(falar(frase, args.voz, args.taxa, bruto))
            # Corta o silêncio das bordas para medir só a fala.
            ffmpeg('-i', str(bruto), '-af',
                   'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.02,'
                   'areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.02,areverse',
                   '-c:a', 'libmp3lame', '-q:a', '4', str(limpo))
            d = ffprobe_duracao(limpo)
            pedacos.append({'indice': indice, 'texto': frase, 'arquivo': limpo, 'duracao': d})
            print(f'frase {indice}: {d:.2f}s · "{frase[:46]}"')

        cursor = args.inicio
        for pedaco in pedacos:
            pedaco['inicio'] = round(cursor, 3)
            pedaco['fim'] = round(cursor + pedaco['duracao'], 3)
            cursor = pedaco['fim'] + args.pausa
        fim_voz = pedacos[-1]['fim']
        print(f'narração termina em {fim_voz:.2f}s de {args.duracao:.0f}s')

        entradas = []
        filtros = []
        for indice, pedaco in enumerate(pedacos):
            entradas += ['-i', str(pedaco['arquivo'])]
            filtros.append(f'[{indice}]adelay={int(pedaco["inicio"] * 1000)}:all=1[a{indice}]')
        misturar = ''.join(f'[a{i}]' for i in range(len(pedacos)))
        filtros.append(f'{misturar}amix=inputs={len(pedacos)}:normalize=0[mix]')
        filtros.append('[mix]alimiter=limit=0.95[out]')
        ffmpeg(*entradas, '-filter_complex', ';'.join(filtros), '-map', '[out]',
               '-t', f'{args.duracao}', '-c:a', 'aac', '-b:a', '96k', '-ar', '48000', '-ac', '1',
               str(Path(args.saida).resolve()))

        if args.timings:
            dados = [{'inicio': p['inicio'], 'fim': p['fim'], 'texto': p['texto']} for p in pedacos]
            Path(args.timings).write_text(json.dumps(dados, ensure_ascii=False, indent=2), encoding='utf-8')
        if args.vtt:
            linhas = ['WEBVTT', '']
            for pedaco in pedacos:
                linhas.append(f"{marca_tempo(pedaco['inicio'])} --> {marca_tempo(pedaco['fim'])}")
                linhas.append(pedaco['texto'])
                linhas.append('')
            Path(args.vtt).write_text('\n'.join(linhas), encoding='utf-8')
    print(f'OK: {args.saida} ({Path(args.saida).stat().st_size // 1024} KB)')


if __name__ == '__main__':
    principal()
