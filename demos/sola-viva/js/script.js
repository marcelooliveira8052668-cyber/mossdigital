// SOLA VIVA — demonstração didática de gestão local de fichas e contato pelo WhatsApp.
(() => { // Isolamos as variáveis para não poluir o escopo global.
  'use strict'; // Impede alguns tipos de erros silenciosos.
  const WHATSAPP = '5511942038103'; // Número autorizado para as demos da MOSS Digital.
  const KEY = 'moss-demo-sola-viva-fichas-v1'; // Chave única do armazenamento deste site.
  const $ = (selector) => document.querySelector(selector); // Atalho para localizar elementos.
  const menuButton = $('#menu-toggle'); // Botão do menu móvel.
  const nav = $('#main-nav'); // Área dos links.
  menuButton?.addEventListener('click', () => { // Alterna o menu no celular.
    const opened = nav.classList.toggle('open'); // Abre ou fecha.
    menuButton.setAttribute('aria-expanded', String(opened)); // Informa o estado a leitores de tela.
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton?.setAttribute('aria-expanded','false'); })); // Fecha após navegar.
  document.querySelectorAll('img[data-photo]').forEach(image => { // Verifica fotografias opcionais.
    const photo = new Image(); // Cria imagem de teste.
    photo.onload = () => { image.src = image.dataset.photo; }; // Troca o marcador somente se existir o arquivo.
    photo.src = image.dataset.photo; // Tenta carregar a fotografia indicada no HTML.
  });
  const openWhatsApp = (message) => { // Abre conversa sem enviar mensagem automaticamente.
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`; // Monta URL válida.
    window.open(url, '_blank', 'noopener,noreferrer'); // Nova guia de conversa.
  };
  document.querySelectorAll('[data-service]').forEach(button => { // Pré-seleciona o serviço ao clicar.
    button.addEventListener('click', () => { // Ação do visitante.
      $('#lead-service').value = button.dataset.service; // Altera o select.
      $('#solicitar').scrollIntoView({behavior:'smooth'}); // Leva até o orçamento.
    });
  });
  $('#lead-form')?.addEventListener('submit', event => { // Envio de lead, sem backend.
    event.preventDefault(); // Evita recarregar a página.
    const data = new FormData(event.currentTarget); // Obtém somente os campos preenchidos.
    const message = 'Olá! Vim pela demo Sola Viva.\n' + Array.from(data, ([name,value]) => `${name}: ${String(value).trim()}`).join('\n'); // Formata texto.
    openWhatsApp(message); // O usuário revisa antes de enviar.
  });
  const load = () => { // Recupera fichas fictícias do próprio navegador.
    try { const value = JSON.parse(localStorage.getItem(KEY)||'[]'); return Array.isArray(value) ? value.slice(0,100) : []; } catch { return []; } // Trata dados inválidos.
  };
  let tickets = load(); // Estado atual da pequena ferramenta.
  const save = () => { try { localStorage.setItem(KEY,JSON.stringify(tickets)); } catch { alert('Não foi possível salvar neste navegador.'); } }; // Grava localmente.
  const render = () => { // Atualiza a lista evitando inserir HTML não confiável.
    const list = $('#ticket-list'); // Contêiner visual.
    list.replaceChildren(); // Limpa itens anteriores.
    $('#kpi-total').textContent = String(tickets.length); // Total de fichas.
    $('#kpi-progress').textContent = String(tickets.filter(ticket => ticket.status === 'Em reparo').length); // Total em andamento.
    if (!tickets.length) { const p = document.createElement('p'); p.className='empty'; p.textContent='Nenhuma ficha cadastrada. Crie uma ficha fictícia para começar.'; list.append(p); return; } // Estado vazio.
    tickets.forEach(ticket => { // Monta uma linha de modo seguro.
      const item = document.createElement('article'); item.className='ticket-item'; // Bloco da ficha.
      const info = document.createElement('div'); // Grupo textual.
      const strong = document.createElement('strong'); strong.textContent=ticket.peca; // Nome da peça sem HTML arbitrário.
      const meta = document.createElement('span'); meta.className='ticket-meta'; meta.textContent=`Ficha #${ticket.id.slice(-4)} · apenas neste dispositivo`; // Identificador.
      info.append(strong,meta); // Adiciona informações.
      const actions = document.createElement('div'); actions.className='ticket-actions'; // Controles da ficha.
      const select=document.createElement('select'); select.setAttribute('aria-label',`Etapa da ficha ${ticket.peca}`); // Campo de etapa.
      ['Recebido','Em reparo','Pronto'].forEach(status => { const option=document.createElement('option'); option.value=status; option.textContent=status; option.selected=status===ticket.status; select.append(option); }); // Opções válidas.
      select.addEventListener('change',()=>{ticket.status=select.value;save();render();}); // Atualiza etapa.
      const remove=document.createElement('button'); remove.type='button'; remove.textContent='Excluir'; remove.setAttribute('aria-label',`Excluir ${ticket.peca}`); // Botão de exclusão.
      remove.addEventListener('click',()=>{ tickets=tickets.filter(value=>value.id!==ticket.id);save();render();}); // Exclui a ficha local.
      actions.append(select,remove); item.append(info,actions); list.append(item); // Monta interface.
    });
  };
  $('#ticket-form')?.addEventListener('submit', event => { // Cadastro de uma nova ficha fictícia.
    event.preventDefault(); // Evita recarregar.
    if(tickets.length>=100){alert('Limite demonstrativo de 100 fichas atingido.');return;} // Limite da demo.
    const field=$('#ticket-item'); const peca=field.value.trim(); if(!peca)return; // Validação mínima.
    tickets.unshift({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),peca,status:$('#ticket-status').value}); // Cria registro local.
    save();render();event.currentTarget.reset();field.focus(); // Atualiza tela e formulário.
  });
  $('#clear-demo')?.addEventListener('click',()=>{if(confirm('Apagar todas as fichas fictícias deste navegador?')){tickets=[];save();render();}}); // Confirma exclusão geral.
  render(); // Desenha estado inicial.
})(); // Encerra módulo.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
