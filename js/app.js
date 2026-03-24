/* =============================================
   app.js — Navegação, interatividade e boot
   ============================================= */

/* ─────────────────────────────────────────────
   ESTADO GLOBAL
   ───────────────────────────────────────────── */
const State = {
  activeTab:        'dashboard',
  selectedMonth:    null,  // "YYYY-MM" aba Análise Mensal
  contentMonth:     null,  // "YYYY-MM" aba Melhores Conteúdos
  insightsMonth:    null,  // "YYYY-MM" aba Insights
  editingPostId:    null,  // id do post em edição
  pendingConfirmFn: null,  // callback do modal de confirmação
  wizardStep:       1,     // etapa atual do wizard (1–4)
  wizardPosts:      [],    // posts adicionados na etapa 4 do wizard
};

/* ─────────────────────────────────────────────
   UTILITÁRIOS DOM
   ───────────────────────────────────────────── */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

/* ─────────────────────────────────────────────
   TOAST
   ───────────────────────────────────────────── */
function showToast(msg, type = 'info', duration = 3200) {
  const toast = $('#toast');
  if (!toast) return;
  toast.innerHTML = msg;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ─────────────────────────────────────────────
   MODAL DE CONFIRMAÇÃO
   ───────────────────────────────────────────── */
function openModal(message, onConfirm) {
  $('#modalMessage').innerHTML = message;
  State.pendingConfirmFn       = onConfirm;
  $('#modalOverlay').classList.add('open');
}

function closeModal() {
  $('#modalOverlay').classList.remove('open');
  State.pendingConfirmFn = null;
}

/* ─────────────────────────────────────────────
   TOPBAR — data atual
   ───────────────────────────────────────────── */
function setTopbarDate() {
  const el = $('#topbarDate');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('pt-BR', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
  });
}

/* ─────────────────────────────────────────────
   SIDEBAR — mobile toggle
   ───────────────────────────────────────────── */
function openSidebar() {
  $('#sidebar').classList.add('open');
  $('#sidebarOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  $('#sidebar').classList.remove('open');
  $('#sidebarOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────
   NAVEGAÇÃO POR ABAS
   ───────────────────────────────────────────── */
const TAB_TITLES = {
  dashboard: 'Dashboard Geral',
  monthly:   'Análise Mensal',
  content:   'Melhores Conteúdos',
  insights:  'Insights & Estratégia',
  settings:  'Configurações',
};

function activateTab(tabId) {
  $$('.nav-item').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.tab === tabId)
  );
  $$('.tab-section').forEach(sec =>
    sec.classList.toggle('active', sec.id === `tab-${tabId}`)
  );

  const titleEl = $('#topbarTitle');
  if (titleEl) titleEl.textContent = TAB_TITLES[tabId] || '';

  State.activeTab = tabId;
  closeSidebar();

  switch (tabId) {
    case 'dashboard': loadDashboardTab(); break;
    case 'monthly':   loadMonthlyTab();   break;
    case 'content':   loadContentTab();   break;
    case 'insights':  loadInsightsTab();  break;
    case 'settings':  loadSettingsTab();  break;
  }
}

/* ─────────────────────────────────────────────
   SELETORES DE MÊS
   ───────────────────────────────────────────── */
function populateMonthSelect(selectId, currentValue = null) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const months = getMonths() || [];

  if (months.length === 0) {
    sel.innerHTML = '<option value="">— sem dados —</option>';
    return;
  }

  sel.innerHTML = months.map(m =>
    `<option value="${m.id}" ${m.id === currentValue ? 'selected' : ''}>${m.label}</option>`
  ).join('');

  if (!currentValue) sel.value = months[months.length - 1].id;
}

function getLatestMonthId() {
  const months = getMonths();
  return months && months.length > 0 ? months[months.length - 1].id : null;
}

function syncAllMonthSelects() {
  populateMonthSelect('monthSelect',         State.selectedMonth);
  populateMonthSelect('contentMonthSelect',  State.contentMonth);
  populateMonthSelect('insightsMonthSelect', State.insightsMonth);
}

/* ─────────────────────────────────────────────
   ABA 1 — DASHBOARD GERAL
   ───────────────────────────────────────────── */
function loadDashboardTab() {
  const months = getMonths();
  if (!months || months.length === 0) {
    renderEmptyDashboard();
    return;
  }
  const current  = months[months.length - 1];
  const previous = months.length > 1 ? months[months.length - 2] : null;
  renderKPICards(current, previous);
  renderDashboardCharts();
}

function renderEmptyDashboard() {
  const grid = $('#dashboardCards');
  if (grid) grid.innerHTML = `
    <div class="empty-state" style="grid-column:1/-1">
      <div class="empty-state-icon">📊</div>
      <div class="empty-state-text">Nenhum dado encontrado.<br>
        Vá até <strong>Análise Mensal</strong> e cadastre os dados do seu primeiro mês.</div>
    </div>`;
}

