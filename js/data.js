/* =============================================
   data.js — Dados de exemplo + localStorage
   ============================================= */

// ─── Chaves do localStorage ────────────────────
const KEYS = {
  months:   'igdash_months',
  posts:    'igdash_posts',
  profile:  'igdash_profile',
  token:    'igdash_token',
};

// ─── Dados de exemplo ─────────────────────────
// 6 meses realistas para @marcelotavora — infoprodutor com ~45k seguidores
const SAMPLE_MONTHS = [
  {
    id: '2024-09',
    label: 'Setembro 2024',
    followers:    41200,
    newFollowers:   780,
    engagement:     3.8,
    reach:         3200,
    impressions:  98500,
    likes:          380,
    comments:        52,
    saves:          210,
    storiesViews:  2100,
    reelsViews:   18500,
    postsCount:      12,
    bestDay:      'Terça-feira',
  },
  {
    id: '2024-10',
    label: 'Outubro 2024',
    followers:    42100,
    newFollowers:   900,
    engagement:     4.1,
    reach:         3800,
    impressions: 112000,
    likes:          420,
    comments:        58,
    saves:          245,
    storiesViews:  2350,
    reelsViews:   24000,
    postsCount:      14,
    bestDay:      'Quarta-feira',
  },
  {
    id: '2024-11',
    label: 'Novembro 2024',
    followers:    42900,
    newFollowers:   800,
    engagement:     3.9,
    reach:         3500,
    impressions: 105000,
    likes:          395,
    comments:        54,
    saves:          228,
    storiesViews:  2200,
    reelsViews:   21000,
    postsCount:      13,
    bestDay:      'Terça-feira',
  },
  {
    id: '2024-12',
    label: 'Dezembro 2024',
    followers:    43800,
    newFollowers:   900,
    engagement:     3.6,
    reach:         3200,
    impressions:  96000,
    likes:          365,
    comments:        48,
    saves:          215,
    storiesViews:  2050,
    reelsViews:   19500,
    postsCount:      11,
    bestDay:      'Quinta-feira',
  },
  {
    id: '2025-01',
    label: 'Janeiro 2025',
    followers:    44600,
    newFollowers:   800,
    engagement:     4.3,
    reach:         4200,
    impressions: 128000,
    likes:          450,
    comments:        65,
    saves:          280,
    storiesViews:  2600,
    reelsViews:   32000,
    postsCount:      15,
    bestDay:      'Terça-feira',
  },
  {
    id: '2025-02',
    label: 'Fevereiro 2025',
    followers:    45200,
    newFollowers:   600,
    engagement:     4.0,
    reach:         3900,
    impressions: 118000,
    likes:          415,
    comments:        60,
    saves:          260,
    storiesViews:  2400,
    reelsViews:   28000,
    postsCount:      13,
    bestDay:      'Quarta-feira',
  },
];

