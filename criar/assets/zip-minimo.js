/* ZIP mínimo do criador MOSS — método STORE, sem dependências externas.
   Gera um pacote .zip válido no navegador para o cliente baixar os arquivos
   do site (HTML, CSS, imagens e guia) organizados em uma pasta. */
(function () {
  'use strict';

  /* CRC-32 (polinômio 0xEDB88320) — tabela calculada uma vez. */
  var TABELA = (function () {
    var tabela = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      tabela[n] = c >>> 0;
    }
    return tabela;
  })();

  function crc32(bytes) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < bytes.length; i++) c = TABELA[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function textoEmBytes(texto) {
    return new TextEncoder().encode(texto);
  }

  /* Data/hora no formato DOS exigido pelos cabeçalhos do ZIP. */
  function marcaData(data) {
    var ano = Math.max(1980, Math.min(2107, data.getFullYear()));
    return {
      hora: (data.getHours() << 11) | (data.getMinutes() << 5) | (data.getSeconds() >> 1),
      data: ((ano - 1980) << 9) | ((data.getMonth() + 1) << 5) | data.getDate()
    };
  }

  /* entradas: [{nome: 'pasta/arquivo.ext', dados: Uint8Array}]
     Retorna um Blob application/zip com todos os arquivos (método STORE). */
  function pacote(entradas) {
    if (!Array.isArray(entradas) || !entradas.length) throw new Error('Nenhum arquivo para empacotar.');
    var locais = [], centrais = [], deslocamento = 0;
    var marca = marcaData(new Date());

    entradas.forEach(function (entrada) {
      var nome = textoEmBytes(entrada.nome);
      var dados = entrada.dados;
      if (!(dados instanceof Uint8Array)) throw new Error('Dados inválidos: ' + entrada.nome);
      var crc = crc32(dados);

      /* Cabeçalho local (PK\x03\x04) */
      var local = new Uint8Array(30 + nome.length);
      var vl = new DataView(local.buffer);
      vl.setUint32(0, 0x04034b50, true);
      vl.setUint16(4, 20, true);            /* versão necessária */
      vl.setUint16(6, 0x0800, true);        /* sinalizador: nomes em UTF-8 */
      vl.setUint16(8, 0, true);             /* método: STORE (sem compressão) */
      vl.setUint16(10, marca.hora, true);
      vl.setUint16(12, marca.data, true);
      vl.setUint32(14, crc, true);
      vl.setUint32(18, dados.length, true); /* tamanho comprimido */
      vl.setUint32(22, dados.length, true); /* tamanho original */
      vl.setUint16(26, nome.length, true);
      vl.setUint16(28, 0, true);            /* sem campos extras */
      local.set(nome, 30);

      /* Registro central (PK\x01\x02) */
      var central = new Uint8Array(46 + nome.length);
      var vc = new DataView(central.buffer);
      vc.setUint32(0, 0x02014b50, true);
      vc.setUint16(4, 20, true);            /* feito por */
      vc.setUint16(6, 20, true);            /* versão necessária */
      vc.setUint16(8, 0x0800, true);
      vc.setUint16(10, 0, true);
      vc.setUint16(12, marca.hora, true);
      vc.setUint16(14, marca.data, true);
      vc.setUint32(16, crc, true);
      vc.setUint32(20, dados.length, true);
      vc.setUint32(24, dados.length, true);
      vc.setUint16(28, nome.length, true);
      vc.setUint32(42, deslocamento, true); /* posição do cabeçalho local */
      central.set(nome, 46);

      locais.push(local, dados);
      centrais.push(central);
      deslocamento += local.length + dados.length;
    });

    var totalCentral = centrais.reduce(function (soma, item) { return soma + item.length; }, 0);

    /* Fim do diretório central (PK\x05\x06) */
    var fim = new Uint8Array(22);
    var vf = new DataView(fim.buffer);
    vf.setUint32(0, 0x06054b50, true);
    vf.setUint16(8, entradas.length, true);
    vf.setUint16(10, entradas.length, true);
    vf.setUint32(12, totalCentral, true);
    vf.setUint32(16, deslocamento, true);

    return new Blob(locais.concat(centrais, [fim]), { type: 'application/zip' });
  }

  window.MossZip = Object.freeze({ pacote: pacote, crc32: crc32, textoEmBytes: textoEmBytes });
}());
