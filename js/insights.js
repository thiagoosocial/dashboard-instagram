/* =============================================
   insights.js — Lógica de insights, sugestões,
   tendências e referências do nicho
   ============================================= */

/* ─────────────────────────────────────────────
   REFERÊNCIAS FIXAS DO NICHO
   ───────────────────────────────────────────── */
const NICHE_REFERENCES = [
  {
    handle: '@ericoprospero',
    url:    'https://www.instagram.com/ericoprospero/',
    desc:   'Um dos maiores especialistas em lançamentos digitais do Brasil. Conteúdo estratégico sobre PLF (Product Launch Formula), posicionamento e escala de infoprodutos de alto ticket.',
    why:    'Referência obrigatória para entender a estrutura completa de um lançamento de alto impacto e como construir autoridade no nicho.',
  },
  {
    handle: '@pedrosiqueira',
    url:    'https://www.instagram.com/pedrosiqueira/',
    desc:   'Especialista em tráfego pago e performance de campanhas no Meta Ads. Compartilha análises reais de campanhas, métricas detalhadas e estratégias de escala para infoprodutores.',
    why:    'Fundamental para dominar tráfego pago e análise de dados — estude sua abordagem de leitura de métricas e tomada de decisão baseada em números.',
  },
  {
    handle: '@cotiinhodantas',
    url:    'https://www.instagram.com/cotiinhodantas/',
    desc:   'Referência em copywriting aplicado a lançamentos no Brasil. Ensina estruturas de copy para páginas de vendas, e-mails de carreira aberto e anúncios que convertem em alto volume.',
    why:    'Estude para elevar a qualidade dos textos de vendas e entender a psicologia da persuasão aplicada a infoprodutos.',
  },
  {
    handle: '@rodrigoghospede',
    url:    'https://www.instagram.com/rodrigoghospede/',
    desc:   'Especialista em estratégias de lançamento e construção de audiências engajadas. Conteúdo sobre perpétuo, lançamento relâmpago, nutrição de lista e retenção de alunos.',
    why:    'Ótimo para entender diferentes modelos de vendas no mercado digital e diversificar as estratégias de lançamento.',
  },
  {
    handle: '@joaovictor.ads',
    url:    'https://www.instagram.com/joaovictor.ads/',
    desc:   'Expert em gestão de tráfego para infoprodutores. Publica análises de campanha, estratégias de segmentação avançada e otimização de ROI no Meta Ads e Google.',
    why:    'Ideal para melhorar a performance e reduzir o custo por lead — acompanhe para benchmarks reais de CPL e ROAS em lançamentos.',
  },
  {
    handle: '@thiagofinch',
    url:    'https://www.instagram.com/thiagofinch/',
    desc:   'Especialista em copywriting e persuasão para redes sociais e e-mails de lançamento. Ensina a criar ganchos, headlines e sequências de e-mail que vendem de forma consistente.',
    why:    'Fundamental para elevar o nível dos copies de captura, vendas e nutrição de audiência — estude seus frameworks de persuasão.',
  },
  {
    handle: '@copynapratica',
    url:    'https://www.instagram.com/copynapratica/',
    desc:   'Perfil focado em copy prática para infoprodutores. Exemplos reais de anúncios, e-mails e páginas de vendas com análise detalhada do que funciona e por quê.',
    why:    'Use como laboratório de ideias para criar copies mais persuasivos e anúncios que convertem nos seus lançamentos.',
  },
  {
    handle: '@brunobarbieri',
    url:    'https://www.instagram.com/brunobarbieri/',
    desc:   'Especialista em funis de vendas e automações para infoprodutos. Conteúdo técnico sobre integrações, sequências automáticas, jornada do cliente e aumento de LTV.',
    why:    'Referência para estruturar funis eficientes e criar sistemas de vendas que funcionam no piloto automático entre lançamentos.',
  },
  {
    handle: '@lucasaug_',
    url:    'https://www.instagram.com/lucasaug_/',
    desc:   'Infoprodutor e mentor de lançamentos. Compartilha bastidores reais de produtos digitais, resultados de alunos e estratégias de posicionamento de nicho com autenticidade.',
    why:    'Inspire-se no modelo de conteúdo que gera prova social e autoridade simultaneamente — alto engajamento em posts de resultado de alunos.',
  },
  {
    handle: '@wendellcarvalho',
    url:    'https://www.instagram.com/wendellcarvalho/',
    desc:   'Especialista em análise de dados e inteligência de mercado para infoprodutores. Conteúdo sobre métricas, dashboards e tomada de decisão baseada em dados reais.',
    why:    'Perfeito para elevar o nível analítico nas estratégias de lançamento e aprender a usar dados para tomar decisões mais assertivas.',
  },
];