// ─── Posts de exemplo — @marcelotavora (infoprodutos) ─
const SAMPLE_POSTS = [
  // ── Novembro 2024 ──
  {
    id: 'post-nov-1',
    monthId: '2024-11',
    url: 'https://www.instagram.com/p/exemplo1/',
    type: 'Reels',
    theme: 'Bastidores do meu último lançamento: o que funcionou e o que não funcionou',
    likes: 820,
    comments:  94,
    saves:    310,
    reach:  18200,
    views:  62000,
  },
  {
    id: 'post-nov-2',
    monthId: '2024-11',
    url: 'https://www.instagram.com/p/exemplo2/',
    type: 'Carrossel',
    theme: '7 gatilhos mentais que usei para faturar 6 dígitos no lançamento',
    likes: 560,
    comments:  68,
    saves:    485,
    reach:   6800,
    views:      0,
  },
  {
    id: 'post-nov-3',
    monthId: '2024-11',
    url: 'https://www.instagram.com/p/exemplo3/',
    type: 'Carrossel',
    theme: 'Case de aluno: de R$ 0 a R$ 27k no primeiro lançamento',
    likes: 490,
    comments:  82,
    saves:    320,
    reach:   5400,
    views:      0,
  },

  // ── Dezembro 2024 ──
  {
    id: 'post-dez-1',
    monthId: '2024-12',
    url: 'https://www.instagram.com/p/exemplo4/',
    type: 'Reels',
    theme: '3 erros que matam qualquer lançamento (e como evitar)',
    likes: 740,
    comments:  86,
    saves:    285,
    reach:  15600,
    views:  48000,
  },
  {
    id: 'post-dez-2',
    monthId: '2024-12',
    url: 'https://www.instagram.com/p/exemplo5/',
    type: 'Carrossel',
    theme: 'Métricas que acompanho no Meta Ads para escalar lançamentos',
    likes: 430,
    comments:  52,
    saves:    410,
    reach:   4900,
    views:      0,
  },
  {
    id: 'post-dez-3',
    monthId: '2024-12',
    url: 'https://www.instagram.com/p/exemplo6/',
    type: 'Reels',
    theme: 'Copy de vendas: como escrever uma oferta que converte',
    likes: 615,
    comments:  74,
    saves:    245,
    reach:  12800,
    views:  38500,
  },

  // ── Janeiro 2025 ──
  {
    id: 'post-jan-1',
    monthId: '2025-01',
    url: 'https://www.instagram.com/p/exemplo7/',
    type: 'Reels',
    theme: 'Como estruturei um lançamento que gerou R$ 180k em 7 dias',
    likes: 1140,
    comments:  148,
    saves:    520,
    reach:  32000,
    views:  95000,
  },
  {
    id: 'post-jan-2',
    monthId: '2025-01',
    url: 'https://www.instagram.com/p/exemplo8/',
    type: 'Carrossel',
    theme: 'Checklist completo: 30 dias antes do seu lançamento',
    likes: 680,
    comments:  76,
    saves:    720,
    reach:   7800,
    views:      0,
  },
  {
    id: 'post-jan-3',
    monthId: '2025-01',
    url: 'https://www.instagram.com/p/exemplo9/',
    type: 'Reels',
    theme: 'Análise ao vivo: campanha de R$ 50k de investimento em tráfego',
    likes: 860,
    comments:  112,
    saves:    380,
    reach:  22000,
    views:  71000,
  },

  // ── Fevereiro 2025 ──
  {
    id: 'post-fev-1',
    monthId: '2025-02',
    url: 'https://www.instagram.com/p/exemplo10/',
    type: 'Carrossel',
    theme: 'Esteira de produtos: do infoproduto básico ao high ticket',
    likes: 590,
    comments:  64,
    saves:    630,
    reach:   6200,
    views:      0,
  },
  {
    id: 'post-fev-2',
    monthId: '2025-02',
    url: 'https://www.instagram.com/p/exemplo11/',
    type: 'Reels',
    theme: 'Sequência de e-mails de carrinho aberto que vende sem ser chato',
    likes: 720,
    comments:  88,
    saves:    340,
    reach:  16500,
    views:  52000,
  },
  {
    id: 'post-fev-3',
    monthId: '2025-02',
    url: 'https://www.instagram.com/p/exemplo12/',
    type: 'Carrossel',
    theme: 'Prova social que converte: como coletar depoimentos de alunos',
    likes: 510,
    comments:  70,
    saves:    490,
    reach:   5800,
    views:      0,
  },
];

const SAMPLE_PROFILE = {
  name:  '@marcelotavora',
  niche: 'Infoprodutos, Lançamentos e Análise de Dados',
};

// ─── Nomes dos meses em português ─────────────
const MONTH_NAMES = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
];

// ─── Helpers de geração de ID ─────────────────
function genId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

// Converte "YYYY-MM" em label legível
function monthIdToLabel(id) {
  const [y, m] = id.split('-');
  return `${MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`;
}