function renderKPICards(current, previous) {
  const metrics = [
    { id: 'followers',    value: current.followers,    fmt: fmtNum,                       prev: previous?.followers    },
    { id: 'growth',       value: current.newFollowers, fmt: (v) => '+' + fmtNum(v),       prev: previous?.newFollowers },
    { id: 'engagement',   value: current.engagement,   fmt: fmtPct,                       prev: previous?.engagement   },
    { id: 'reach',        value: current.reach,        fmt: fmtNum,                       prev: previous?.reach        },
    { id: 'impressions',  value: current.impressions,  fmt: fmtNum,                       prev: previous?.impressions  },
    { id: 'likes',        value: current.likes,        fmt: fmtNum,                       prev: previous?.likes        },
    { id: 'comments',     value: current.comments,     fmt: fmtNum,                       prev: previous?.comments     },
    { id: 'saves',        value: current.saves,        fmt: fmtNum,                       prev: previous?.saves        },
    { id: 'storiesViews', value: current.storiesViews, fmt: fmtNum,                       prev: previous?.storiesViews },
    { id: 'reelsViews',   value: current.reelsViews,   fmt: fmtNum,                       prev: previous?.reelsViews   },
  ];

  metrics.forEach(({ id, value, fmt, prev }) => {
    const valEl   = document.getElementById(`kpi-${id}`);
    const deltaEl = document.getElementById(`delta-${id}`);
    if (valEl)   valEl.textContent = fmt(value);
    if (deltaEl) {
      const d = fmtDelta(value, prev);
      deltaEl.textContent = d.text;
      deltaEl.className   = `card-delta ${d.cls}`;
    }
  });
}

/* ─────────────────────────────────────────────
   ABA 2 — ANÁLISE MENSAL
   ───────────────────────────────────────────── */
function loadMonthlyTab() {
  if (!State.selectedMonth) State.selectedMonth = getLatestMonthId();
  populateMonthSelect('monthSelect', State.selectedMonth);
  renderMonthlyContent(State.selectedMonth);
}

function renderMonthlyContent(monthId) {
  State.selectedMonth = monthId;

  const months   = getMonths() || [];
  const idx      = months.findIndex(m => m.id === monthId);
  const current  = idx >= 0 ? months[idx]     : null;
  const previous = idx > 0  ? months[idx - 1] : null;

  renderMonthlyCards(current, previous);
  renderMonthlyCharts(monthId);

  const summaryEl = $('#monthlySummaryText');
  if (summaryEl) {
    summaryEl.innerHTML = current
      ? generateMonthlySummary(current, previous)
      : 'Selecione ou cadastre um mês para ver o resumo automático.';
  }

  // Inicializa o wizard com dados do mês selecionado
  initWizard(monthId);
}

