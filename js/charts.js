/* =============================================
   charts.js — Todos os gráficos com Chart.js 4
   ============================================= */

// ─── Paleta Instagram ──────────────────────────
const COLORS = {
  orange:  '#f58529',
  pink:    '#dd2a7b',
  purple:  '#8134af',
  blue:    '#515bd4',
  green:   '#22c55e',
  red:     '#ef4444',
  yellow:  '#f59e0b',

  // Com transparência
  orangeA: (a) => `rgba(245,133,41,${a})`,
  pinkA:   (a) => `rgba(221,42,123,${a})`,
  purpleA: (a) => `rgba(129,52,175,${a})`,
  blueA:   (a) => `rgba(81,91,212,${a})`,
  greenA:  (a) => `rgba(34,197,94,${a})`,
  redA:    (a) => `rgba(239,68,68,${a})`,
  yellowA: (a) => `rgba(245,158,11,${a})`,
};

// ─── Defaults globais do Chart.js ─────────────
Chart.defaults.color          = '#8888aa';
Chart.defaults.borderColor    = 'rgba(255,255,255,0.07)';
Chart.defaults.font.family    = "'Inter', system-ui, sans-serif";
Chart.defaults.font.size      = 12;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyleWidth = 8;
Chart.defaults.plugins.legend.labels.padding = 16;

// ─── Registro de instâncias (para destroy/update) ──
const _charts = {};

function destroyChart(id) {
  if (_charts[id]) {
    _charts[id].destroy();
    delete _charts[id];
  }
}

// ─── Função utilitária: gradiente de linha ────
function makeGradient(ctx, colorFn, alphaTop = 0.35, alphaBot = 0.0) {
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradient.addColorStop(0, colorFn(alphaTop));
  gradient.addColorStop(1, colorFn(alphaBot));
  return gradient;
}

// ─── Opções base para gráficos de linha ───────
function lineBaseOpts(yLabel = '', yFormatter = null) {
  return {
    responsive: true,
    maintainAspectRatio: true,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        backgroundColor: '#1a1a27',
        borderColor: 'rgba(221,42,123,0.3)',
        borderWidth: 1,
        padding: 10,
        callbacks: yFormatter ? {
          label: (ctx) => ` ${ctx.dataset.label}: ${yFormatter(ctx.parsed.y)}`
        } : {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('pt-BR')}`
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { maxRotation: 0 },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: {
          callback: yFormatter
            ? (v) => yFormatter(v)
            : (v) => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v,
        },
        title: yLabel ? { display: true, text: yLabel, color: '#55556a', font: { size: 11 } } : undefined,
      },
    },
  };
}

// ─── Opções base para gráficos de barra ───────
function barBaseOpts(yFormatter = null) {
  return {
    responsive: true,
    maintainAspectRatio: true,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        backgroundColor: '#1a1a27',
        borderColor: 'rgba(221,42,123,0.3)',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('pt-BR')}`,
        },
      },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' } },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: {
          callback: yFormatter
            ? (v) => yFormatter(v)
            : (v) => v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v,
        },
      },
    },
  };
}

// ─── Dataset de linha padrão ──────────────────
function lineDataset(label, data, colorFn, canvasEl) {
  const ctx = canvasEl.getContext('2d');
  return {
    label,
    data,
    borderColor:     colorFn(1),
    backgroundColor: makeGradient(ctx, colorFn, 0.3, 0.0),
    pointBackgroundColor: colorFn(1),
    pointBorderColor:     '#0d0d12',
    pointBorderWidth: 2,
    pointRadius:      4,
    pointHoverRadius: 6,
    borderWidth: 2.5,
    tension: 0.42,
    fill: true,
  };
}

// ─── Dataset de barra padrão ─────────────────
function barDataset(label, data, colorFn, opts = {}) {
  return {
    label,
    data,
    backgroundColor: data.map((_, i) => colorFn(i % 2 === 0 ? 0.8 : 0.6)),
    borderColor:     data.map(() => colorFn(1)),
    borderWidth:     1.5,
    borderRadius:    6,
    borderSkipped:   false,
    ...opts,
  };
}

