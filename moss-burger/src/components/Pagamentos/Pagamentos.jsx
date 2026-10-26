// Estou criando a seção de PAGAMENTOS (versão 1 — sem gateway):
// mostro as formas aceitas, a chave Pix para copiar e o QR Code.
// Regra do projeto: NENHUM pagamento real é processado pelo site.
// O QR Code real é GERADO NO APP DO BANCO pelo cliente — eu exibo a imagem.

import { useState } from 'react'
import './Pagamentos.css'

// ============================================================
// 💳 DADOS DO PIX (fictícios — troque pelos do cliente real)
// ============================================================
const CHAVE_PIX = 'pagamentos@mossburger.com.br'

// QR Code gerado gratuitamente pela API pública qrserver.
// Ele lê o TEXTO da chave (demonstração visual).
// ⚠️ Em produção: substitua o src pela imagem do QR Code BR Code
//    que o cliente baixa do app do banco (formato que o banco lê
//    e já abre a tela de pagamento com valor pronto).
const QR_CODE =
  'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' +
  encodeURIComponent(CHAVE_PIX)

export default function Pagamentos() {
  const [copiado, setCopiado] = useState(false)

  // Copio a chave para a área de transferência do computador
  async function copiarChave() {
    try {
      await navigator.clipboard.writeText(CHAVE_PIX)
      setCopiado(true)
      // Volto ao estado normal depois de 2 segundos
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // Se o navegador bloquear a cópia automática, mostro a chave para copiar à mão
      alert('Sua chave Pix: ' + CHAVE_PIX)
    }
  }

  return (
    <section className="secao pagamentos" id="pagamentos">
      <div className="container">
        <h2 className="titulo-secao claro">Formas de pagamento</h2>
        <p className="subtitulo-secao claro">Rápido, seguro e sem complicação</p>

        <div className="pagamentos-grade">

          {/* Selo das formas aceitas */}
          <div className="selos-pagamento">
            <div className="selo">💵 <span>Dinheiro<br /><small>na entrega</small></span></div>
            <div className="selo">📱 <span>Pix<br /><small>na entrega ou antecipado</small></span></div>
            <div className="selo">💳 <span>Cartão<br /><small>débito e crédito</small></span></div>
          </div>

          {/* Cartão do Pix com QR Code + chave copiável */}
          <div className="cartao-pix">
            <h3>⚡ Pague com Pix</h3>
            <div className="pix-conteudo">
              <img src={QR_CODE} alt="QR Code do Pix" className="qr-code" />
              <div className="pix-dados">
                <p className="pix-label">Chave Pix (e-mail):</p>
                <p className="pix-chave">{CHAVE_PIX}</p>
                <button className="btn btn-primario" onClick={copiarChave}>
                  {copiado ? '✅ Copiado!' : '📋 Copiar chave'}
                </button>
                <small className="pix-aviso">
                  Ou aponte a câmera do seu banco para o QR Code.
                  Na entrega, o pedido também pode ser pago em dinheiro ou cartão.
                </small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