function renderMonthlyCards(current, previous) {
  const container = $('#monthlyCards');
  if (!container) return;

  if (!current) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">📅</div>
        <div class="empty-state-text">Nenhum dado para este mês ainda.</div>
      </div>`;
    return;
  }

  const metrics = [
    { label: 'Seguidores',         value: current.followers,    fmt: fmtNum,                 prev: previous?.followers    },
    { label: 'Novos seguidores',   value: current.newFollowers, fmt: (v) => '+' + fmtNum(v), prev: previous?.newFollowers },
    { label: 'Engajamento',        value: current.engagement,   fmt: fmtPct,                 prev: previous?.engagement   },
    { label: 'Alcance médio',      value: current.reach,        fmt: fmtNum,                 prev: previous?.reach        },
    { label: 'Impressões',         value: current.impressions,  fmt: fmtNum,                 prev: previous?.impressions  },
    { label: 'Curtidas médias',    value: current.likes,        fmt: fmtNum,                 prev: previous?.likes        },
    { label: 'Comentários médios', value: current.comments,     fmt: fmtNum,                 prev: previous?.comments     },
    { label: 'Salvamentos médios', value: current.saves,        fmt: fmtNum,                 prev: previous?.saves        },
    { label: 'Views Stories',      value: current.storiesViews, fmt: fmtNum,                 prev: previous?.storiesViews },
    { label: 'Views Reels',        value: current.reelsViews,   fmt: fmtNum,                 prev: previous?.reelsViews   },
  ];

  container.innerHTML = metrics.map(({ label, value, fmt, prev }) => {
    const d = fmtDelta(value, prev);
    return `
      <div class="card kpi-card">
        <div class="card-body" style="width:100%">
          <span class="card-label">${label}</span>
          <span class="card-value">${fmt(value)}</span>
          <span class="card-delta ${d.cls}">${d.text}</span>
        </div>
      </div>`;
  }).join('');
}

function fillMonthlyForm(data) {
  const form = document.getElementById('monthlyForm');
  if (!form) return;
  const fields = [
    'followers','newFollowers','engagement','reach','impressions',
    'likes','comments','saves','storiesViews','reelsViews','postsCount','bestDay',
  ];
  fields.forEach(f => {
    const el = form.elements[f];
    if (el) el.value = data?.[f] ?? '';
  });
}

/* ─────────────────────────────────────────────
   WIZARD — Análise Mensal (4 etapas)
   ───────────────────────────────────────────── */

/**
 * Inicializa o wizard com dados de um mês existente
 * (ou em branco para mês novo).
 */
function initWizard(monthId) {
  State.wizardStep  = 1;
  State.wizardPosts = [];

  // Preenche etapa 1: período
  if (monthId) {
    const [year, month] = monthId.split('-');
    const sel = document.getElementById('wizMonth');
    const inp = document.getElementById('wizYear');
    if (sel) sel.value = month;
    if (inp) inp.value = year;
  } else {
    const now = new Date();
    const sel = document.getElementById('wizMonth');
    const inp = document.getElementById('wizYear');
    if (sel) sel.value = String(now.getMonth() + 1).padStart(2, '0');
    if (inp) inp.value = now.getFullYear();
  }

  // Preenche etapas 2-3 com dados existentes do mês
  const data = monthId ? getMonthById(monthId) : null;
  fillMonthlyForm(data);

  goToWizardStep(1);
}

/**
 * Navega para a etapa indicada e atualiza toda a UI do wizard.
 */
function goToWizardStep(step) {
  State.wizardStep = step;
  const total = 4;

  // Painéis de conteúdo
  for (let i = 1; i <= total; i++) {
    const panel = document.getElementById(`wizardPanel${i}`);
    if (panel) panel.classList.toggle('active', i === step);
  }

  // Indicadores de etapa
  document.querySelectorAll('.wizard-step-item').forEach(el => {
    const s = parseInt(el.dataset.step, 10);
    el.classList.toggle('active',    s === step);
    el.classList.toggle('completed', s < step);
  });

  // Linhas entre etapas
  document.querySelectorAll('.wsn-line').forEach((line, idx) => {
    line.classList.toggle('completed', idx < step - 1);
  });

  // Barra de progresso
  const fill = document.getElementById('wizardProgressFill');
  if (fill) fill.style.width = `${(step / total) * 100}%`;

  // Botões de navegação
  const btnPrev = document.getElementById('btnWizardPrev');
  const btnNext = document.getElementById('btnWizardNext');
  const btnSave = document.getElementById('btnWizardSave');
  if (btnPrev) btnPrev.style.display = step > 1     ? '' : 'none';
  if (btnNext) btnNext.style.display = step < total ? '' : 'none';
  if (btnSave) btnSave.style.display = step === total ? '' : 'none';

  // Botão de excluir mês (só visível em meses existentes, qualquer etapa)
  const dangerZone = document.getElementById('wizardDangerZone');
  if (dangerZone) {
    dangerZone.style.display = State.selectedMonth && getMonthById(State.selectedMonth) ? '' : 'none';
  }

  // Se chegou na etapa 4, renderiza posts já adicionados
  if (step === total) renderWizardPosts();
}

/**
 * Avança para a próxima etapa, validando e persistindo o período na etapa 1.
 */
function handleWizardNext() {
  const step = State.wizardStep;

  if (step === 1) {
    const month = document.getElementById('wizMonth')?.value;
    const year  = document.getElementById('wizYear')?.value?.trim();

    if (!month || !year || isNaN(year) || year < 2020 || year > 2035) {
      showToast('Informe um mês e ano válidos (2020–2035).', 'error');
      return;
    }

    const newId = `${year}-${month}`;

    // Se mudou de mês, carrega dados do mês escolhido (se existir)
    if (newId !== State.selectedMonth) {
      const existing = getMonthById(newId);
      if (existing) {
        State.selectedMonth = newId;
        populateMonthSelect('monthSelect', newId);
        fillMonthlyForm(existing);
      } else {
        // Cria o mês com dados zerados para ser salvo na etapa final
        State.selectedMonth = newId;
        populateMonthSelect('monthSelect', newId);
        fillMonthlyForm(null);
      }
    }
  }

  if (step < 4) goToWizardStep(step + 1);
}

/** Volta para a etapa anterior. */
function handleWizardPrev() {
  if (State.wizardStep > 1) goToWizardStep(State.wizardStep - 1);
}

/** Renderiza a lista de posts adicionados na etapa 4. */
function renderWizardPosts() {
  const container = document.getElementById('wizardPostsList');
  if (!container) return;

  if (State.wizardPosts.length === 0) {
    container.innerHTML = '<p class="wizard-no-posts">Nenhum post adicionado ainda. Clique em <strong>+ Adicionar post</strong> para começar.</p>';
  } else {
    container.innerHTML = State.wizardPosts.map((p, i) => `
      <div class="wizard-post-entry">
        <div class="wpe-header">
          <span class="post-type-badge ${escapeHtml(p.type)}">${escapeHtml(p.type)}</span>
          <span class="wpe-theme">${escapeHtml(p.theme || '—')}</span>
          <button type="button" class="btn-icon del" data-remove-wizard-post="${i}" title="Remover">&#128465;</button>
        </div>
        <div class="wpe-metrics">
          <span>&#10084;&#65039; ${fmtNum(p.likes)}</span>
          <span>&#128172; ${fmtNum(p.comments)}</span>
          <span>&#128278; ${fmtNum(p.saves)}</span>
          <span>&#128225; ${fmtNum(p.reach)}</span>
          ${p.views > 0 ? `<span>&#128065;&#65039; ${fmtNum(p.views)}</span>` : ''}
        </div>
      </div>`).join('');
  }

  // Exibe/oculta área de adicionar post com base no limite de 5
  const addArea = document.getElementById('wizardAddPostArea');
  if (addArea) addArea.style.display = State.wizardPosts.length >= 5 ? 'none' : '';
}

/** Exibe o formulário inline de novo post na etapa 4. */
function showWizardPostForm() {
  const form = document.getElementById('wizardPostForm');
  const btn  = document.getElementById('btnWizardAddPost');
  if (form) form.style.display = '';
  if (btn)  btn.style.display  = 'none';
}

/** Oculta e reseta o formulário inline de post. */
function hideWizardPostForm() {
  const form = document.getElementById('wizardPostForm');
  const btn  = document.getElementById('btnWizardAddPost');
  if (form) {
    form.style.display = 'none';
    ['wpUrl','wpTheme','wpLikes','wpComments','wpSaves','wpReach','wpViews'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const typeEl = document.getElementById('wpType');
    if (typeEl) typeEl.value = 'Reels';
  }
  if (btn) btn.style.display = '';
}

/** Valida e adiciona um post à lista temporária do wizard. */
function handleWizardConfirmPost() {
  if (State.wizardPosts.length >= 5) {
    showToast('Máximo de 5 posts por mês atingido.', 'error');
    return;
  }
  const theme = document.getElementById('wpTheme')?.value.trim();
  if (!theme) { showToast('Informe o tema / assunto do post.', 'error'); return; }

  State.wizardPosts.push({
    url:      document.getElementById('wpUrl')?.value.trim()      || '',
    type:     document.getElementById('wpType')?.value            || 'Reels',
    theme,
    likes:    Number(document.getElementById('wpLikes')?.value)    || 0,
    comments: Number(document.getElementById('wpComments')?.value) || 0,
    saves:    Number(document.getElementById('wpSaves')?.value)    || 0,
    reach:    Number(document.getElementById('wpReach')?.value)    || 0,
    views:    Number(document.getElementById('wpViews')?.value)    || 0,
  });

  hideWizardPostForm();
  renderWizardPosts();
  showToast('Post adicionado!', 'success');
}

/**
 * Salva os dados do mês (etapas 2–3) + posts do wizard (etapa 4),
 * depois atualiza todo o dashboard automaticamente.
 */
function handleWizardSave(e) {
  e.preventDefault();

  const id = State.selectedMonth;
  if (!id) { showToast('Selecione ou defina um mês antes de salvar.', 'error'); return; }

  const form = document.getElementById('monthlyForm');
  if (!form) return;

  const existing = getMonthById(id) || { id, label: monthIdToLabel(id) };
  upsertMonth({
    ...existing,
    id,
    label:        monthIdToLabel(id),
    followers:    Number(form.elements.followers.value)      || 0,
    newFollowers: Number(form.elements.newFollowers.value)   || 0,
    engagement:   parseFloat(form.elements.engagement.value) || 0,
    reach:        Number(form.elements.reach.value)          || 0,
    impressions:  Number(form.elements.impressions.value)    || 0,
    likes:        Number(form.elements.likes.value)          || 0,
    comments:     Number(form.elements.comments.value)       || 0,
    saves:        Number(form.elements.saves.value)          || 0,
    storiesViews: Number(form.elements.storiesViews.value)   || 0,
    reelsViews:   Number(form.elements.reelsViews.value)     || 0,
    postsCount:   Number(form.elements.postsCount.value)     || 0,
    bestDay:      form.elements.bestDay.value                || '',
  });

  // Salva posts adicionados na etapa 4
  const postsAdded = State.wizardPosts.length;
  State.wizardPosts.forEach(p => {
    upsertPost({ id: genId(), monthId: id, ...p });
  });

  // Atualiza todos os seletores e re-renderiza o dashboard
  syncAllMonthSelects();
  loadDashboardTab();
  renderMonthlyContent(id);   // reinicia wizard com dados salvos
  if (State.contentMonth === id)  renderPostsList(id);
  if (State.insightsMonth === id) renderInsightsTab(id);

  const extra = postsAdded > 0 ? ` + ${postsAdded} post${postsAdded > 1 ? 's' : ''} adicionado${postsAdded > 1 ? 's' : ''}!` : '.';
  showToast(`&#128190; Mês ${monthIdToLabel(id)} salvo com sucesso${extra}`, 'success', 4000);
}