/* ─────────────────────────────────────────────
   ABA 1 — DASHBOARD GERAL
   ───────────────────────────────────────────── */

/**
 * Gráfico 1: Evolução de Seguidores (linha)
 */
function renderFollowersChart(months) {
  const canvas = document.getElementById('chart-followers');
  if (!canvas) return;
  destroyChart('followers');

  const labels = months.map(m => m.label.split(' ').slice(0, 1).join(' ') + ' ' + m.id.split('-')[0].slice(2));
  const data   = months.map(m => m.followers);

  _charts['followers'] = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [lineDataset('Seguidores', data, COLORS.pinkA, canvas)],
    },
    options: {
      ...lineBaseOpts(),
      plugins: {
        ...lineBaseOpts().plugins,
        legend: { display: false },
      },
    },
  });
}

/**
 * Gráfico 2: Taxa de Engajamento (linha)
 */
function renderEngagementChart(months) {
  const canvas = document.getElementById('chart-engagement');
  if (!canvas) return;
  destroyChart('engagement');

  const labels = months.map(m => m.label.split(' ')[0].slice(0, 3) + ' ' + m.id.split('-')[0].slice(2));
  const data   = months.map(m => m.engagement);

  _charts['engagement'] = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [lineDataset('Engajamento (%)', data, COLORS.purpleA, canvas)],
    },
    options: {
      ...lineBaseOpts('', (v) => v.toFixed(1) + '%'),
      plugins: {
        ...lineBaseOpts().plugins,
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1a27',
          borderColor: 'rgba(129,52,175,0.4)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (ctx) => ` Engajamento: ${ctx.parsed.y.toFixed(2)}%`,
          },
        },
      },
    },
  });
}

/**
 * Gráfico 3: Alcance vs Impressões (linhas duplas)
 */
function renderReachImpressionsChart(months) {
  const canvas = document.getElementById('chart-reach-impressions');
  if (!canvas) return;
  destroyChart('reach-impressions');

  const labels     = months.map(m => m.label.split(' ')[0].slice(0, 3) + ' ' + m.id.split('-')[0].slice(2));
  const reachData  = months.map(m => m.reach);
  const impressData = months.map(m => m.impressions);

  _charts['reach-impressions'] = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        lineDataset('Alcance médio', reachData, COLORS.orangeA, canvas),
        lineDataset('Impressões', impressData, COLORS.blueA, canvas),
      ],
    },
    options: lineBaseOpts(),
  });
}

/**
 * Gráfico 4: Interações médias por post (barras empilhadas)
 */
function renderInteractionsChart(months) {
  const canvas = document.getElementById('chart-interactions');
  if (!canvas) return;
  destroyChart('interactions');

  const labels   = months.map(m => m.label.split(' ')[0].slice(0, 3) + ' ' + m.id.split('-')[0].slice(2));

  _charts['interactions'] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Curtidas',
          data: months.map(m => m.likes),
          backgroundColor: COLORS.pinkA(0.8),
          borderColor:     COLORS.pink,
          borderWidth: 1.5,
          borderRadius: 4,
          borderSkipped: false,
          stack: 'interactions',
        },
        {
          label: 'Comentários',
          data: months.map(m => m.comments),
          backgroundColor: COLORS.purpleA(0.8),
          borderColor:     COLORS.purple,
          borderWidth: 1.5,
          borderRadius: 0,
          stack: 'interactions',
        },
        {
          label: 'Salvamentos',
          data: months.map(m => m.saves),
          backgroundColor: COLORS.blueA(0.8),
          borderColor:     COLORS.blue,
          borderWidth: 1.5,
          borderRadius: 0,
          stack: 'interactions',
        },
      ],
    },
    options: {
      ...barBaseOpts(),
      scales: {
        ...barBaseOpts().scales,
        x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' } },
      },
    },
  });
}

/* ─────────────────────────────────────────────
   ABA 2 — ANÁLISE MENSAL
   ───────────────────────────────────────────── */

