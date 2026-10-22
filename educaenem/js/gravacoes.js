/* =============================================================================
   EducaEnem — Estúdio de gravação de aulas
   Grava a aula do professor (tela + microfone + câmera opcional) direto no
   navegador e guarda para quem quiser assistir. Também aceita publicar link
   externo (YouTube, Drive, Vimeo) de gravações feitas no Zoom/Meet.

   Estratégia de armazenamento (site estático, sem servidor):
   - metadados .......... localStorage (funciona sempre, inclusive em file://)
   - vídeo (Blob) ........ IndexedDB quando disponível; fallback em memória
   ============================================================================= */
window.Gravacoes = (() => {
  const DB_NOME = "educaenem_estudio";
  const LOJA = "gravacoes";
  const VERSAO = 1;
  const META_KEY = "educaenem_gravacoes_meta_v1";

  let db = null;
  let modoMemoria = false;
  const memoria = new Map(); // id -> registro completo (com Blob)

  function novoId() {
    return "gra-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
  }

  /* ---------- IndexedDB ---------- */
  function abrirDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        modoMemoria = true;
        return reject(new Error("IndexedDB indisponível"));
      }
      let req;
      try {
        req = indexedDB.open(DB_NOME, VERSAO);
      } catch (e) {
        modoMemoria = true;
        return reject(e);
      }
      req.onupgradeneeded = () => {
        const base = req.result;
        if (!base.objectStoreNames.contains(LOJA)) {
          base.createObjectStore(LOJA, { keyPath: "id" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        modoMemoria = true;
        reject(req.error || new Error("Falha ao abrir o banco"));
      };
    });
  }

  function garantirDB() {
    if (db) return Promise.resolve(db);
    if (modoMemoria) return Promise.reject(new Error("modo memória"));
    return abrirDB().then(
      (base) => {
        db = base;
        return base;
      },
      (e) => {
        modoMemoria = true;
        throw e;
      }
    );
  }

  /* ---------- metadados (localStorage) ---------- */
  function lerMeta() {
    try {
      const raw = localStorage.getItem(META_KEY);
      const lista = raw ? JSON.parse(raw) : [];
      return Array.isArray(lista) ? lista : [];
    } catch (e) {
      return [];
    }
  }

  function gravarMeta(lista) {
    try {
      localStorage.setItem(META_KEY, JSON.stringify(lista));
    } catch (e) {
      /* armazenamento cheio ou bloqueado: segue só em memória */
    }
  }

  function semBlob(reg) {
    const copia = {};
    Object.keys(reg).forEach((k) => {
      if (k !== "blob") copia[k] = reg[k];
    });
    copia.temBlob = reg.blob ? true : false;
    return copia;
  }

  /* ---------- API ---------- */
  function salvar(reg) {
    const completo = Object.assign({}, reg, {
      id: reg.id || novoId(),
      dataISO: reg.dataISO || new Date().toISOString(),
    });
    memoria.set(completo.id, completo);
    const meta = lerMeta().filter((m) => m.id !== completo.id);
    meta.push(semBlob(completo));
    gravarMeta(meta);
    if (completo.blob && !modoMemoria) {
      garantirDB()
        .then((base) => {
          const tx = base.transaction(LOJA, "readwrite");
          tx.objectStore(LOJA).put(completo);
          tx.onerror = () => {
            /* blob fica só na memória desta sessão */
          };
        })
        .catch(() => {});
    }
    return completo;
  }

  function listar() {
    return Promise.resolve(lerMeta()).then((meta) => {
      return meta
        .map((m) => {
          const emMemoria = memoria.has(m.id);
          return Object.assign({}, m, {
            temBlob: m.tipo === "arquivo" ? emMemoria || m.temBlob !== false : false,
          });
        })
        .sort((a, b) => String(b.dataISO).localeCompare(String(a.dataISO)));
    });
  }

  function obter(id) {
    const emMemoria = memoria.get(id);
    if (emMemoria) return Promise.resolve(emMemoria);
    if (modoMemoria) return Promise.resolve(null);
    return garantirDB()
      .then((base) => {
        return new Promise((resolve) => {
          const tx = base.transaction(LOJA, "readonly");
          const req = tx.objectStore(LOJA).get(id);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        });
      })
      .catch(() => null);
  }

  function remover(id) {
    memoria.delete(id);
    gravarMeta(lerMeta().filter((m) => m.id !== id));
    if (!modoMemoria) {
      garantirDB()
        .then((base) => {
          const tx = base.transaction(LOJA, "readwrite");
          tx.objectStore(LOJA).delete(id);
        })
        .catch(() => {});
    }
    return Promise.resolve(true);
  }

  function registrarDownload(id) {
    const meta = lerMeta();
    const alvo = meta.find((m) => m.id === id);
    if (alvo) {
      alvo.downloads = (alvo.downloads || 0) + 1;
      gravarMeta(meta);
    }
  }

  /* ---------- suporte a gravação ---------- */
  function temGravacao() {
    return !!(
      navigator.mediaDevices &&
      navigator.mediaDevices.getDisplayMedia &&
      typeof window.MediaRecorder !== "undefined"
    );
  }

  function escolherMime() {
    const candidatos = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
      "video/mp4",
    ];
    for (let i = 0; i < candidatos.length; i++) {
      try {
        if (window.MediaRecorder.isTypeSupported(candidatos[i])) return candidatos[i];
      } catch (e) {}
    }
    return "";
  }

  return {
    novoId: novoId,
    salvar: salvar,
    listar: listar,
    obter: obter,
    remover: remover,
    registrarDownload: registrarDownload,
    temGravacao: temGravacao,
    escolherMime: escolherMime,
    modoMemoria: () => modoMemoria,
  };
})();