function handleAddMonth() {
  const months = getMonths() || [];
  let nextId;

  if (months.length > 0) {
    const last   = months[months.length - 1].id;
    const [y, m] = last.split('-').map(Number);
    const d      = new Date(y, m, 1); // primeiro dia do mês seguinte
    nextId = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  } else {
    const now = new Date();
    nextId = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  if (months.find(m => m.id === nextId)) {
    State.selectedMonth = nextId;
    populateMonthSelect('monthSelect', nextId);
    renderMonthlyContent(nextId);
    showToast('Mês já cadastrado. Edite os dados abaixo.', 'info');
    return;
  }

  // Abre o wizard na etapa 1 pré-preenchido com o próximo mês (sem criar ainda)
  State.selectedMonth = nextId;
  State.wizardStep    = 1;
  State.wizardPosts   = [];

  const [year, month] = nextId.split('-');
  const sel = document.getElementById('wizMonth');
  const inp = document.getElementById('wizYear');
  if (sel) sel.value = month;
  if (inp) inp.value = year;

  fillMonthlyForm(null); // campos zerados
  goToWizardStep(1);

  // Oculta botão de excluir (mês ainda não existe)
  const dangerZone = document.getElementById('wizardDangerZone');
  if (dangerZone) dangerZone.style.display = 'none';

  document.getElementById('monthlyFormCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast(`Configurando novo mês: ${monthIdToLabel(nextId)}`, 'info');
}

// handleMonthlyFormSubmit substituído por handleWizardSave (wizard de 4 etapas)

function handleDeleteMonth() {
  const id = State.selectedMonth;
  if (!id) return;
  const month = getMonthById(id);
  openModal(
    `Excluir <strong>${month?.label || id}</strong> e todos os posts deste mês? Esta ação não pode ser desfeita.`,
    () => {
      deleteMonth(id);
      State.selectedMonth = getLatestMonthId();
      syncAllMonthSelects();
      renderMonthlyContent(State.selectedMonth);
      showToast('Mês excluído.', 'info');
    }
  );
}

/* ─────────────────────────────────────────────
   ABA 3 — MELHORES CONTEÚDOS
   ───────────────────────────────────────────── */
function loadContentTab() {
  if (!State.contentMonth) State.contentMonth = getLatestMonthId();
  populateMonthSelect('contentMonthSelect', State.contentMonth);
  renderPostsList(State.contentMonth);
  hidePostForm();
}

function renderPostsList(monthId) {
  State.contentMonth = monthId;
  const container = $('#postsList');
  if (!container) return;

  const months   = getMonths() || [];
  const monthIdx = months.findIndex(m => m.id === monthId);
  const month    = monthIdx >= 0 ? months[monthIdx] : null;
  const posts    = getPostsByMonth(monthId);

  if (!posts || posts.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">📸</div>
        <div class="empty-state-text">Nenhum post cadastrado para este mês.<br>
          Clique em <strong>+ Novo post</strong> para adicionar.</div>
      </div>`;
    return;
  }

  const followers = month?.followers || 1;

  container.innerHTML = posts.map((post, idx) => {
    const isTop    = idx === 0;
    const reasons  = analyzePost(post, followers);
    const score    = engagementScore(post);
    const hasViews = post.views > 0;
    const hasUrl   = post.url && post.url.trim() !== '';

    return `
      <div class="post-card ${isTop ? 'top-post' : ''}">

        <div class="post-card-header">
          <span class="post-type-badge ${escapeHtml(post.type)}">${escapeHtml(post.type)}</span>
          ${isTop ? '<span class="post-best-badge">⭐ Post do mês</span>' : ''}
        </div>

        <div class="post-theme">${escapeHtml(post.theme || '—')}</div>

        <div class="post-metrics">
          <div class="post-metric">
            <span class="post-metric-val">${fmtNum(post.likes)}</span>
            <span class="post-metric-lbl">❤️ Curtidas</span>
          </div>
          <div class="post-metric">
            <span class="post-metric-val">${fmtNum(post.comments)}</span>
            <span class="post-metric-lbl">💬 Comentários</span>
          </div>
          <div class="post-metric">
            <span class="post-metric-val">${fmtNum(post.saves)}</span>
            <span class="post-metric-lbl">💾 Salvamentos</span>
          </div>
          <div class="post-metric">
            <span class="post-metric-val">${fmtNum(post.reach)}</span>
            <span class="post-metric-lbl">📡 Alcance</span>
          </div>
          ${hasViews ? `
          <div class="post-metric">
            <span class="post-metric-val">${fmtNum(post.views)}</span>
            <span class="post-metric-lbl">👁️ Views</span>
          </div>` : ''}
          <div class="post-metric">
            <span class="post-metric-val">${fmtNum(score)}</span>
            <span class="post-metric-lbl">⚡ Score</span>
          </div>
        </div>

        <div class="post-analysis">
          <strong>Por que funcionou?</strong><br>
          ${reasons.join('<br>')}
        </div>

        <div class="post-card-footer">
          ${hasUrl
            ? `<a class="post-link" href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer">🔗 Ver no Instagram</a>`
            : '<span class="post-link" style="color:var(--text-muted)">Sem link</span>'
          }
          <div class="post-actions">
            <button class="btn-icon"     data-edit-post="${post.id}"   title="Editar">✏️</button>
            <button class="btn-icon del" data-delete-post="${post.id}" title="Excluir">🗑️</button>
          </div>
        </div>

      </div>`;
  }).join('');
}

function showPostForm(postData = null) {
  const card  = $('#postFormCard');
  const form  = document.getElementById('postForm');
  const title = $('#postFormTitle');
  if (!card || !form) return;

  card.style.display = '';
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (postData) {
    if (title) title.textContent = 'Editar post';
    State.editingPostId          = postData.id;
    form.elements.postId.value   = postData.id;
    form.elements.url.value      = postData.url      || '';
    form.elements.type.value     = postData.type     || 'Reels';
    form.elements.theme.value    = postData.theme    || '';
    form.elements.likes.value    = postData.likes    || '';
    form.elements.comments.value = postData.comments || '';
    form.elements.saves.value    = postData.saves    || '';
    form.elements.reach.value    = postData.reach    || '';
    form.elements.views.value    = postData.views    || '';
  } else {
    if (title) title.textContent = 'Cadastrar post';
    State.editingPostId          = null;
    form.reset();
    form.elements.postId.value   = '';
  }
}

function hidePostForm() {
  const card = $('#postFormCard');
  if (card) card.style.display = 'none';
  State.editingPostId = null;
  const form = document.getElementById('postForm');
  if (form) form.reset();
}

function handlePostFormSubmit(e) {
  e.preventDefault();
  const form    = e.target;
  const monthId = State.contentMonth;
  if (!monthId) { showToast('Selecione um mês antes de cadastrar um post.', 'error'); return; }

  const theme = form.elements.theme.value.trim();
  if (!theme)  { showToast('Informe o tema/assunto do post.', 'error'); return; }

  const wasEditing = !!State.editingPostId;
  upsertPost({
    id:       form.elements.postId.value || genId(),
    monthId,
    url:      form.elements.url.value.trim(),
    type:     form.elements.type.value,
    theme,
    likes:    Number(form.elements.likes.value)    || 0,
    comments: Number(form.elements.comments.value) || 0,
    saves:    Number(form.elements.saves.value)    || 0,
    reach:    Number(form.elements.reach.value)    || 0,
    views:    Number(form.elements.views.value)    || 0,
  });

  hidePostForm();
  renderPostsList(monthId);
  showToast(wasEditing ? 'Post atualizado!' : 'Post cadastrado!', 'success');
}

/* ─────────────────────────────────────────────
   ABA 4 — INSIGHTS & ESTRATÉGIA
   ───────────────────────────────────────────── */
function loadInsightsTab() {
  if (!State.insightsMonth) State.insightsMonth = getLatestMonthId();
  populateMonthSelect('insightsMonthSelect', State.insightsMonth);
  renderInsightsTab(State.insightsMonth);
}

/* ─────────────────────────────────────────────
   ABA 5 — CONFIGURAÇÕES
   ───────────────────────────────────────────── */
function loadSettingsTab() {
  const profile = getProfile() || {};
  const nameEl  = document.getElementById('settingsProfileName');
  const nicheEl = document.getElementById('settingsNiche');
  const tokenEl = document.getElementById('settingsToken');
  if (nameEl)  nameEl.value  = profile.name  || '';
  if (nicheEl) nicheEl.value = profile.niche || '';
  if (tokenEl) tokenEl.value = getToken()    || '';
}

function handleSaveProfile() {
  const name  = document.getElementById('settingsProfileName')?.value.trim();
  const niche = document.getElementById('settingsNiche')?.value.trim();
  saveProfile({ name: name || '', niche: niche || '' });
  const el = document.getElementById('profileName');
  if (el) el.textContent = name || '@marcelotavora';
  showToast('Perfil salvo!', 'success');
}

function handleSaveToken() {
  const token = document.getElementById('settingsToken')?.value.trim();
  saveToken(token || '');
  showToast('Token salvo localmente.', 'success');
}

function handleExport() {
  try {
    exportData();
    showToast('Dados exportados com sucesso!', 'success');
  } catch {
    showToast('Erro ao exportar dados.', 'error');
  }
}

function handleImport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      importData(e.target.result);
      showToast('Dados importados! Recarregando…', 'success');
      setTimeout(() => location.reload(), 1800);
    } catch {
      showToast('Erro ao importar: arquivo inválido ou corrompido.', 'error');
    }
  };
  reader.readAsText(file);
}

function handleClearData() {
  openModal(
    '⚠️ Limpar <strong>TODOS os dados</strong>? Meses, posts e configurações serão removidos permanentemente. Esta ação não pode ser desfeita.',
    () => {
      clearAllData();
      showToast('Dados removidos. Recarregando…', 'info');
      setTimeout(() => location.reload(), 1800);
    }
  );
}

/* ─────────────────────────────────────────────
   SINCRONIZAÇÃO COM A INSTAGRAM BASIC DISPLAY API
   ───────────────────────────────────────────── */

/**
 * Atualiza toda a UI do card de sync.
 * @param {object} opts
 *   running  {boolean}  — se a sync está em andamento
 *   pct      {number}   — 0-100, largura da barra de progresso
 *   step     {string}   — texto do passo atual
 *   result   {object|null}  — { type: 'success'|'error', data|message }
 */
function setSyncUI({ running = false, pct = 0, step = '', result = null } = {}) {
  const btnSync    = document.getElementById('btnSync');
  const syncStatus = document.getElementById('syncStatus');
  const syncBar    = document.getElementById('syncProgressBar');
  const syncStep   = document.getElementById('syncStep');
  const syncResult = document.getElementById('syncResult');

  // Botão
  if (btnSync) {
    btnSync.disabled = running;
    const lbl = btnSync.querySelector('.btn-sync-label');
    if (lbl) lbl.textContent = running ? 'Sincronizando…' : 'Sincronizar com Instagram';
  }

  // Barra de progresso
  if (syncStatus) syncStatus.style.display = running ? '' : 'none';
  if (syncBar)    syncBar.style.width       = `${pct}%`;
  if (syncStep)   syncStep.textContent      = step;

  // Caixa de resultado
  if (!syncResult) return;
  if (!result)     { syncResult.style.display = 'none'; return; }

  syncResult.style.display = '';

  if (result.type === 'success') {
    const d = result.data;

    const accountBadge = d.accountType
      ? `<span class="sync-account-type">${escapeHtml(d.accountType)}</span>`
      : '';

    const monthNote = d.usingCurrentMonth
      ? ''
      : `<p class="sync-month-note">⚠️ Nenhum post encontrado no mês atual — posts mais recentes foram importados.</p>`;

    const followersVal = d.followers > 0 ? fmtNum(d.followers) : 'N/D';
    const reachVal     = d.reach     > 0 ? fmtNum(d.reach)     : 'N/D';

    const limitationsHtml = d.limitations && d.limitations.length > 0
      ? `<div class="sync-limitations">
           <p class="sync-limitations-title">ℹ️ Limitações da Basic Display API:</p>
           <ul>${d.limitations.map(l => `<li>${l}</li>`).join('')}</ul>
         </div>`
      : '';

    syncResult.className = 'sync-result success';
    syncResult.innerHTML = `
      <strong>✅ Sincronizado — ${escapeHtml(d.monthLabel)}</strong>${accountBadge}
      ${monthNote}
      <div class="sync-result-grid">
        <div class="sync-stat">
          <span class="sync-stat-val">${followersVal}</span>
          <span class="sync-stat-lbl">Seguidores</span>
        </div>
        <div class="sync-stat">
          <span class="sync-stat-val">${reachVal}</span>
          <span class="sync-stat-lbl">Alcance médio</span>
        </div>
        <div class="sync-stat">
          <span class="sync-stat-val">${fmtNum(d.saves ?? 0)}</span>
          <span class="sync-stat-lbl">Salvamentos (média)</span>
        </div>
        <div class="sync-stat">
          <span class="sync-stat-val">${d.postsCount}</span>
          <span class="sync-stat-lbl">Posts importados</span>
        </div>
      </div>
      ${limitationsHtml}`;

  } else {
    syncResult.className = 'sync-result error';
    syncResult.innerHTML = `
      <strong>❌ Falha na sincronização</strong>
      <div class="sync-error-msg">${escapeHtml(result.message)}</div>`;
  }
}

async function handleSync() {
  const token = localStorage.getItem('ig_token') || localStorage.getItem('igdash_token') || '';

  // Token ausente
  if (!token) {
    setSyncUI({ result: { type: 'error', message: 'Token não encontrado. Cole seu Instagram User Access Token (começa com IGAAT) no campo acima, clique em "Salvar token" e tente novamente.' } });
    return;
  }

  // Token com prefixo errado
  if (!token.startsWith('IGAAT') && !token.startsWith('IGQ')) {
    setSyncUI({ result: { type: 'error', message: 'O token salvo não parece ser um Instagram User Access Token (deve começar com "IGAAT"). Verifique e substitua pelo token correto.' } });
    return;
  }

  // Inicia loading
  setSyncUI({ running: true, pct: 0, step: 'Iniciando conexão com a Basic Display API…' });

  try {
    const result = await syncWithInstagram((step, pct) => {
      setSyncUI({ running: true, pct, step });
    });

    // Sucesso
    setSyncUI({ running: false, result: { type: 'success', data: result } });

    const toastMsg = result.usingCurrentMonth
      ? `✅ Sincronizado! ${result.postsCount} posts do mês atual importados.`
      : `✅ Sincronizado! ${result.postsCount} posts recentes importados.`;
    showToast(toastMsg, 'success', 5000);

    // Aponta todos os seletores para o mês recém-sincronizado
    const newId = getCurrentMonthId();
    State.selectedMonth = newId;
    State.contentMonth  = newId;
    State.insightsMonth = newId;
    syncAllMonthSelects();

    // Re-renderiza dashboard e aba ativa
    loadDashboardTab();
    if (State.activeTab === 'monthly')  renderMonthlyContent(newId);
    if (State.activeTab === 'content')  renderPostsList(newId);
    if (State.activeTab === 'insights') renderInsightsTab(newId);

    // Atualiza nome na sidebar
    const profile = getProfile();
    if (profile?.name) {
      const el = document.getElementById('profileName');
      if (el) el.textContent = profile.name;
    }

  } catch (err) {
    setSyncUI({ running: false, result: { type: 'error', message: err.message } });
    showToast('❌ Erro na sincronização. Veja detalhes nas Configurações.', 'error', 5000);
    console.error('[Sync]', err);
  }
}

/* ─────────────────────────────────────────────
   INICIALIZAÇÃO DO PERFIL NA SIDEBAR
   ───────────────────────────────────────────── */
function initProfile() {
  const profile = getProfile();
  if (profile?.name) {
    const el = document.getElementById('profileName');
    if (el) el.textContent = profile.name;
  }
}

/* ─────────────────────────────────────────────
   EVENT LISTENERS
   ───────────────────────────────────────────── */
function bindEvents() {

  // ── Navegação por abas ─────────────────────
  $$('.nav-item').forEach(btn =>
    btn.addEventListener('click', () => activateTab(btn.dataset.tab))
  );

  // ── Sidebar mobile ─────────────────────────
  $('#hamburger')?.addEventListener('click', openSidebar);
  $('#sidebarOverlay')?.addEventListener('click', closeSidebar);

  // ── Modal ──────────────────────────────────
  $('#modalCancel')?.addEventListener('click', closeModal);
  $('#modalConfirm')?.addEventListener('click', () => {
    if (State.pendingConfirmFn) State.pendingConfirmFn();
    closeModal();
  });
  $('#modalOverlay')?.addEventListener('click', (e) => {
    if (e.target === $('#modalOverlay')) closeModal();
  });

  // ── Aba 2: Análise Mensal — Wizard ─────────
  document.getElementById('monthSelect')
    ?.addEventListener('change', (e) => renderMonthlyContent(e.target.value));

  document.getElementById('btnAddMonth')
    ?.addEventListener('click', handleAddMonth);

  // Wizard: navegação entre etapas
  document.getElementById('btnWizardNext')
    ?.addEventListener('click', handleWizardNext);

  document.getElementById('btnWizardPrev')
    ?.addEventListener('click', handleWizardPrev);

  // Wizard: salvar mês (submit da etapa 4)
  document.getElementById('monthlyForm')
    ?.addEventListener('submit', handleWizardSave);

  // Wizard etapa 4: adicionar post
  document.getElementById('btnWizardAddPost')
    ?.addEventListener('click', showWizardPostForm);

  document.getElementById('btnWizardConfirmPost')
    ?.addEventListener('click', handleWizardConfirmPost);

  document.getElementById('btnWizardCancelPost')
    ?.addEventListener('click', hideWizardPostForm);

  // Wizard etapa 4: remover post via delegação
  document.getElementById('wizardPostsList')
    ?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove-wizard-post]');
      if (!btn) return;
      const idx = parseInt(btn.dataset.removeWizardPost, 10);
      if (!isNaN(idx) && idx >= 0 && idx < State.wizardPosts.length) {
        State.wizardPosts.splice(idx, 1);
        renderWizardPosts();
      }
    });

  document.getElementById('btnDeleteMonth')
    ?.addEventListener('click', handleDeleteMonth);

  // ── Aba 3: Melhores Conteúdos ──────────────
  document.getElementById('contentMonthSelect')
    ?.addEventListener('change', (e) => {
      renderPostsList(e.target.value);
      hidePostForm();
    });

  document.getElementById('btnAddPost')
    ?.addEventListener('click', () => showPostForm(null));

  document.getElementById('postForm')
    ?.addEventListener('submit', handlePostFormSubmit);

  document.getElementById('btnCancelPost')
    ?.addEventListener('click', hidePostForm);

  // Delegação nos cards de post (editar / excluir)
  document.getElementById('postsList')
    ?.addEventListener('click', (e) => {
      const editBtn   = e.target.closest('[data-edit-post]');
      const deleteBtn = e.target.closest('[data-delete-post]');

      if (editBtn) {
        const post = (getPosts() || []).find(p => p.id === editBtn.dataset.editPost);
        if (post) showPostForm(post);
      }

      if (deleteBtn) {
        const id   = deleteBtn.dataset.deletePost;
        const post = (getPosts() || []).find(p => p.id === id);
        openModal(
          `Excluir o post <strong>"${escapeHtml(post?.theme || id)}"</strong>? Esta ação não pode ser desfeita.`,
          () => {
            deletePost(id);
            renderPostsList(State.contentMonth);
            showToast('Post excluído.', 'info');
          }
        );
      }
    });

  // ── Aba 4: Insights ────────────────────────
  document.getElementById('insightsMonthSelect')
    ?.addEventListener('change', (e) => {
      State.insightsMonth = e.target.value;
      renderInsightsTab(e.target.value);
    });

  // ── Aba 5: Configurações ───────────────────
  document.getElementById('btnSaveProfile')
    ?.addEventListener('click', handleSaveProfile);

  document.getElementById('btnSaveToken')
    ?.addEventListener('click', () => {
      handleSaveToken();
      setSyncUI({}); // limpa resultado anterior ao salvar novo token
    });

  document.getElementById('btnSync')
    ?.addEventListener('click', handleSync);

  document.getElementById('btnExport')
    ?.addEventListener('click', handleExport);

  document.getElementById('btnImportTrigger')
    ?.addEventListener('click', () => document.getElementById('btnImport')?.click());

  document.getElementById('btnImport')
    ?.addEventListener('change', (e) => {
      handleImport(e.target.files?.[0]);
      e.target.value = ''; // permite reimportar o mesmo arquivo
    });

  document.getElementById('btnClearData')
    ?.addEventListener('click', handleClearData);

  // ── Teclado: ESC fecha sidebar e modal ─────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeSidebar(); }
  });

  // ── Resize: fecha sidebar ao ampliar janela ─
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeSidebar();
  });
}

/* ─────────────────────────────────────────────
   BOOT — ponto de entrada
   ───────────────────────────────────────────── */
function boot() {
  // 1. Seed de dados de exemplo (só na primeira abertura)
  seedIfEmpty();

  // 2. Estado inicial dos seletores de mês
  const latestId      = getLatestMonthId();
  State.selectedMonth = latestId;
  State.contentMonth  = latestId;
  State.insightsMonth = latestId;

  // 3. Popula selects, perfil e data
  syncAllMonthSelects();
  initProfile();
  setTopbarDate();

  // 4. Registra todos os eventos
  bindEvents();

  // 5. Ativa a aba inicial
  activateTab('dashboard');
}

// Garante que o DOM está pronto antes de iniciar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
