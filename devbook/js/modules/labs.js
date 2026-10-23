/* ═══════════════════════════════════════════════════════
   DevBook — Projetos integradores, trilhas de carreira
   e geracao de certificado de conclusao.
   ═══════════════════════════════════════════════════════ */

const Labs = (() => {
  const esc = s => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const byId = id => CURRICULUM.find(c => c.id === id);
  const projById = id => PROJECTS.find(p => p.id === id);

  /* ═══════════════════ TRILHAS ═══════════════════ */
  function renderTracks() {
    const cards = TRACKS.map(t => {
      const s = Progress.trackStats(t.id);
      const chItems = t.chapters.map(id => {
        const ch = byId(id);
        if (!ch) return "";
        const done = Progress.isDone(id);
        return `<button class="track-item${done ? " done" : ""}" data-chapter="${id}">
          <span class="track-ck">${done ? "✔" : "○"}</span>
          <span class="track-ico">${ch.icon}</span>
          <span class="track-name">${esc(ch.title)}</span>
          ${done ? '<span class="track-tag">concluído</span>' : ""}
        </button>`;
      }).join("");

      const prItems = (t.projects || []).map(id => {
        const p = projById(id);
        if (!p) return "";
        const done = Progress.isProjectDone(id);
        return `<button class="track-item${done ? " done" : ""}" data-project="${id}">
          <span class="track-ck">${done ? "✔" : "○"}</span>
          <span class="track-ico">${p.icon}</span>
          <span class="track-name">${esc(p.name)}</span>
          ${done ? '<span class="track-tag">entregue</span>' : ""}
        </button>`;
      }).join("");

      return `
        <article class="track-card ${t.color}${s.complete ? " complete" : ""}">
          <header class="track-head">
            <div class="track-badge">${t.icon}</div>
            <div>
              <h3>${esc(t.name)}</h3>
              <p>${esc(t.tagline)}</p>
            </div>
            ${s.complete ? '<span class="track-finish">🎓 Concluída</span>' : ""}
          </header>

          <div class="track-pct">
            <div class="track-bar"><span style="width:${s.pct}%"></span></div>
            <strong>${s.pct}%</strong>
          </div>

          <div class="track-counts">
            <span>📖 ${s.chaptersDone}/${s.chaptersTotal} capítulos</span>
            <span>📦 ${s.projectsDone}/${s.projectsTotal} projetos</span>
          </div>

          <details class="track-details">
            <summary>Ver plano de estudos (${s.chaptersTotal + s.projectsTotal} etapas)</summary>

            <h4>Capítulos na ordem recomendada</h4>
            <ul class="track-list">${chItems}</ul>

            <h4>Projetos integradores</h4>
            <ul class="track-list">${prItems}</ul>

            <h4>Skills que voce domina ao final</h4>
            <div class="skill-chips">
              ${t.skills.map(sk => `<span class="skill-chip">${esc(sk)}</span>`).join("")}
            </div>
          </details>
        </article>`;
    }).join("");

    return `
      <header class="ch-head">
        <div class="ch-part">Trilhas de carreira</div>
        <h1>🧭 Escolha o seu caminho</h1>
        <p class="ch-lead">
          Full Stack na pratica significa entender as duas pontas. Se voce quer ser
          especialista em uma delas, siga a trilha correspondente — o conteudo e a
          mesma, so muda a ordem e o que voce vai aprofundar.
        </p>
      </header>
      <div class="tracks-grid">${cards}</div>`;
  }

  /* ═══════════════════ PROJETOS ═══════════════════ */
  function renderProjects() {
    const totalPts = PROJECTS.reduce((s, p) => s + p.requirements.reduce((a, r) => a + r.points, 0), 0);

    const cards = PROJECTS.map(p => {
      const done = Progress.isProjectDone(p.id);
      const pts = p.requirements.reduce((s, r) => s + r.points, 0);
      const lvl = { easy: ["Fácil", "easy"], medium: ["Médio", "medium"], hard: ["Avançado", "hard"] }[p.level] || ["", "easy"];

      return `
        <article class="proj-card${done ? " done" : ""}" data-project-open="${p.id}">
          <header class="proj-head">
            <div class="proj-icon">${p.icon}</div>
            <div>
              <h3>${esc(p.name)}</h3>
              <div class="proj-meta">
                <span class="cc-badge ${lvl[1]}">${lvl[0]}</span>
                <span>⏱ ${p.hours}h estimadas</span>
                <span>🏅 ${pts} pontos</span>
              </div>
            </div>
            ${done ? '<span class="proj-done">✔ Entregue</span>' : ""}
          </header>

          <p class="proj-brief">${esc(p.brief)}</p>

          <div class="proj-stack">
            ${p.stack.map(s => `<span class="stack-chip">${esc(s)}</span>`).join("")}
          </div>

          <details class="proj-details">
            <summary>Ver escopo, requisitos e critérios de aceite</summary>

            <h4>Requisitos obrigatórios</h4>
            <ul class="req-list">
              ${p.requirements.map(r => `
                <li class="req-item">
                  <span class="req-pts">${r.points}p</span>
                  <div>
                    <strong>${esc(r.title)}</strong>
                    <p>${esc(r.desc)}</p>
                  </div>
                </li>`).join("")}
            </ul>

            <h4>Bonus (pontuacao extra)</h4>
            <ul class="bonus-list">
              ${p.bonus.map(b => `<li>⭐ ${esc(b)}</li>`).join("")}
            </ul>

            <h4>Dicas de execucao</h4>
            <ul class="tip-list">
              ${p.tips.map(t => `<li>💡 ${esc(t)}</li>`).join("")}
            </ul>

            <div class="proj-actions">
              <button class="btn-ghost small" data-project-copy="${p.id}">
                ⧉ Copiar briefing (para o README do seu repo)
              </button>
              <button class="btn-ghost small" data-project-toggle="${p.id}">
                ${done ? "↺ Marcar como não entregue" : "✔ Marcar como entregue (+120 XP)"}
              </button>
            </div>
          </details>
        </article>`;
    }).join("");

    return `
      <header class="ch-head">
        <div class="ch-part">Projetos integradores</div>
        <h1>📦 Construa projetos de verdade</h1>
        <p class="ch-lead">
          Curso sem projeto é curso decorado. Cada projeto abaixo tem escopo,
          requisitos pontuados e criterios de aceite — a mesma coisa que um
          cliente ou empregador pede. Sao 3 projetos, ${totalPts} pontos no total.
        </p>
        <div class="ch-tags">
          <span class="ch-tag">${PROJECTS.length} projetos</span>
          <span class="ch-tag">${totalPts} pontos</span>
          <span class="ch-tag">${PROJECTS.reduce((s, p) => s + p.hours, 0)}h de trabalho real</span>
        </div>
      </header>
      <div class="projects-grid">${cards}</div>`;
  }

  /* ═══════════════════ DESAFIOS ═══════════════════ */
  function renderChallenges() {
    const doneN = Progress.challengesDoneCount;

    const cards = CHALLENGES.map(c => {
      const done = Progress.isChallengeDone(c.id);
      const lvl = { easy: ["Fácil", "easy"], medium: ["Médio", "medium"], hard: ["Avançado", "hard"] }[c.level] || ["", "easy"];

      return `
        <article class="challenge-card${done ? " done" : ""}">
          <div class="ch-ico">${c.icon}</div>
          <h3>${esc(c.title)}</h3>
          <p class="ch-desc">${c.prompt.replace(/<[^>]+>/g, "")}</p>
          <div class="ch-meta">
            <span class="cc-badge ${lvl[1]}">${lvl[0]}</span>
            <span>⏱ ${c.minutes} min</span>
            <span class="ch-xp">+${c.xp} XP</span>
          </div>
          <button class="btn-primary small" data-challenge="${c.id}">
            ${done ? "↻ Resolver de novo" : "▶ Resolver desafio"}
          </button>
          ${done ? '<span class="ch-check">✔ Resolvido</span>' : ""}
        </article>`;
    }).join("");

    return `
      <header class="ch-head">
        <div class="ch-part">Desafios de codigo</div>
        <h1>💪 Pratique ate dominar</h1>
        <p class="ch-lead">
          Cada desafio tem testes automaticos ocultos: escreva a solucao, clique em
          <strong>Validar</strong> e a plataforma roda os casos no seu codigo.
          Passou? Ganha XP e o desafio fica marcado.
        </p>
        <div class="ch-tags">
          <span class="ch-tag">${CHALLENGES.length} desafios</span>
          <span class="ch-tag">${doneN}/${CHALLENGES.length} resolvidos</span>
          <span class="ch-tag">${CHALLENGES.reduce((s, c) => s + c.xp, 0)} XP disponíveis</span>
        </div>
      </header>
      <div class="challenges-grid">${cards}</div>`;
  }

  /* ═══════════════════ CERTIFICADO ═══════════════════ */
  function renderCertificate() {
    const st = Progress.certificateStatus();
    const cfg = CERTIFICATE;

    const rows = st.checks.map(c => {
      const pct = c.need ? Math.min(100, Math.round((c.got / c.need) * 100)) : 100;
      const ok = c.got >= c.need;
      return `
        <li class="cert-check${ok ? " ok" : ""}">
          <span class="cert-ck">${ok ? "✔" : "○"}</span>
          <span class="cert-label">${esc(c.label)}</span>
          <span class="cert-nums">${c.got} / ${c.need}${esc(c.unit)}</span>
          <span class="cert-bar"><i style="width:${pct}%"></i></span>
        </li>`;
    }).join("");

    return `
      <header class="ch-head">
        <div class="ch-part">Certificacao</div>
        <h1>📜 Seu certificado de conclusao</h1>
        <p class="ch-lead">
          Cumpre os requisitos abaixo e o DevBook gera um certificado em PDF pronto
          para o seu LinkedIn e portfolio.
        </p>
      </header>

      <section class="cert-status">
        <div class="cert-status-head">
          <h3>${st.eligible ? "🎉 Você já pode emitir!" : "Requisitos para emitir"}</h3>
          <span class="cert-flag ${st.eligible ? "ok" : "no"}">${st.eligible ? "ELEGÍVEL" : "EM ANDAMENTO"}</span>
        </div>
        <ul class="cert-checks">${rows}</ul>
        <button class="btn-primary" id="btnEmitCert" ${st.eligible ? "" : "disabled"}>
          ${st.eligible ? "📜 Emitir meu certificado (PDF)" : "🔒 Complete os requisitos acima"}
        </button>
        ${Progress.state.certificates > 0 ? `
          <p class="cert-note">Você já emitiu ${Progress.state.certificates} certificado(s).
            <button class="link-btn" id="btnEmitAgain">Emitir novamente</button></p>` : ""}
      </section>`;
  }

  /* Preenche e baixa o certificado em PDF (via print-to-PDF do navegador) */
  function issueCertificate() {
    const st = Progress.certificateStatus();
    if (!st.eligible) {
      toast("Faltam requisitos para o certificado.", "danger");
      return;
    }
    if (!Progress.issueCertificate()) return;

    const name = prompt("Seu nome completo (como quer no certificado):", "Seu Nome");
    if (!name) return;

    const lv = Progress.levelInfo();
    const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

    openPrintView({ name, today, lv });
  }

  function openPrintView({ name, today, lv }) {
    const w = window.open("", "_blank", "width=900,height=640");
    if (!w) {
      toast("Permita pop-ups para gerar o certificado.", "danger");
      return;
    }
    w.document.write(`<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8">
      <title>Certificado — ${esc(name)}</title>
      <style>
        @page { size: A4 landscape; margin: 0; }
        body { margin:0; font-family: Georgia, serif; background:#f6f7f9; }
        .sheet {
          width: 297mm; height: 210mm; box-sizing: border-box;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: #fff; border: 14px solid #3d4557; position: relative; text-align: center;
        }
        .sheet::before, .sheet::after {
          content:""; position:absolute; inset: 10mm; border: 2px solid #dde1e8; border-radius: 6px;
        }
        h1 { font-size: 30px; margin: 0 0 6px; color: #171a21; letter-spacing: 1px; }
        .sub { font-size: 14px; color: #838b9e; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 30px; }
        .name { font-size: 44px; font-weight: bold; color: #3d4557; margin: 18px 0 8px; border-bottom: 2px solid #dde1e8; padding: 0 40px 10px; }
        .desc { font-size: 15px; color: #4a5163; max-width: 620px; line-height: 1.7; }
        .meta { display:flex; gap: 40px; margin-top: 40px; font-size: 12px; color:#838b9e; font-family: system-ui, sans-serif; }
        .meta strong { display:block; font-size: 15px; color:#171a21; margin-top:3px; }
        .skills { margin-top: 26px; display:flex; gap:8px; flex-wrap: wrap; justify-content:center; max-width: 760px; }
        .skills span { border:1px solid #dde1e8; background:#f6f7f9; color:#3d4557; padding:5px 12px; border-radius:20px; font-size:11px; font-family: system-ui, sans-serif; }
        .seal { position:absolute; right: 26mm; bottom: 22mm; width: 74px; height:74px; border-radius:50%;
                background:#3d4557; color:#fff; display:grid; place-items:center; font-size:11px; text-align:center; font-family:system-ui,sans-serif; font-weight:700; line-height:1.3; }
        .sign { position:absolute; left: 34mm; bottom: 24mm; border-top: 1px solid #c2c8d4; padding-top:6px; width: 200px; text-align:center; font-size:11px; color:#838b9e; font-family: system-ui, sans-serif; }
        @media print { body { background:#fff; } .no-print { display:none; } }
      </style></head><body>
      <div class="sheet">
        <h1>${esc(CERTIFICATE.title)}</h1>
        <div class="sub">${esc(CERTIFICATE.subtitle)}</div>
        <div class="name">${esc(name)}</div>
        <p class="desc">Concluiu com aproveitamento o curso completo de
          <strong>${esc(CERTIFICATE.subtitle)}</strong>, alcançando o nível
          <strong>${lv.n} — ${esc(lv.name)}</strong> e dominando as seguintes competências técnicas:</p>
        <div class="skills">
          ${TRACKS[2].skills.map(s => `<span>${esc(s)}</span>`).join("")}
        </div>
        <div class="meta">
          <div>Emitido em<strong>${esc(today)}</strong></div>
          <div>Capítulos concluídos<strong>${Progress.doneCount}/${CURRICULUM.length}</strong></div>
          <div>Desafios resolvidos<strong>${Progress.challengesDoneCount}/${CHALLENGES.length}</strong></div>
          <div>Projetos entregues<strong>${Progress.projectsDoneCount}/${PROJECTS.length}</strong></div>
        </div>
        <div class="seal">DEV<br>BOOK</div>
        <div class="sign">${esc(CERTIFICATE.issuer)}<br>Plataforma de ensino</div>
      </div>
      <div class="no-print" style="text-align:center;padding:18px;font-family:system-ui">
        <p>Dica: use <strong>Ctrl/Cmd + P</strong> e escolha <em>"Salvar como PDF"</em> (paisagem).</p>
        <button onclick="window.print()" style="background:#3d4557;color:#fff;border:0;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer">🖨 Imprimir / Salvar PDF</button>
      </div>
      </body></html>`);
    w.document.close();
  }

  /* ═══════════════════ BRIEFING PARA REPO ═══════════════════ */
  function projectBriefing(id) {
    const p = projById(id);
    if (!p) return "";
    const rows = p.requirements.map(r => `| ${r.points} | ${r.title} | ${r.desc} |`);
    return `# ${p.icon} ${p.name}

${p.brief}

**Stack:** ${p.stack.join(" · ")}
**Trilha:** ${(TRACKS.find(t => t.id === p.track[0]) || {}).name || p.track.join(", ")}
**Estimativa:** ${p.hours}h

## Requisitos obrigatórios

| Pontos | Requisito | Critério de aceite |
|-------:|-----------|--------------------|
${rows.join("\n")}

## Bonus

${p.bonus.map(b => `- ${b}`).join("\n")}

## Como vou executar

${p.tips.map(t => `- ${t}`).join("\n")}
`;
  }

  return {
    renderTracks, renderProjects, renderChallenges, renderCertificate,
    issueCertificate, projectBriefing
  };
})();