// Formata número grande com abreviação (1200 → 1,2k)
function fmtNum(n) {
  n = Number(n) || 0;
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace('.0', '') + 'k';
  return n.toString();
}

// Formata percentual
function fmtPct(n) {
  return (Number(n) || 0).toFixed(1) + '%';
}

// Diferença percentual entre dois valores
function pctDiff(current, previous) {
  if (!previous) return null;
  return ((current - previous) / previous) * 100;
}

// Formata delta para exibição no card
function fmtDelta(current, previous, isPercent = false) {
  const diff = pctDiff(current, previous);
  if (diff === null) return { text: '—', cls: 'neutral' };
  const sign  = diff >= 0 ? '+' : '';
  const arrow = diff >= 0 ? '▲' : '▼';
  const cls   = diff >= 0 ? 'positive' : 'negative';
  const text  = `${arrow} ${sign}${diff.toFixed(1)}% vs mês anterior`;
  return { text, cls };
}

// ─── API de acesso ao localStorage ────────────

/** Retorna array de meses ordenado por id ASC */
function getMonths() {
  try {
    const raw = localStorage.getItem(KEYS.months);
    const data = raw ? JSON.parse(raw) : null;
    if (!Array.isArray(data) || data.length === 0) return null;
    return [...data].sort((a, b) => a.id.localeCompare(b.id));
  } catch { return null; }
}

function saveMonths(months) {
  localStorage.setItem(KEYS.months, JSON.stringify(months));
}

function getMonthById(id) {
  const months = getMonths();
  return months ? months.find(m => m.id === id) || null : null;
}

function upsertMonth(monthData) {
  let months = getMonths() || [];
  const idx  = months.findIndex(m => m.id === monthData.id);
  if (idx >= 0) months[idx] = monthData;
  else months.push(monthData);
  saveMonths(months);
}

function deleteMonth(id) {
  let months = getMonths() || [];
  saveMonths(months.filter(m => m.id !== id));
  // também remove posts daquele mês
  let posts = getPosts() || [];
  savePosts(posts.filter(p => p.monthId !== id));
}

/** Retorna posts de um mês específico, ordenados por engajamento total desc */
function getPostsByMonth(monthId) {
  const posts = getPosts() || [];
  return posts
    .filter(p => p.monthId === monthId)
    .sort((a, b) => engagementScore(b) - engagementScore(a));
}

/** Score de engajamento para ordenação */
function engagementScore(post) {
  return (post.likes || 0) + (post.comments || 0) * 3 + (post.saves || 0) * 4;
}