/* ─────────────────────────────────────────────
   TENDÊNCIAS DE FORMATO
   ───────────────────────────────────────────── */
const FORMAT_TRENDS = [
  {
    icon:  '🎬',
    name:  'Reels de prova social',
    badge: 'hot',
    badgeLabel: '🔥 Em alta',
    tip:   'Depoimentos de alunos em vídeo curto (15–30s) com resultado específico e número concreto. Alta credibilidade, compartilhamento orgânico e geração de leads qualificados.',
  },
  {
    icon:  '📚',
    name:  'Carrossel de case de resultado',
    badge: 'hot',
    badgeLabel: '🔥 Em alta',
    tip:   'Antes e depois de aluno com métricas reais: contexto → desafio → solução → resultado. Alto salvamento, prova social massiva e atração de público comprador.',
  },
  {
    icon:  '🎭',
    name:  'Stories de bastidores de lançamento',
    badge: 'hot',
    badgeLabel: '🔥 Em alta',
    tip:   'Sequências de 5–8 Stories mostrando a operação do lançamento: sala de guerra, equipe, métricas em tempo real, comemorações. Gera antecipação e conexão emocional com a audiência.',
  },
  {
    icon:  '📊',
    name:  'Carrossel de análise de métricas',
    badge: 'rising',
    badgeLabel: '📈 Crescendo',
    tip:   'Prints reais do Meta Ads e resultados de campanha (com dados relevantes preservados). Posiciona como autoridade analítica e gera alto salvamento por infoprodutores iniciantes.',
  },
  {
    icon:  '🔴',
    name:  'Live de Q&A pré-lançamento',
    badge: 'rising',
    badgeLabel: '📈 Crescendo',
    tip:   'Lives de 30–60 min respondendo dúvidas sobre o produto antes do carrinho abrir. Aquece a lista, elimina objeções e aumenta a conversão no dia da abertura.',
  },
  {
    icon:  '💡',
    name:  'Reels de erro/aprendizado',
    badge: 'rising',
    badgeLabel: '📈 Crescendo',
    tip:   '"3 erros que cometi no meu lançamento" — formato vulnerável que gera identificação, comentários e compartilhamento orgânico por quem já passou pela mesma situação.',
  },
  {
    icon:  '📝',
    name:  'Carrossel educativo de copy',
    badge: 'stable',
    badgeLabel: '📌 Consistente',
    tip:   'Estruturas de e-mail, headline e CTA com exemplos práticos do nicho. Alto salvamento consistente e posicionamento como autoridade em copy para infoprodutores.',
  },
  {
    icon:  '🤝',
    name:  'Collab com co-produtor',
    badge: 'rising',
    badgeLabel: '📈 Crescendo',
    tip:   'Posts em colaboração com co-produtores ou lançadores parceiros do nicho. Dobra o alcance orgânico instantaneamente e valida o posicionamento para audiências cruzadas.',
  },
];

/* ─────────────────────────────────────────────
   BANCO DE SUGESTÕES DE CONTEÚDO
   Específico para infoprodutos e lançamentos
   ───────────────────────────────────────────── */