/**
 * Gráfico de barras com as principais métricas do mês selecionado
 * Normaliza valores para caber no mesmo eixo usando índice 0–100
 */
function renderMonthlyBarChart(month) {
  const canvas = document.getElementById('chart-monthly-bar');
  if (!canvas) return;
  destroyChart('monthly-bar');

  if (!month) {
    canvas.parentElement.style.display = 'none';
    return;
  }
  canvas.parentElement.style.display = '';

  // Métricas a exibir com seus valores brutos
  const metrics = [
    { label: 'Curtidas',    value: month.likes,        colorFn: COLORS.pinkA },
    { label: 'Comentários', value: month.comments,     colorFn: COLORS.purpleA },
    { label: 'Salvamentos', value: month.saves,        colorFn: COLORS.blueA },
    { label: 'Alcance',     value: month.reach,        colorFn: COLORS.orangeA },
    { label: 'Views Reels', value: month.reelsViews,   colorFn: COLORS.yellowA },
    { label: 'Views Stories', value: month.storiesViews, colorFn: (a) => `rgba(34,197,94,${a})` },
  ];

  _charts['monthly-bar'] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: metrics.map(m => m.label),
      datasets: [{
        label: month.label,
        data:  metrics.map(m => m.value || 0),
        backgroundColor: metrics.map(m => m.colorFn(0.75)),
        borderColor:     metrics.map(m => m.colorFn(1)),
        borderWidth: 1.5,
        borderRadius: 8,
        borderSkipped: false,
      }],
    },
    options: {
      ...barBaseOpts(),
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1a27',
          borderColor: 'rgba(221,42,123,0.3)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed.y.toLocaleString('pt-BR')}`,
          },
        },
      },
    },
  });
}

/* ─────────────────────────────────────────────
   ABA 3 — MELHORES CONTEÚDOS
   (sem gráfico próprio — análise por card)
   ───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   MINI SPARKLINES — para uso futuro / expansão
   ───────────────────────────────────────────── */

/**
 * Sparkline de linha minimalista dentro de um canvas pequeno
 * @param {string} canvasId
 * @param {number[]} data
 * @param {Function} colorFn  ex: COLORS.pinkA
 */
function renderSparkline(canvasId, data, colorFn) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !data || data.length < 2) return;
  destroyChart(canvasId);

  _charts[canvasId] = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data,
        borderColor:     colorFn(1),
        backgroundColor: colorFn(0.2),
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
      }],
    },
    options: {
      responsive: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  });
}

/* ─────────────────────────────────────────────
   RENDER PRINCIPAL — chama todos os gráficos
   ───────────────────────────────────────────── */

/**
 * Renderiza (ou re-renderiza) todos os gráficos da aba Dashboard Geral.
 * Chamado pelo app.js sempre que os dados mudarem ou a aba for ativada.
 */
function renderDashboardCharts() {
  const months = getMonths();
  if (!months || months.length === 0) return;

  renderFollowersChart(months);
  renderEngagementChart(months);
  renderReachImpressionsChart(months);
  renderInteractionsChart(months);
}

/**
 * Renderiza o gráfico da aba Análise Mensal para um mês específico.
 * @param {string} monthId  ex: '2025-01'
 */
function renderMonthlyCharts(monthId) {
  const month = getMonthById(monthId);
  renderMonthlyBarChart(month || null);
}

/* ─────────────────────────────────────────────
   ATUALIZAÇÃO DINÂMICA DOS DADOS DO GRÁFICO
   (sem recriar a instância — mais fluido)
   ───────────────────────────────────────────── */

/**
 * Atualiza os dados de um gráfico já existente sem destruí-lo.
 * @param {string} id     chave em _charts
 * @param {number[][]} datasets  array de arrays de novos dados (um por dataset)
 * @param {string[]} [labels]   novos labels (opcional)
 */
function updateChartData(id, datasets, labels = null) {
  const chart = _charts[id];
  if (!chart) return;

  if (labels) chart.data.labels = labels;

  datasets.forEach((data, i) => {
    if (chart.data.datasets[i]) {
      chart.data.datasets[i].data = data;
    }
  });

  chart.update('active');
}