function getPosts() {
  try {
    const raw = localStorage.getItem(KEYS.posts);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function savePosts(posts) {
  localStorage.setItem(KEYS.posts, JSON.stringify(posts));
}

function upsertPost(postData) {
  let posts = getPosts() || [];
  const idx = posts.findIndex(p => p.id === postData.id);
  if (idx >= 0) posts[idx] = postData;
  else posts.push(postData);
  savePosts(posts);
}

function deletePost(id) {
  let posts = getPosts() || [];
  savePosts(posts.filter(p => p.id !== id));
}

function getProfile() {
  try {
    const raw = localStorage.getItem(KEYS.profile);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveProfile(profile) {
  localStorage.setItem(KEYS.profile, JSON.stringify(profile));
}

function getToken() {
  // Verifica ambas as chaves: ig_token (usuário) e igdash_token (settings interno)
  return localStorage.getItem('ig_token') || localStorage.getItem(KEYS.token) || '';
}

function saveToken(token) {
  localStorage.setItem(KEYS.token, token);
  localStorage.setItem('ig_token', token); // mantém as duas chaves em sincronia
}

// ─── Seed: carrega dados de exemplo se o localStorage estiver vazio ──
function seedIfEmpty() {
  if (!getMonths()) {
    saveMonths(SAMPLE_MONTHS.map(m => ({ ...m })));
  }
  if (!getPosts()) {
    savePosts(SAMPLE_POSTS.map(p => ({ ...p })));
  }
  if (!getProfile()) {
    saveProfile({ ...SAMPLE_PROFILE });
  }
}

// ─── Exportar todos os dados ───────────────────
function exportData() {
  const payload = {
    version:  '1.0',
    exported: new Date().toISOString(),
    months:   getMonths()  || [],
    posts:    getPosts()   || [],
    profile:  getProfile() || {},
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `instagram-dashboard-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Importar dados de JSON ────────────────────
function importData(jsonString) {
  const data = JSON.parse(jsonString);
  if (!data.months || !data.posts) throw new Error('Arquivo inválido ou incompleto.');
  saveMonths(data.months);
  savePosts(data.posts);
  if (data.profile) saveProfile(data.profile);
}

// ─── Limpar tudo ───────────────────────────────
function clearAllData() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}

// ─── Lógica de "Por que funcionou?" (post) ────
function analyzePost(post, monthFollowers) {
  const reasons = [];
  const { type, likes, comments, saves, reach, views } = post;
  const followers = monthFollowers || 1;

  // Salvamentos altos = conteúdo educativo/útil
  if (saves >= 150) {
    reasons.push('💾 <strong>Conteúdo muito salvo</strong> — indica alto valor educativo ou prático. Pessoas guardam para consultar depois.');
  } else if (saves >= 80) {
    reasons.push('💾 <strong>Bom volume de salvamentos</strong> — conteúdo útil que as pessoas querem rever.');
  }

  // Comentários altos = debate ou conexão emocional
  const commentRate = likes > 0 ? (comments / likes) * 100 : 0;
  if (commentRate >= 15) {
    reasons.push('💬 <strong>Alta taxa de comentários</strong> — gerou debate, conexão emocional ou pergunta que estimulou resposta.');
  } else if (comments >= 60) {
    reasons.push('💬 <strong>Muitos comentários</strong> — tema ressoou com a audiência e incentivou interação.');
  }

  // Alcance muito maior que seguidores = viral/compartilhado
  if (reach >= followers * 0.8) {
    reasons.push('🚀 <strong>Alcance viral</strong> — ultrapassou a base de seguidores; provavelmente foi muito compartilhado ou recomendado pelo algoritmo.');
  } else if (reach >= followers * 0.4) {
    reasons.push('📡 <strong>Alcance elevado</strong> — post entregue além da base, boa distribuição orgânica.');
  }

  // Reels com muitas views = gancho forte ou tendência
  if (type === 'Reels' && views >= 15000) {
    reasons.push('🎬 <strong>Reels de alto desempenho</strong> — gancho inicial forte ou formato alinhado com tendência atual.');
  } else if (type === 'Reels' && views >= 8000) {
    reasons.push('🎬 <strong>Reels com boa retenção</strong> — vídeo prendeu atenção além dos primeiros segundos.');
  }

  // Carrossel com salvamentos altos
  if (type === 'Carrossel' && saves >= 200) {
    reasons.push('📚 <strong>Carrossel educativo</strong> — formato ideal para conteúdo de lista/tutorial; público salva para estudar depois.');
  }

  // Curtidas altas no geral
  if (likes >= 500) {
    reasons.push('❤️ <strong>Aprovação em massa</strong> — tema amplo ou linguagem muito acessível gerou identificação imediata.');
  }

  // Fallback se não encontrou padrões
  if (reasons.length === 0) {
    reasons.push('📊 <strong>Performance consistente</strong> — métricas dentro da média do perfil; bom conteúdo de relacionamento com a base.');
  }

  return reasons;
}

// ─── Resumo automático do mês ─────────────────
function generateMonthlySummary(current, previous) {
  if (!current) return 'Nenhum dado disponível para este mês.';

  const parts = [];

  // Seguidores
  if (current.newFollowers > 0) {
    const growthPct = ((current.newFollowers / (current.followers - current.newFollowers)) * 100).toFixed(1);
    if (parseFloat(growthPct) >= 5) {
      parts.push(`🎉 <strong>Conquista do mês:</strong> crescimento de <strong>${growthPct}%</strong> nos seguidores (+${fmtNum(current.newFollowers)} novos). Resultado acima da média!`);
    } else {
      parts.push(`📈 O perfil ganhou <strong>${fmtNum(current.newFollowers)} novos seguidores</strong> neste mês (crescimento de ${growthPct}%).`);
    }
  }

  // Engajamento vs mês anterior
  if (previous) {
    const engDiff = pctDiff(current.engagement, previous.engagement);
    if (engDiff !== null) {
      if (engDiff > 0) {
        parts.push(`🔥 A taxa de engajamento <strong>subiu ${engDiff.toFixed(1)}%</strong> em relação ao mês anterior, chegando a <strong>${fmtPct(current.engagement)}</strong>.`);
      } else if (engDiff < -5) {
        parts.push(`⚠️ A taxa de engajamento <strong>caiu ${Math.abs(engDiff).toFixed(1)}%</strong> em relação ao mês anterior (${fmtPct(current.engagement)}). Vale revisar os formatos e horários utilizados.`);
      } else {
        parts.push(`➡️ Engajamento estável em <strong>${fmtPct(current.engagement)}</strong> — variação de apenas ${engDiff.toFixed(1)}% vs mês anterior.`);
      }
    }
  } else {
    parts.push(`📊 Taxa de engajamento do mês: <strong>${fmtPct(current.engagement)}</strong>.`);
  }

  // Alcance vs mês anterior
  if (previous) {
    const reachDiff = pctDiff(current.reach, previous.reach);
    if (reachDiff > 10) {
      parts.push(`🌍 O alcance médio <strong>cresceu ${reachDiff.toFixed(1)}%</strong>, atingindo <strong>${fmtNum(current.reach)}</strong> pessoas por post.`);
    } else if (reachDiff < -10) {
      parts.push(`📉 O alcance médio recuou <strong>${Math.abs(reachDiff).toFixed(1)}%</strong> (${fmtNum(current.reach)} por post). Considere variar formatos ou reforçar CTAs de compartilhamento.`);
    }
  }

  // Salvamentos
  if (current.saves >= 100) {
    parts.push(`💾 Média de <strong>${fmtNum(current.saves)} salvamentos por post</strong> — excelente sinal de conteúdo educativo e de valor.`);
  }

  // Melhor dia
  if (current.bestDay) {
    parts.push(`📅 Melhor dia de publicação: <strong>${current.bestDay}</strong>. Priorize posts de maior esforço neste dia.`);
  }

  // Reels
  if (current.reelsViews >= 3000) {
    parts.push(`🎬 Reels com média de <strong>${fmtNum(current.reelsViews)} views</strong> — formato performando bem; vale manter a frequência.`);
  }

  return parts.join('<br><br>');
}

// ─── Mês atual como "YYYY-MM" ─────────────────
function getCurrentMonthId() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/* ─────────────────────────────────────────────
   SINCRONIZAÇÃO COM A INSTAGRAM BASIC DISPLAY API
   Compatível com tokens IGAAT (User Access Token)
   ───────────────────────────────────────────── */

/**
 * Limitações conhecidas da Basic Display API (token IGAAT):
 *  - NÃO fornece followers_count nem account-level insights (reach, impressions da conta)
 *  - NÃO fornece like_count nem comments_count diretamente no /me/media
 *  - Fornece por post: impressions, reach, saved (via /{media_id}/insights)
 *  - Campos disponíveis no media: id, caption, media_type, timestamp, permalink
 *
 * Esses limites são registrados em SYNC_LIMITATIONS e exibidos no resultado.
 */
const SYNC_LIMITATIONS = [
  '👥 Contagem de seguidores não disponível via Basic Display API — mantido o valor anterior ou zero.',
  '📊 Alcance e impressões da conta (totais do mês) não disponíveis — use os valores por post como referência.',
  '❤️ Curtidas e comentários por post não retornados pela Basic Display API — registrados como 0.',
  '💡 Para métricas completas, solicite acesso à Instagram Graph API com permissão instagram_manage_insights.',
];

/**
 * Executa sincronização via Instagram Basic Display API (token IGAAT).
 *
 * @param {function} onProgress  (message: string, pct: number) => void
 * @returns {Promise<{monthLabel, followers, postsCount, username, limitations}>}
 * @throws {Error} com mensagem em português se algo crítico falhar
 */
async function syncWithInstagram(onProgress) {
  const API = 'https://graph.instagram.com';

  // ── Obtém token ────────────────────────────
  const token = localStorage.getItem('ig_token') || localStorage.getItem(KEYS.token);
  if (!token || token.trim() === '') {
    throw new Error('Token não encontrado. Cole seu Instagram User Access Token (começa com IGAAT) na aba Configurações e salve antes de sincronizar.');
  }

  // Avisa se o token não parece ser um IGAAT
  if (!token.startsWith('IGAAT') && !token.startsWith('IGQ')) {
    console.warn('[Sync] Token não começa com IGAAT — pode não ser um User Access Token da Basic Display API.');
  }

  // ── Helper de fetch com tratamento de erros ─
  async function apiFetch(url) {
    let res;
    try {
      res = await fetch(url);
    } catch (_) {
      throw new Error('Falha de rede. Verifique sua conexão com a internet e tente novamente.');
    }
    const json = await res.json();
    if (json.error) {
      const code    = json.error.code         ? ` (código ${json.error.code})`         : '';
      const sub     = json.error.error_subcode ? ` [sub ${json.error.error_subcode}]`  : '';
      const fbtrace = json.error.fbtrace_id    ? ` — fbtrace: ${json.error.fbtrace_id}` : '';
      // Traduz os erros mais comuns para português
      const msg = translateApiError(json.error.message, json.error.code);
      throw new Error(`${msg}${code}${sub}${fbtrace}`);
    }
    return json;
  }

  // ── PASSO 1: Perfil do usuário ───────────────
  // Basic Display API: /me retorna id, username, account_type, media_count
  // NÃO retorna followers_count
  onProgress('Buscando dados do perfil…', 15);
  const profileRes = await apiFetch(
    `${API}/me?fields=id,username,account_type,media_count&access_token=${encodeURIComponent(token)}`
  );

  const username    = profileRes.username     || '';
  const mediaCount  = profileRes.media_count  || 0;
  const accountType = profileRes.account_type || '';

  // Recupera seguidores do mês anterior salvo (Basic Display não fornece este dado)
  const existingMonthEarly = getMonthById(getCurrentMonthId()) || {};
  const followersCount     = existingMonthEarly.followers || 0;

  // ── PASSO 2: Posts recentes ──────────────────
  // Basic Display API: /me/media retorna campos básicos
  // like_count e comments_count NÃO são retornados nessa API
  onProgress('Buscando posts recentes…', 35);
  const mediaRes = await apiFetch(
    `${API}/me/media?fields=id,caption,media_type,timestamp,permalink&limit=12&access_token=${encodeURIComponent(token)}`
  );
  const allMedia = mediaRes.data || [];

  if (allMedia.length === 0) {
    throw new Error('Nenhum post encontrado na conta. Verifique se o token tem a permissão user_media e se a conta possui publicações.');
  }

  // Filtra posts do mês atual; se não houver, usa os mais recentes disponíveis
  const nowDate        = new Date();
  const thisYear       = nowDate.getFullYear();
  const thisMonth      = nowDate.getMonth() + 1;
  const thisMonthPosts = allMedia.filter(p => {
    const d = new Date(p.timestamp);
    return d.getFullYear() === thisYear && (d.getMonth() + 1) === thisMonth;
  });
  const postsToProcess  = thisMonthPosts.length > 0 ? thisMonthPosts : allMedia;
  const usingCurrentMonth = thisMonthPosts.length > 0;

  if (!usingCurrentMonth) {
    onProgress(`Nenhum post este mês — usando os ${postsToProcess.length} posts mais recentes…`, 40);
  }

  // ── PASSO 3: Insights por post ───────────────
  // Basic Display API: /{media_id}/insights?metric=impressions,reach,saved
  // Disponível apenas para contas do tipo BUSINESS ou CREATOR
  const monthId    = getCurrentMonthId();
  const savedPosts = [];
  let totalImpressions = 0, totalReach = 0, totalSaves = 0;
  let totalReelsViews  = 0, reelsCount = 0;
  let postReachSum     = 0, postReachCount = 0;
  let insightsFailed   = 0;

  const typeMap = {
    IMAGE:         'Foto',
    VIDEO:         'Reels',
    CAROUSEL_ALBUM: 'Carrossel',
  };

  for (let i = 0; i < postsToProcess.length; i++) {
    const post = postsToProcess[i];
    const pct  = 40 + Math.round(((i + 1) / postsToProcess.length) * 48);
    onProgress(`Buscando insights do post ${i + 1} de ${postsToProcess.length}…`, pct);

    let postImpressions = 0, postReach = 0, postSaves = 0, postPlays = 0;

    try {
      // Basic Display API suporta: impressions, reach, saved
      // Para vídeos também: plays
      const isVideo = post.media_type === 'VIDEO';
      const metrics = isVideo ? 'impressions,reach,saved,plays' : 'impressions,reach,saved';

      const insRes = await apiFetch(
        `${API}/${post.id}/insights?metric=${metrics}&access_token=${encodeURIComponent(token)}`
      );

      (insRes.data || []).forEach(m => {
        // Basic Display API retorna value diretamente no objeto
        const val = m.value ?? (m.values?.[0]?.value ?? 0);
        if (m.name === 'impressions') postImpressions = val;
        if (m.name === 'reach')       postReach       = val;
        if (m.name === 'saved')       postSaves       = val;
        if (m.name === 'plays')       postPlays       = val;
      });
    } catch (insErr) {
      insightsFailed++;
      console.warn(`[Sync] Insights indisponíveis para post ${post.id}:`, insErr.message);
      // Insights falham para contas PERSONAL — não é erro crítico, continua
    }

    totalImpressions += postImpressions;
    totalReach       += postReach;
    totalSaves       += postSaves;

    if (postReach > 0) { postReachSum += postReach; postReachCount++; }

    if (post.media_type === 'VIDEO') {
      totalReelsViews += postPlays;
      reelsCount++;
    }

    const rawCaption = (post.caption || '').replace(/\n/g, ' ').trim();
    savedPosts.push({
      id:       genId(),
      monthId,
      url:      post.permalink || '',
      type:     typeMap[post.media_type] || 'Foto',
      theme:    rawCaption.slice(0, 100) || `Post de ${new Date(post.timestamp).toLocaleDateString('pt-BR')}`,
      likes:    0,         // Basic Display API não retorna curtidas
      comments: 0,         // Basic Display API não retorna comentários
      saves:    postSaves,
      reach:    postReach,
      views:    post.media_type === 'VIDEO' ? postPlays : 0,
    });
  }

  // ── Cálculos de médias ──────────────────────
  const count         = postsToProcess.length || 1;
  const avgSaves      = Math.round(totalSaves  / count);
  const avgReach      = postReachCount > 0
    ? Math.round(postReachSum / postReachCount)
    : Math.round(totalReach  / count);
  const avgReelsViews = reelsCount > 0 ? Math.round(totalReelsViews / reelsCount) : 0;

  // Engajamento calculado apenas com salvamentos (único dado de interação disponível)
  // Se followersCount == 0 (não disponível), engajamento fica como 0
  const engRate = followersCount > 0
    ? parseFloat(((avgSaves) / followersCount * 100).toFixed(2))
    : 0;

  // ── PASSO 4: Salva dados no localStorage ────
  onProgress('Salvando dados no dashboard…', 92);

  const existingMonth   = getMonthById(monthId) || {};
  const allMonthsSorted = getMonths() || [];
  const prevMonth       = allMonthsSorted.filter(m => m.id !== monthId).pop() || null;
  const prevFollowers   = prevMonth
    ? prevMonth.followers
    : (existingMonth.followers || 0);
  // followers não vem da API — mantém o valor existente ou o do mês anterior
  const finalFollowers  = existingMonth.followers || prevFollowers || 0;
  const newFollowers    = Math.max(0, finalFollowers - prevFollowers);

  const monthData = {
    ...existingMonth,
    id:           monthId,
    label:        monthIdToLabel(monthId),
    followers:    finalFollowers,  // mantido do localStorage (Basic Display não fornece)
    newFollowers,
    engagement:   engRate,
    reach:        avgReach,
    impressions:  totalImpressions,
    likes:        0,               // não disponível na Basic Display API
    comments:     0,               // não disponível na Basic Display API
    saves:        avgSaves,
    storiesViews: existingMonth.storiesViews || 0,
    reelsViews:   avgReelsViews,
    postsCount:   count,
    bestDay:      existingMonth.bestDay || '',
    _syncSource:  'basic_display_api',   // marca a origem dos dados
  };

  upsertMonth(monthData);

  // Substitui posts do mês atual pelos dados reais
  const otherPosts = (getPosts() || []).filter(p => p.monthId !== monthId);
  savePosts([...otherPosts, ...savedPosts]);

  // Atualiza nome do perfil se disponível
  if (username) {
    const profile = getProfile() || {};
    saveProfile({ ...profile, name: `@${username}` });
  }

  onProgress('Sincronização concluída!', 100);

  // Monta lista de limitações ativas para exibir no resultado
  const activeLimitations = [...SYNC_LIMITATIONS];
  if (insightsFailed === count) {
    activeLimitations.unshift(
      `⚠️ Insights não retornados para nenhum post — a conta pode ser do tipo PERSONAL. ` +
      `Insights via Basic Display API requerem conta BUSINESS ou CREATOR.`
    );
  } else if (insightsFailed > 0) {
    activeLimitations.unshift(
      `⚠️ Insights indisponíveis para ${insightsFailed} de ${count} posts.`
    );
  }

  return {
    monthLabel:       monthData.label,
    followers:        finalFollowers,
    postsCount:       savedPosts.length,
    username,
    accountType,
    engagement:       engRate,
    reach:            avgReach,
    usingCurrentMonth,
    limitations:      activeLimitations,
  };
}

// ─── Traduz mensagens de erro da API para português ──
function translateApiError(message, code) {
  if (!message) return 'Erro desconhecido na API do Instagram.';
  if (code === 190)  return 'Token inválido ou expirado. Gere um novo Access Token e salve nas Configurações.';
  if (code === 10)   return 'Permissão negada. Verifique se o token possui as permissões user_profile e user_media.';
  if (code === 100)  return 'Parâmetro inválido na requisição. Verifique o token e tente novamente.';
  if (code === 4)    return 'Limite de requisições atingido. Aguarde alguns minutos e tente novamente.';
  if (code === 200)  return 'Permissão insuficiente para esta operação. O token precisa da permissão instagram_manage_insights.';
  if (message.toLowerCase().includes('token')) return 'Problema com o Access Token. Verifique se está correto e não expirou.';
  if (message.toLowerCase().includes('permission')) return `Permissão negada pela API: ${message}`;
  return message;
}

// Inicializa dados ao carregar o script
seedIfEmpty();