const CONTENT_SUGGESTIONS_BANK = [
  // Reels
  {
    format:    'Reels',
    objective: 'Alcance',
    title:     '3 erros que matam qualquer lançamento (e como eu aprendi na prática)',
    hook:      '"Eu cometi esses 3 erros e perdi R$ 12k. Não deixa isso acontecer com você."',
    tip:       'Narrativa de aprendizado com número específico de prejuízo cria identificação e alto alcance orgânico.',
  },
  {
    format:    'Reels',
    objective: 'Autoridade',
    title:     'Análise ao vivo de uma campanha de tráfego: o que os números revelam',
    hook:      '"Vou abrir o Meta Ads agora e te mostrar como eu leio esses dados."',
    tip:       'Tela real do gerenciador de anúncios gera autoridade analítica e atrai infoprodutores que lutam com tráfego.',
  },
  {
    format:    'Reels',
    objective: 'Engajamento',
    title:     'Bastidores do dia D do meu lançamento — sem cortes',
    hook:      '"São 23h e o carrinho fecha em 1 hora. Veja o que está acontecendo aqui."',
    tip:       'Vídeo urgente e emocional do dia D gera muitos comentários de curiosidade, torcida e identificação.',
  },
  {
    format:    'Reels',
    objective: 'Alcance',
    title:     'Copy que converte vs. copy que afasta — veja a diferença em 60 segundos',
    hook:      '"Esse erro de copy está destruindo sua conversão. Você provavelmente faz isso."',
    tip:       'Comparativo lado a lado de bom vs. mau copy é altamente compartilhável entre infoprodutores do nicho.',
  },
  {
    format:    'Reels',
    objective: 'Engajamento',
    title:     'Quanto eu gasto de tráfego por aluno captado? Abrindo os números reais',
    hook:      '"Meu CPL foi de R$ 4,80 nesse lançamento. Vou te mostrar exatamente como."',
    tip:       'Números reais e específicos de custo por lead geram muito comentário e compartilhamento no nicho.',
  },
  // Carrosséis
  {
    format:    'Carrossel',
    objective: 'Autoridade',
    title:     'Checklist dos 30 dias antes do lançamento: o que você não pode esquecer',
    hook:      '"Salva esse carrossel — é o roteiro que uso em todos os meus lançamentos."',
    tip:       'Checklists de processo são o formato de maior salvamento para infoprodutores. Use 10–12 itens muito específicos.',
  },
  {
    format:    'Carrossel',
    objective: 'Engajamento',
    title:     'Case de aluno: de gestor de tráfego a infoprodutor em 90 dias',
    hook:      '"Ele faturou R$ 43k no primeiro lançamento. Veja como foi a jornada completa."',
    tip:       'Cases reais com antes/depois e números específicos geram prova social massiva e comentários de parabéns e perguntas.',
  },
  {
    format:    'Carrossel',
    objective: 'Autoridade',
    title:     'As 5 métricas que todo infoprodutor precisa monitorar no Meta Ads',
    hook:      '"Se você não sabe ler essas 5 métricas, está jogando dinheiro fora."',
    tip:       'Conteúdo técnico de métricas de tráfego salva muito e atrai um público mais qualificado e comprometido com resultados.',
  },
  {
    format:    'Carrossel',
    objective: 'Alcance',
    title:     'Estrutura de oferta irresistível: os 7 elementos que uso em todo lançamento',
    hook:      '"Uma oferta fraca não se salva com mais tráfego. Você precisa desses 7 elementos."',
    tip:       'Conteúdo sobre estrutura de oferta tem alto compartilhamento entre iniciantes e lançadores em formação.',
  },
  {
    format:    'Carrossel',
    objective: 'Autoridade',
    title:     'Sequência de e-mails de carrinho aberto que gerou 34% de conversão',
    hook:      '"Vou te mostrar os 7 e-mails que enviei e os resultados de cada um deles."',
    tip:       'Sequência real com taxa de conversão por e-mail gera alto salvamento e posiciona como especialista em email marketing de lançamento.',
  },
  // Stories
  {
    format:    'Stories interativo',
    objective: 'Engajamento',
    title:     'Caixinha: me conta qual é sua maior dificuldade no lançamento',
    hook:      '"Vou responder as 5 melhores perguntas aqui nos próximos Stories."',
    tip:       'Pesquisa de dores via caixinha serve como inteligência de mercado e nutre os Stories por vários dias.',
  },
  {
    format:    'Stories interativo',
    objective: 'Engajamento',
    title:     'Enquete: você já lançou seu produto digital?',
    hook:      '"Vote e veja o resultado — e se não lançou ainda, me conta o que está te travando."',
    tip:       'Enquete de diagnóstico da audiência gera conversas no DM e leads qualificados para o próximo lançamento.',
  },
  {
    format:    'Stories interativo',
    objective: 'Alcance',
    title:     'Quiz: você conhece as métricas essenciais de tráfego para lançamentos?',
    hook:      '"Testa seu conhecimento — 5 perguntas rápidas sobre Meta Ads e performance."',
    tip:       'Quiz de nicho qualifica a audiência e filtra quem está genuinamente interessado em tráfego e análise de dados.',
  },
];

