// Estou criando a seção "Conheça a MOSS Burger" com DUAS coisas:
// 1) Vídeo promocional incorporado do YouTube (embed permitido pelo próprio YouTube)
// 2) Mapa da loja via Google Maps (grátis, sem precisar de chave de API)

import './Extras.css'

// ============================================================
// 🎬 COMO COLOCAR O VÍDEO REAL:
// 1. Abra o vídeo desejado no YouTube
// 2. O endereço é: https://www.youtube.com/watch?v=XXXXXXXXXXX
//                                          ^^^^^^^^^^^ este é o ID
// 3. Cole o ID entre aspas abaixo. Ex.: const VIDEO_ID = 'dQw4w9WgXcQ'
// Enquanto estiver vazio, aparece o espaço reservado (placeholder).
// Valor atual: vídeo demonstrativo (produção de comercial de hambúrguer).
// ============================================================
const VIDEO_ID = 'DhGoIb5oS-M'

export default function Extras() {
  // Se VIDEO_ID tiver valor, mostro o vídeo; senão, mostro o aviso
  const temVideo = VIDEO_ID.trim().length > 0

  return (
    <section className="secao extras">
      <div className="container">
        <h2 className="titulo-secao">Conheça a MOSS Burger</h2>
        <p className="subtitulo-secao">Vídeo de divulgação e onde estamos</p>

        <div className="extras-grade">

          {/* ---------- VÍDEO ---------- */}
          <div className="video-caixa">
            <h3>🎬 Vídeo promocional</h3>
            {temVideo ? (
              // iframe do YouTube: incorporar vídeos é permitido pelos termos do YouTube
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                  title="Vídeo promocional MOSS Burger"
                  // Permissões padrão do player moderno do YouTube
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="video-placeholder">
                <span>🎬</span>
                <p>Espaço reservado para o vídeo promocional</p>
                <small>
                  Basta colocar o ID do vídeo na constante <b>VIDEO_ID</b>,
                  no início do arquivo <b>Extras.jsx</b>
                </small>
              </div>
            )}
          </div>

          {/* ---------- MAPA ---------- */}
          <div className="mapa-caixa">
            <h3>📍 Onde estamos</h3>
            <div className="mapa-frame">
              {/* Google Maps modo incorporado — grátis e sem chave de API.
                  Para trocar o endereço, altere o texto após q= (use %20 no lugar dos espaços) */}
              <iframe
                src="https://maps.google.com/maps?q=Rua%20das%20Palmeiras%2C%20123&z=15&output=embed"
                title="Mapa da MOSS Burger"
                loading="lazy" // só carrega quando a pessoa chega perto (performance)
              />
            </div>
            <p className="mapa-endereco">
              Rua das Palmeiras, 123 — Centro · <b>Ter a Dom, 18h às 23h30</b>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