/* ─────────────────────────────────────────────
   GRÁFICO DE ROSCA — distribuição de formatos
   (usado na aba Insights, opcional)
   ───────────────────────────────────────────── */

/**
 * Conta quantos posts por tipo existem num dado mês e renderiza
 * um doughnut mostrando a distribuição de formatos.
 * @param {string} canvasId
 * @param {string} monthId
 */
function renderFormatDonut(canvasId, monthId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  destroyChart(canvasId);

  const posts = getPostsByMonth(monthId);
  if (!posts || posts.length === 0) return;

  const counts = { Reels: 0, Carrossel: 0, Foto: 0, Stories: 0 };
  posts.forEach(p => { if (counts[p.type] !== undefined) counts[p.type]++; });

  const labels = Object.keys(counts).filter(k => counts[k] > 0);
  const data   = labels.map(k => counts[k]);
  const colors = {
    Reels:     COLORS.pink,
    Carrossel: COLORS.purple,
    Foto:      COLORS.orange,
    Stories:   COLORS.blue,
  };

  _charts[canvasId] = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map(l => colors[l]),
        borderColor:     '#1a1a27',
        borderWidth: 3,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 14, font: { size: 11 } },
        },
        tooltip: {
          backgroundColor: '#1a1a27',
          borderColor: 'rgba(221,42,123,0.3)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed} post(s)`,
          },
        },
      },
    },
  });
}

/* ─────────────────────────────────────────────
   GRÁFICO RADAR — comparativo de métricas
   Compara mês atual vs mês anterior de forma visual
   ───────────────────────────────────────────── */

/**
 * Normaliza um valor para 0–100 relativo ao máximo do array
 */
function normalizeArr(arr) {
  const max = Math.max(...arr, 1);
  return arr.map(v => Math.round((v / max) * 100));
}

/**
 * @param {string} canvasId
 * @param {object} current   mês atual
 * @param {object} previous  mês anterior (pode ser null)
 */
function renderComparisonRadar(canvasId, current, previous) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !current) return;
  destroyChart(canvasId);

  const axes = ['Engajamento', 'Alcance', 'Curtidas', 'Comentários', 'Salvamentos', 'Views Reels'];

  const currentRaw  = [current.engagement * 10, current.reach / 50, current.likes, current.comments * 5, current.saves * 2, current.reelsViews / 100];
  const previousRaw = previous ? [previous.engagement * 10, previous.reach / 50, previous.likes, previous.comments * 5, previous.saves * 2, previous.reelsViews / 100] : null;

  const allValues = previousRaw ? [...currentRaw, ...previousRaw] : currentRaw;
  const maxVal    = Math.max(...allValues, 1);
  const normalize = (arr) => arr.map(v => Math.round((v / maxVal) * 100));

  const datasets = [
    {
      label: current.label,
      data:  normalize(currentRaw),
      borderColor:     COLORS.pink,
      backgroundColor: COLORS.pinkA(0.15),
      pointBackgroundColor: COLORS.pink,
      borderWidth: 2,
      pointRadius: 3,
    },
  ];

  if (previousRaw) {
    datasets.push({
      label: previous.label,
      data:  normalize(previousRaw),
      borderColor:     COLORS.blueA(0.7),
      backgroundColor: COLORS.blueA(0.07),
      pointBackgroundColor: COLORS.blue,
      borderWidth: 1.5,
      borderDash: [5, 3],
      pointRadius: 3,
    });
  }

  _charts[canvasId] = new Chart(canvas, {
    type: 'radar',
    data: { labels: axes, datasets },
    options: {
      responsive: true,
      scales: {
        r: {
          min: 0,
          max: 100,
          grid:      { color: 'rgba(255,255,255,0.07)' },
          angleLines: { color: 'rgba(255,255,255,0.07)' },
          pointLabels: { color: '#8888aa', font: { size: 11 } },
          ticks: { display: false },
        },
      },
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          backgroundColor: '#1a1a27',
          borderColor: 'rgba(221,42,123,0.3)',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.r}pts`,
          },
        },
      },
    },
  });
}