/* ─────────────────────────────────────────────
   GERADOR DE INSIGHTS AUTOMÁTICOS
   ───────────────────────────────────────────── */

/**
 * Gera array de objetos { icon, text } com insights dinâmicos
 * baseados nos dados do mês atual e comparação com o anterior.
 *
 * @param {object} current   — dados do mês selecionado
 * @param {object|null} previous — dados do mês anterior
 * @param {object[]} posts   — posts cadastrados no mês
 * @returns {Array<{icon: string, text: string}>}
 */
function generateInsights(current, previous, posts) {
  if (!current) return [{
    icon: '📭',
    text: 'Nenhum dado encontrado para este mês. Cadastre as métricas na aba <strong>Análise Mensal</strong>.',
  }];

  const insights = [];

  // ── 1. Engajamento ───────────────────────────
  if (previous) {
    const engDiff = pctDiff(current.engagement, previous.engagement);
    if (engDiff > 10) {
      insights.push({
        icon: '🔥',
        text: `Sua taxa de engajamento <strong>cresceu ${engDiff.toFixed(1)}%</strong> em relação ao mês passado (${fmtPct(previous.engagement)} → <strong>${fmtPct(current.engagement)}</strong>). Excelente resultado — identifique quais posts puxaram esse número e replique o padrão.`,
      });
    } else if (engDiff < -10) {
      insights.push({
        icon: '⚠️',
        text: `Seu engajamento <strong>caiu ${Math.abs(engDiff).toFixed(1)}%</strong> esse mês (${fmtPct(previous.engagement)} → ${fmtPct(current.engagement)}). Revise os formatos utilizados — se carrosséis tiveram mais salvamentos que Reels, considere aumentar a frequência desse formato.`,
      });
    } else if (engDiff < 0) {
      insights.push({
        icon: '📉',
        text: `Leve queda de <strong>${Math.abs(engDiff).toFixed(1)}%</strong> no engajamento em relação ao mês anterior. Ainda dentro da margem normal, mas vale monitorar a tendência nos próximos meses.`,
      });
    } else {
      insights.push({
        icon: '✅',
        text: `Engajamento estável em <strong>${fmtPct(current.engagement)}</strong>, com variação de apenas +${engDiff.toFixed(1)}% vs mês anterior. Consistência é um ativo: mantenha a frequência e o padrão de qualidade.`,
      });
    }
  } else {
    const engLevel = current.engagement;
    if (engLevel >= 5) {
      insights.push({ icon: '🏆', text: `Taxa de engajamento de <strong>${fmtPct(engLevel)}</strong> — acima da média do mercado (3–4%). Seu conteúdo está gerando forte conexão com a audiência.` });
    } else if (engLevel >= 3) {
      insights.push({ icon: '📊', text: `Taxa de engajamento de <strong>${fmtPct(engLevel)}</strong> — dentro da média do mercado. Há espaço para crescer priorizando conteúdos educativos e interativos.` });
    } else {
      insights.push({ icon: '🎯', text: `Taxa de engajamento de <strong>${fmtPct(engLevel)}</strong> — abaixo da média. Priorize formatos que geram resposta: carrosséis com CTA, Stories com enquete e Reels com pergunta no final.` });
    }
  }

  // ── 2. Crescimento de seguidores ─────────────
  if (current.newFollowers > 0) {
    const base = current.followers - current.newFollowers;
    const growthPct = base > 0 ? ((current.newFollowers / base) * 100) : 0;
    if (growthPct >= 5) {
      insights.push({
        icon: '🚀',
        text: `Crescimento de <strong>${growthPct.toFixed(1)}%</strong> nos seguidores este mês (+${fmtNum(current.newFollowers)}). Resultado expressivo — verifique quais posts trouxeram novos seguidores e invista mais nesse tipo de conteúdo.`,
      });
    } else if (growthPct >= 2) {
      insights.push({
        icon: '📈',
        text: `Crescimento saudável de <strong>${growthPct.toFixed(1)}%</strong> (+${fmtNum(current.newFollowers)} seguidores). Para acelerar, explore collabs com perfis do nicho e Reels otimizados para descoberta.`,
      });
    } else {
      insights.push({
        icon: '🌱',
        text: `Crescimento de <strong>${fmtNum(current.newFollowers)} seguidores</strong> (${growthPct.toFixed(1)}%). Para aumentar a taxa de novos seguidores, aposte em Reels de alcance amplo com CTA explícito para seguir.`,
      });
    }
  }

  // ── 3. Alcance ───────────────────────────────
  if (previous) {
    const reachDiff = pctDiff(current.reach, previous.reach);
    if (reachDiff > 20) {
      insights.push({
        icon: '🌍',
        text: `O alcance médio por post <strong>subiu ${reachDiff.toFixed(1)}%</strong> (${fmtNum(previous.reach)} → <strong>${fmtNum(current.reach)}</strong>). Algum conteúdo ultrapassou sua base — identifique o gatilho e repita a estrutura.`,
      });
    } else if (reachDiff < -15) {
      insights.push({
        icon: '📡',
        text: `Queda de <strong>${Math.abs(reachDiff).toFixed(1)}%</strong> no alcance médio. Possíveis causas: queda na frequência de posts, mudança no algoritmo ou menor interação inicial. Refforce CTAs de compartilhamento e salve.`,
      });
    }
  }

  // ── 4. Salvamentos ───────────────────────────
  if (current.saves >= 100) {
    insights.push({
      icon: '💾',
      text: `Média de <strong>${fmtNum(current.saves)} salvamentos por post</strong> — excelente indicador de conteúdo de valor. Salvamentos sinalizam ao algoritmo que seu conteúdo é relevante e aumentam o alcance futuro.`,
    });
  } else if (current.saves < 40 && current.likes > 200) {
    insights.push({
      icon: '💡',
      text: `Seus posts têm bom volume de curtidas mas <strong>poucos salvamentos (${fmtNum(current.saves)})</strong>. Inclua mais conteúdo do tipo "guarde para usar depois": listas práticas, tutoriais passo a passo e templates.`,
    });
  }

  // ── 5. Análise de formatos (posts cadastrados) ─
  if (posts && posts.length > 0) {
    const byType = {};
    posts.forEach(p => {
      if (!byType[p.type]) byType[p.type] = { saves: 0, comments: 0, likes: 0, views: 0, count: 0 };
      byType[p.type].saves    += (p.saves    || 0);
      byType[p.type].comments += (p.comments || 0);
      byType[p.type].likes    += (p.likes    || 0);
      byType[p.type].views    += (p.views    || 0);
      byType[p.type].count++;
    });

    // Médias por tipo
    const avgs = {};
    Object.keys(byType).forEach(t => {
      const d = byType[t];
      avgs[t] = {
        saves:    d.saves    / d.count,
        comments: d.comments / d.count,
        likes:    d.likes    / d.count,
        views:    d.views    / d.count,
        count:    d.count,
      };
    });

    // Carrossel vs Reels em salvamentos
    if (avgs['Carrossel'] && avgs['Reels']) {
      const saveDiff = pctDiff(avgs['Carrossel'].saves, avgs['Reels'].saves);
      if (saveDiff > 50) {
        insights.push({
          icon: '📚',
          text: `Posts de <strong>Carrossel</strong> geraram <strong>${saveDiff.toFixed(0)}% mais salvamentos</strong> que Reels neste mês (média: ${avgs['Carrossel'].saves.toFixed(0)} vs ${avgs['Reels'].saves.toFixed(0)}). Considere aumentar a frequência de carrosséis educativos.`,
        });
      } else if (saveDiff < -50) {
        insights.push({
          icon: '🎬',
          text: `<strong>Reels</strong> superaram carrosséis em salvamentos este mês. Seus vídeos estão gerando valor educativo além do entretenimento — um ótimo sinal de posicionamento.`,
        });
      }
    }

    // Reels com views expressivas
    if (avgs['Reels'] && avgs['Reels'].views > 10000) {
      insights.push({
        icon: '🎯',
        text: `Seus Reels alcançaram média de <strong>${fmtNum(avgs['Reels'].views)} views</strong>. Ganchos fortes e formato vertical otimizado estão funcionando. Continue testando variações de gancho para encontrar o que converte mais.`,
      });
    }

    // Post com mais comentários do mês
    const topComment = [...posts].sort((a, b) => (b.comments || 0) - (a.comments || 0))[0];
    if (topComment && topComment.comments >= 40) {
      insights.push({
        icon: '💬',
        text: `O post <strong>"${topComment.theme}"</strong> foi o que gerou mais comentários (${topComment.comments}). Temas que geram debate ou identificação emocional são ótimos para relacionamento com a base — explore variações desse assunto.`,
      });
    }
  }

  // ── 6. Melhor dia de publicação ──────────────
  if (current.bestDay) {
    insights.push({
      icon: '📅',
      text: `Seu melhor dia de publicação foi <strong>${current.bestDay}</strong>, com maior alcance e engajamento. Concentre seus posts de maior esforço e investimento neste dia da semana.`,
    });
  }

  // ── 7. Views de Stories ──────────────────────
  if (previous) {
    const storiesDiff = pctDiff(current.storiesViews, previous.storiesViews);
    if (storiesDiff < -20) {
      insights.push({
        icon: '👁️',
        text: `As views de Stories <strong>caíram ${Math.abs(storiesDiff).toFixed(1)}%</strong>. Stories são essenciais para manter relacionamento diário. Tente sequências de 3–5 Stories interativos por dia para reativar o público.`,
      });
    } else if (storiesDiff > 20) {
      insights.push({
        icon: '👁️',
        text: `Views de Stories <strong>cresceram ${storiesDiff.toFixed(1)}%</strong> — sua base está mais engajada no dia a dia. Aproveite para inserir CTAs de produtos/serviços e enquetes de descoberta de dores.`,
      });
    }
  }

  // ── 8. Volume de posts ───────────────────────
  if (current.postsCount > 0) {
    if (current.postsCount < 8) {
      insights.push({
        icon: '📆',
        text: `Foram publicados apenas <strong>${current.postsCount} posts</strong> este mês. Frequência abaixo de 8 posts/mês costuma reduzir o alcance orgânico. Tente chegar a pelo menos 3 publicações por semana no feed.`,
      });
    } else if (current.postsCount >= 16) {
      insights.push({
        icon: '⚡',
        text: `Alta frequência: <strong>${current.postsCount} posts</strong> publicados no mês. Certifique-se de que a qualidade não está sendo sacrificada pela quantidade — monitore se o engajamento por post se mantém.`,
      });
    }
  }

  return insights;
}

