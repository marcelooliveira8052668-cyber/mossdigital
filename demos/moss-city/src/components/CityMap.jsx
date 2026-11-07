// Importa o React e os recursos usados para sincronizar mapa e seleção.
import React, { useEffect, useRef, useState } from 'react';
// Importa o Leaflet, que fornece zoom, arraste, camadas e marcadores reais.
import L from 'leaflet';
// Carrega o CSS da biblioteca; suas regras serão limitadas ao contêiner próprio do mapa.
import 'leaflet/dist/leaflet.css';
// Importa o catálogo das categorias e a base cartográfica autoral local.
import { categories, mapBounds, schematicUrl } from '../data/scenario.js';
// Importa ícones que acompanham ações textuais funcionais.
import { Crosshair, Globe2, Map as MapIcon, Layers } from 'lucide-react';
// Cria um mapa interativo; os servidores do OSM só são acessados após escolha explícita do visitante.
export default function CityMap({ points, selected, onSelect, compact = false }) {
  const element = useRef(null); // Guarda o elemento HTML em que o Leaflet desenhará o mapa.
  const map = useRef(null); // Guarda a instância do mapa para não recriá-la a cada renderização.
  const markerLayer = useRef(null); // Guarda apenas os marcadores que deverão mudar com os filtros.
  const selectionHandler = useRef(onSelect); // Mantém o evento atualizado sem remontar o mapa inteiro.
  const [online, setOnline] = useState(false); // Começa na cartografia local, sem requisições de tiles externos.
  const [districtLayer, setDistrictLayer] = useState(false); // Controla os contornos territoriais demonstrativos.
  const [tileError, setTileError] = useState(false); // Guarda a falha da base online sem apagar os dados locais.
  selectionHandler.current = onSelect; // Atualiza a função chamada ao selecionar um marcador.
  useEffect(() => { // Monta e desmonta o mapa de forma compatível com o modo estrito do React.
    const instance = L.map(element.current, { zoomControl: false, attributionControl: true, scrollWheelZoom: false, zoomSnap: 0.25, zoomDelta: 0.5, minZoom: 11, maxZoom: 18 }); // Ajusta o enquadramento com zoom fracionário e evita capturar a rolagem da página.
    map.current = instance; // Disponibiliza a instância aos efeitos seguintes.
    L.control.zoom({ position: 'topright', zoomInTitle: 'Aproximar mapa', zoomOutTitle: 'Afastar mapa' }).addTo(instance); // Mantém o zoom operável por teclado com títulos em português.
    markerLayer.current = L.layerGroup().addTo(instance); // Cria uma camada separada para os registros filtrados.
    instance.fitBounds(mapBounds, { padding: [15, 15], animate: false }); // Enquadra o cenário inicial sem animação pesada.
    const observer = new ResizeObserver(() => instance.invalidateSize({ pan: false })); // Corrige o tamanho depois de mudanças de tela ou abertura de painéis.
    observer.observe(element.current); // Observa somente o espaço ocupado pelo mapa.
    return () => { observer.disconnect(); instance.remove(); map.current = null; }; // Libera observador e eventos quando o componente sai da tela.
  }, []); // Monta a infraestrutura do mapa uma vez por entrada na tela.
  useEffect(() => { // Alterna a cartografia sem interferir na coleção de dados fictícios.
    const instance = map.current; // Lê o mapa já montado no efeito anterior.
    setTileError(false); // Limpa a mensagem ao tentar uma nova base.
    const layer = online ? L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>', detectRetina: false, updateWhenIdle: true }) : L.imageOverlay(schematicUrl, mapBounds, { attribution: 'Cartografia esquemática autoral · MOSS CITY', interactive: false }); // Usa a URL oficial de tiles sem pré-download nem alteração do cache.
    layer.addTo(instance); // Mostra a base escolhida pelo visitante.
    if (online) layer.on('tileerror', () => setTileError(true)); // Mantém lista e marcadores utilizáveis em caso de falha de rede.
    return () => { layer.remove(); }; // Remove somente a base anterior ao alternar a camada.
  }, [online]); // Só acessa a base online depois de uma escolha explícita.
  useEffect(() => { // Sincroniza os marcadores com a mesma lista que aparece fora do mapa.
    const layer = markerLayer.current; // Recupera a camada independente de registros.
    layer.clearLayers(); // Remove marcadores antigos antes de aplicar os filtros.
    points.forEach((point) => { // Desenha apenas os registros que passaram nos filtros ativos.
      const category = categories[point.category]; // Localiza a cor e o símbolo da categoria do registro.
      const icon = L.divIcon({ className: 'city-map-marker-container', html: `<span class="city-map-pin ${selected === point.id ? 'is-selected' : ''}" style="--pin-color:${category.color}">${category.symbol}</span>`, iconSize: [32, 38], iconAnchor: [16, 36] }); // Usa conteúdo controlado pelo catálogo, sem interpolar descrições fornecidas pelo visitante.
      const marker = L.marker([point.lat, point.lng], { icon, title: `${point.name} — ${category.label} — demonstração`, alt: point.name, keyboard: true }).addTo(layer); // Cria um alvo operável por clique e teclado.
      marker.on('click', () => selectionHandler.current(point.id)); // Abre os mesmos detalhes usados pela lista acessível.
    }); // Encerra a criação dos marcadores visíveis.
  }, [points, selected]); // Atualiza marcadores quando filtros ou seleção mudam.
  useEffect(() => { // Acrescenta uma camada territorial que pode ser ativada e desativada.
    if (!districtLayer) return; // Evita desenhar polígonos quando a opção está desligada.
    const layer = L.layerGroup().addTo(map.current); // Agrupa os contornos para removê-los juntos.
    [[[-23.52, -46.67], [-23.55, -46.63]], [[-23.55, -46.67], [-23.58, -46.63]], [[-23.52, -46.63], [-23.55, -46.59]], [[-23.55, -46.63], [-23.58, -46.59]]].forEach((bounds) => L.rectangle(bounds, { color: '#00a7cf', weight: 1.5, dashArray: '6 6', fillColor: '#00d4ff', fillOpacity: 0.06, interactive: false }).addTo(layer)); // Delimita quatro regiões meramente esquemáticas, não limites municipais.
    return () => layer.remove(); // Retira os contornos quando a camada é desativada.
  }, [districtLayer]); // Observa a escolha da camada territorial.
  function changeBase() { // Solicita consentimento antes de carregar a cartografia externa.
    if (!online && !window.confirm('Ativar OpenStreetMap? O navegador fará requisições de mapa a um serviço externo. As ruas serão reais, mas todos os pontos continuarão fictícios. Não há trânsito ao vivo nem vínculo com prefeitura.')) return; // Explica rede, privacidade e caráter simulado antes da conexão.
    setOnline(!online); // Alterna a base local e a online após a confirmação.
  } // Encerra a escolha da base cartográfica.
  return ( // Entrega mapa, controles e avisos independentes de cores e ícones.
    <div className={`city-map-shell ${compact ? 'is-compact' : ''}`}>
      {/* Reserva uma área estável para o mapa e permite ignorá-lo pela lista acessível adjacente. */}
      <div ref={element} className="city-map-canvas" role="region" aria-label="Mapa interativo de pontos fictícios; use também a lista de locais" />
      {/* Oferece controles reais de enquadramento, camadas e base cartográfica. */}
      <div className="city-map-tools"><button type="button" onClick={() => map.current.fitBounds(mapBounds, { padding: [15, 15], animate: false })}><Crosshair size={15} aria-hidden="true" />Enquadrar</button><button type="button" aria-pressed={districtLayer} onClick={() => setDistrictLayer(!districtLayer)}><Layers size={15} aria-hidden="true" />Regiões</button><button type="button" aria-pressed={online} onClick={changeBase}>{online ? <MapIcon size={15} aria-hidden="true" /> : <Globe2 size={15} aria-hidden="true" />}{online ? 'Base local' : 'Base OSM'}</button></div>
      {/* Informa permanentemente que marcadores e indicadores não são uma operação municipal real. */}
      <div className="city-map-mode"><span className="city-status-dot" />{online ? 'RUAS REAIS · PONTOS FICTÍCIOS' : 'TERRITÓRIO ESQUEMÁTICO · FICTÍCIO'}</div>
      {/* Mantém uma orientação utilizável se o provedor externo estiver indisponível. */}
      {tileError && <p className="city-map-error" role="alert">A base online não carregou. Volte à base local; a lista de locais continua disponível.</p>}
    </div> // Encerra a região de mapa e controles.
  ); // Encerra o retorno do componente.
} // Encerra o mapa Leaflet independente.