/* ─────────────────────────────────────────────
   GERADOR DE SUGESTÕES DE CONTEÚDO
   Seleciona 6 sugestões variando formatos
   ───────────────────────────────────────────── */

/**
 * Retorna 6 sugestões de conteúdo para o próximo mês,
 * priorizando os formatos com melhor performance no mês atual.
 *
 * @param {object} current  — dados do mês atual
 * @param {object[]} posts  — posts do mês atual
 * @returns {Array}
 */
function generateSuggestions(current, posts) {
  // Determina formatos em destaque baseado nos posts
  let priorityFormats = [];

  if (posts && posts.length > 0) {
    const byType = {};
    posts.forEach(p => {
      if (!byType[p.type]) byType[p.type] = { score: 0, count: 0 };
      byType[p.type].score += engagementScore(p);
      byType[p.type].count++;
    });

    // Ordena por score médio
    priorityFormats = Object.entries(byType)
      .map(([type, d]) => ({ type, avg: d.score / d.count }))
      .sort((a, b) => b.avg - a.avg)
      .map(d => d.type);
  }

  // Garante variedade de formatos nas sugestões
  const targets = ['Reels', 'Carrossel', 'Stories interativo'];
  // Insere formatos prioritários no início
  priorityFormats.forEach(f => {
    if (!targets.includes(f)) targets.unshift(f);
  });

  // Embaralha o banco com seed baseado no mês
  const shuffled = [...CONTENT_SUGGESTIONS_BANK].sort(() => {
    const seed = current ? current.id.replace('-', '') : '202501';
    return (parseInt(seed, 10) % 3) - 1;
  });

  // Seleciona 6 sugestões com distribuição de formatos
  const selected = [];
  const usedFormats = { Reels: 0, Carrossel: 0, 'Stories interativo': 0 };

  // Primeiro pass: formatos prioritários
  for (const sug of shuffled) {
    if (selected.length >= 6) break;
    const fmt = sug.format;
    const limit = fmt === 'Reels' ? 2 : fmt === 'Carrossel' ? 2 : 2;
    if ((usedFormats[fmt] || 0) < limit) {
      selected.push(sug);
      usedFormats[fmt] = (usedFormats[fmt] || 0) + 1;
    }
  }

  // Segundo pass: completa se necessário
  for (const sug of shuffled) {
    if (selected.length >= 6) break;
    if (!selected.includes(sug)) selected.push(sug);
  }

  return selected.slice(0, 6);
}

/* ─────────────────────────────────────────────
   RENDERIZAÇÃO — Insights list
   ───────────────────────────────────────────── */
function renderInsightsList(monthId) {
  const container = document.getElementById('insightsList');
  if (!container) return;

  const months  = getMonths() || [];
  const idx     = months.findIndex(m => m.id === monthId);
  const current  = idx >= 0 ? months[idx]     : null;
  const previous = idx > 0  ? months[idx - 1] : null;
  const posts    = getPostsByMonth(monthId);

  const items = generateInsights(current, previous, posts);

  container.innerHTML = items.map(item => `
    <div class="insight-item">
      <span class="insight-item-icon">${item.icon}</span>
      <span class="insight-item-text">${item.text}</span>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   RENDERIZAÇÃO — Suggestions grid
   ───────────────────────────────────────────── */
function renderSuggestionsList(monthId) {
  const container = document.getElementById('suggestionsList');
  if (!container) return;

  const current = getMonthById(monthId);
  const posts   = getPostsByMonth(monthId);
  const items   = generateSuggestions(current, posts);

  const objectiveColors = {
    'Alcance':     'style="color:var(--ig-orange)"',
    'Engajamento': 'style="color:var(--ig-pink)"',
    'Autoridade':  'style="color:var(--ig-purple)"',
  };

  container.innerHTML = items.map((sug, i) => `
    <div class="suggestion-card">
      <span class="suggestion-format">${sug.format}</span>
      <div class="suggestion-title">${sug.title}</div>
      <div class="suggestion-meta">
        <span><strong>Objetivo:</strong> <span ${objectiveColors[sug.objective] || ''}>${sug.objective}</span></span>
        <span><strong>Dica:</strong> ${sug.tip}</span>
      </div>
      <div class="suggestion-hook">💬 Gancho: ${sug.hook}</div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   RENDERIZAÇÃO — Trends grid
   ───────────────────────────────────────────── */
function renderTrendsList() {
  const container = document.getElementById('trendsList');
  if (!container) return;

  container.innerHTML = FORMAT_TRENDS.map(t => `
    <div class="trend-card">
      <span class="trend-icon">${t.icon}</span>
      <div class="trend-body">
        <span class="trend-name">${t.name}</span>
        <span class="trend-badge ${t.badge}">${t.badgeLabel}</span>
        <span class="trend-tip">${t.tip}</span>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   RENDERIZAÇÃO — References grid
   ───────────────────────────────────────────── */
function renderReferencesList() {
  const container = document.getElementById('referencesList');
  if (!container) return;

  container.innerHTML = NICHE_REFERENCES.map(ref => `
    <div class="reference-card">
      <div class="reference-handle">
        <span>📸</span>
        <a href="${ref.url}" target="_blank" rel="noopener noreferrer">${ref.handle}</a>
      </div>
      <p class="reference-desc">${ref.desc}</p>
      <p class="reference-why">💡 Por que acompanhar: ${ref.why}</p>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   RENDER PRINCIPAL DA ABA 4
   ───────────────────────────────────────────── */
function renderInsightsTab(monthId) {
  renderInsightsList(monthId);
  renderSuggestionsList(monthId);
  renderTrendsList();
  renderReferencesList();
}
