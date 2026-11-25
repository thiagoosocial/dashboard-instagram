// Gera as apresentações "Intenção de Post - Janeiro" (Belvedere e Telésforo)
// Uso: NODE_PATH=<pasta com pptxgenjs>/node_modules node build.js
const pptxgen = require("pptxgenjs");
const path = require("path");
const A = (f) => path.join(__dirname, "assets", f);

const YELLOW = "FFFF00";
const GRAY = "999999";
const BODY = "Montserrat";

const INCC = "** Parcelas reajustadas semestralmente pelo INCC acumulado no período.";

// ---------------------------------------------------------------- helpers
const FMT = {
  carrossel: ["CARROSSEL", "FEED E", "STORIES"],
  estatico: ["ESTÁTICO", "FEED E", "STORIES"],
  reels: ["REELS", "FEED E", "STORIES"],
};

// estima altura (pt) de um texto em coluna de largura w (pol) a tamanho s
function estimate(paras, w, s, gap) {
  const cpl = (w * 72) / (0.6 * s);
  let lines = 0;
  paras.forEach((p) =>
    p.split("\n").forEach((l) => (lines += Math.max(1, Math.ceil(l.length / cpl))))
  );
  return lines * s * 1.22 + paras.length * gap;
}
function pickSize(cols, w, maxH, sizes, gap) {
  for (const s of sizes) {
    if (cols.every((c) => estimate(c, w, s, gap) <= maxH)) return s;
  }
  return sizes[sizes.length - 1];
}

// converte [{label, text}] em runs de texto (parágrafos separados por gap)
function runsFromParas(paras, size, gap) {
  const out = [];
  paras.forEach((p, pi) => {
    const lines = p.lines; // array de linhas; cada linha = array de runs {t,b}
    lines.forEach((line, li) => {
      line.forEach((r, ri) => {
        const last = ri === line.length - 1;
        const lastLine = li === lines.length - 1;
        out.push({
          text: r.t,
          options: {
            bold: !!r.b,
            ...(r.link ? { hyperlink: { url: r.link }, color: "0097A7", underline: { style: "sng", color: "0097A7" } } : {}),
            fontFace: BODY,
            fontSize: size,
            ...(r.link ? {} : { color: "000000" }),
            breakLine: last && !(pi === paras.length - 1 && lastLine),
            paraSpaceAfter: lastLine ? gap : 0,
          },
        });
      });
    });
  });
  return out;
}

const run = (t, b) => ({ t, b });

// ---------------------------------------------------------------- slides
function addCover(pres, subtitle, title2) {
  const s = pres.addSlide();
  s.background = { path: A("capa.jpg") };
  s.addText(
    [
      { text: "REDES SOCIAIS ", options: { bold: true, breakLine: false } },
      { text: subtitle, options: { bold: false, breakLine: true } },
      { text: title2, options: { bold: true } },
    ],
    {
      x: 0.2, y: 4.72, w: 9.2, h: 0.75, margin: 0, fontFace: BODY, fontSize: 15,
      color: YELLOW, valign: "top", isTextBox: true, paraSpaceAfter: 4,
    }
  );
}
function addDivider(pres, n) {
  const s = pres.addSlide();
  s.background = { path: A("semana.jpg") };
  s.addText("JANEIRO", {
    x: 0.53, y: 1.5, w: 6, h: 0.5, margin: 0, fontFace: BODY, fontSize: 22,
    bold: true, color: YELLOW, valign: "middle", isTextBox: true,
  });
  s.addText("SEMANA " + n, {
    x: 0.53, y: 2.0, w: 6, h: 0.85, margin: 0, fontFace: BODY, fontSize: 48,
    bold: true, color: YELLOW, valign: "middle", isTextBox: true,
  });
}
function addEnd(pres) {
  const s = pres.addSlide();
  s.background = { path: A("fim.jpg") };
}

function border() {
  return { type: "solid", pt: 0.75, color: GRAY };
}

function addIntention(pres, p, hdrFont) {
  const s = pres.addSlide();
  s.background = { path: A("tabela.jpg") };
  const hdr = (t) => ({
    text: t,
    options: { bold: true, align: "center", valign: "middle", fontFace: hdrFont, fontSize: 11, color: "000000" },
  });
  const centered = (lines) => ({
    text: lines.map((t, i) => ({ text: t, options: { breakLine: i < lines.length - 1 } })),
    options: { align: "center", valign: "top", fontFace: BODY, fontSize: 11, color: "000000" },
  });
  // texto da intenção
  const paras = [];
  paras.push({ lines: [[run("Tema:", true), run(" " + p.tema)]] });
  paras.push({ lines: [[run("Objetivo:", true), run(" " + p.objetivo)]] });
  paras.push({ lines: [[run("Persona:", true), run(" " + p.persona)]] });
  paras.push({ lines: [[run("Editoria:", true), run(" " + p.editoria)]] });
  if (p.ref) paras.push({ lines: [[run("Ref:", true)], [{ t: p.ref, link: p.ref }]] });
  if (p.obs) paras.push({ lines: [[run("Obs do vídeo:", true), run(" " + p.obs)]] });
  const plain = paras.map((q) => q.lines.map((l) => l.map((r) => r.t).join("")).join("\n"));
  const size = pickSize([plain], 4.55, 300, [11, 10.5, 10, 9.5, 9, 8.5, 8], 7);
  const cell = {
    text: runsFromParas(paras, size, 7),
    options: { valign: "top", align: "left", margin: [0.08, 0.1, 0.05, 0.1] },
  };
  s.addTable(
    [
      [hdr("CANAIS"), hdr("FORMATOS"), hdr("DATAS"), hdr("INTENÇÃO")],
      [centered(["FACEBOOK", "INSTAGRAM"]), centered(p.formato), centered([p.data]), cell],
    ],
    {
      x: 0.5, y: 0.27, w: 9.0, colW: [1.32, 1.6, 1.32, 4.76], rowH: [0.4, 4.2],
      border: border(), margin: [0.05, 0.05, 0.05, 0.05],
    }
  );
}

function addContentLegend(pres, p, hdrFont) {
  const s = pres.addSlide();
  s.background = { path: A("tabela.jpg") };
  const hdr = (t) => ({
    text: t,
    options: { bold: true, align: "center", valign: "middle", fontFace: hdrFont, fontSize: 12, color: "000000" },
  });
  // conteúdo
  const cparas = [];
  if (p.texto) {
    cparas.push({ lines: [[run("Texto na arte:", true)], ...p.texto.map((t) => [run(t)])] });
  } else {
    p.slides.forEach((sl) => {
      cparas.push({ lines: [...(sl.h ? [[run(sl.h, true)]] : []), ...sl.l.map((t) => [run(t)])] });
    });
  }
  const lparas = p.legenda.map((t) => ({ lines: t.split("\n").map((l) => [run(l)]) }));
  const flat = (arr) => arr.map((q) => q.lines.map((l) => l.map((r) => r.t).join("")).join("\n"));
  const size = pickSize([flat(cparas), flat(lparas)], 4.3, 318, [10.5, 10, 9.5, 9, 8.5, 8, 7.5], 8);
  const mk = (paras) => ({
    text: runsFromParas(paras, size, 8),
    options: { valign: "top", align: "left", margin: [0.08, 0.08, 0.05, 0.08] },
  });
  s.addTable([[hdr("CONTEÚDO"), hdr("LEGENDA")], [mk(cparas), mk(lparas)]], {
    x: 0.4, y: 0.24, w: 9.0, colW: [4.5, 4.5], rowH: [0.4, 4.63],
    border: border(), margin: [0.05, 0.05, 0.05, 0.05],
  });
}

// tabela do roteiro de vídeo (Reels) - células podem ter rowspan: {t, rs}; null = coberta
function addReel(pres, p) {
  const s = pres.addSlide();
  s.background = { path: A("tabela.jpg") };
  const size = p.reelSize || 8.5;
  const hdrOpts = { bold: true, align: "center", valign: "middle", fontFace: BODY, fontSize: 9, color: "000000" };
  const mkText = (t) => {
    const out = [];
    const paras = t.split("\n\n");
    paras.forEach((para, pi) => {
      const ls = para.split("\n");
      ls.forEach((l, li) => {
        const lastLine = li === ls.length - 1;
        out.push({ text: l, options: { fontFace: BODY, fontSize: size, color: "000000", breakLine: !(pi === paras.length - 1 && lastLine), paraSpaceAfter: lastLine ? 6 : 0 } });
      });
    });
    return out;
  };
  const rows = [["TEMPO", "CENA", "LETTERING", "NARRAÇÃO", "LEGENDA"].map((t) => ({ text: t, options: hdrOpts }))];
  p.rows.forEach((r) => {
    const row = [];
    r.forEach((c, i) => {
      if (c === null) return;
      const t = typeof c === "string" ? c : c.t;
      const o = { fontFace: BODY, fontSize: size, color: "000000", valign: "top", align: "left", margin: [0.07, 0.07, 0.05, 0.07] };
      if (typeof c === "object" && c.rs) o.rowspan = c.rs;
      row.push({ text: i === 0 ? t.replace(" - ", " -\n") : mkText(t), options: o });
    });
    rows.push(row);
  });
  s.addTable(rows, {
    x: 0.17, y: 0.17, w: 9.56, colW: [0.8, 1.98, 1.94, 2.31, 2.53], margin: [0.05, 0.07, 0.05, 0.07],
    rowH: [0.38].concat(p.rows.map(() => 0.6)), border: border(),
  });
}

function addPost(pres, p, style) {
  const hdrFont = style === "belvedere" ? "Arial" : "Roboto";
  addIntention(pres, p, hdrFont);
  if (p.rows) addReel(pres, p);
  else addContentLegend(pres, p, "Arial");
}

// ---------------------------------------------------------------- dados FBR
const F = [];
F.push({ semana: 1 });
F.push({
  data: "05/01", formato: FMT.estatico,
  tema: "La Place: 2027 pode começar com a chave na mão.",
  objetivo: "Aproveitar o clima de começo de ano e de novas metas para lembrar que o La Place está pronto para morar, reforçando a última unidade disponível.",
  persona: "Famílias de alta renda que planejam a mudança para 2027 e preferem um imóvel pronto, sem esperar obra, no Santa Lúcia.",
  editoria: "Produto / Sazonal.",
  slides: [
    { l: ["2027 pode começar com a chave na mão."] },
    { l: ["Última unidade do La Place, pronta para morar", "Rua Laplace, 721, Santa Lúcia"] },
    { l: ["Conheça o La Place"] },
  ],
  legenda: [
    "Tem meta de ano novo que leva tempo. E tem meta que pode virar realidade já no primeiro mês.",
    "O La Place está pronto, com janelas amplas, jardineiras e um projeto cercado de verde no Santa Lúcia. Resta apenas uma unidade.",
    "Link na bio.",
  ],
});
F.push({
  data: "07/01", formato: FMT.reels,
  tema: "De repente é janeiro de novo.",
  objetivo: "Usar a virada do ano como gatilho de decisão. O plano de investir em imóvel que ficou para depois mais um ano aparece em um vídeo rápido e sofisticado, que passa pelos empreendimentos da FBR.",
  persona: "Investidores e compradores que adiaram a decisão de comprar e começam o ano revendo metas e finanças.",
  editoria: "Investimento Imobiliário / Portfólio / Sazonal.",
  ref: "https://www.instagram.com/reel/Df-s4wcPGb9/?fqnt=MXhmNTVhNjE4cnh6",
  rows: [
    ["00:00 - 00:03", "Take de drone se aproximando da fachada do Walk Lourdes.", "DE REPENTE É JANEIRO DE NOVO\n(fixo durante todo o vídeo, como na referência)",
      { t: "Sem locução. Trilha com batida marcada, com os cortes no ritmo da música.", rs: 4 },
      { t: "De repente é janeiro de novo. E aquele plano de investir em imóvel voltou para a lista de metas.\n\nStudios para renda, apartamentos para a família, imóvel pronto ou na planta: a FBR tem um empreendimento para cada objetivo.\n\nQue 2027 seja o ano de tirar esse plano do papel.\n\nLink na bio.", rs: 4 }],
    ["00:03 - 00:06", "Cortes rápidos do rooftop do Walk Funcionários e da fachada do Nero.", "E O PLANO DE INVESTIR EM IMÓVEL\nCONTINUA NA LISTA DE METAS.", null, null],
    ["00:06 - 00:10", "Câmera em movimento rápido entrando na sala do La Place pronto.", "", null, null],
    ["00:10 - 00:14", "Render da varanda do Terrace com o horizonte de BH, fechando com o logo da FBR.", "Que 2027 seja o ano de sair do papel.", null, null],
  ],
});
F.push({ semana: 2 });
F.push({
  data: "12/01", formato: FMT.carrossel,
  tema: "Walk Lourdes: as dúvidas de quem está pensando em comprar.",
  objetivo: "Responder às objeções mais comuns de quem considera o 2 quartos do Walk Lourdes, no formato da referência. Em cada slide, a dúvida aparece riscada em cima e a resposta vem embaixo.",
  persona: "Pais de estudantes e investidores que já consideram o Walk Lourdes, mas ainda têm dúvidas sobre retorno, gestão e compra na planta.",
  editoria: "Produto / Quebra de Objeções.",
  ref: "https://www.instagram.com/p/DgGk1HanWBk/?img_index=4&cnvx=MTZzemhzM3NsNXh2MA==",
  slides: [
    { h: "SLIDE 1:", l: ["(em cima, riscado) \"Será que um compacto no Lourdes vale a pena?\"", "(embaixo) Com faculdade a 120 metros e o melhor da cidade a pé, a procura vem junto."] },
    { h: "SLIDE 2:", l: ["(em cima, riscado) \"Mas eu não tenho tempo para cuidar de inquilino.\"", "(embaixo) A gestão Charlie cuida da locação de ponta a ponta para você."] },
    { h: "SLIDE 3:", l: ["(em cima, riscado) \"2 quartos não fica apertado para dividir?\"", "(embaixo) Até 2 suítes, varanda e vaga. Cada um com o seu espaço."] },
    { h: "SLIDE 4:", l: ["(em cima, riscado) \"Comprar na planta não é arriscado?\"", "(embaixo) No Walk Lourdes, o empreendimento está sob o regime de patrimônio de afetação, com memorial de incorporação registrado em cartório."] },
  ],
  legenda: [
    "Toda compra importante vem com algumas dúvidas. Separamos as que mais ouvimos sobre o Walk Lourdes e respondemos uma por uma.",
    "Ficou alguma outra? Deixa aqui nos comentários.",
    "Studios e apartamentos de 2 quartos na Rua Rio de Janeiro.\n87% vendido.",
    "Link na bio.",
  ],
});
F.push({
  data: "14/01", formato: FMT.carrossel,
  tema: "Tendências do mercado imobiliário para 2027.",
  objetivo: "Conteúdo de pauta fria com potencial de salvamento e compartilhamento entre investidores e corretores. Apresenta movimentos do mercado e mostra como os empreendimentos FBR se encaixam em cada um. É diferente do carrossel de dezembro, que falava de arquitetura.",
  persona: "Investidores, corretores e interessados em mercado imobiliário em BH.",
  editoria: "Mercado Imobiliário / Investimento / Portfólio.",
  ref: "https://www.instagram.com/p/Df2Qycrmz63/?img_index=3&gwpx=MWx5YzI4cGI5bzAyYQ==",
  slides: [
    { h: "SLIDE 1:", l: ["TENDÊNCIAS DO MERCADO IMOBILIÁRIO PARA 2027"] },
    { h: "SLIDE 2:", l: ["MENOS METROS. MAIS VALOR.", "Compactos bem localizados ganharam espaço porque mais gente quer praticidade, localização e facilidade para alugar. É o caso dos studios do Walk Lourdes, do Walk Funcionários e do Nero."] },
    { h: "SLIDE 3:", l: ["O ENDEREÇO PESA TANTO QUANTO O IMÓVEL.", "Quem investe olha para o entorno: mobilidade, serviços, comércio e demanda. Lourdes, Funcionários, Savassi e Santa Lúcia são bairros que as pessoas querem viver."] },
    { h: "SLIDE 4:", l: ["O IMÓVEL TAMBÉM VIROU RENDA.", "Morar, alugar ou receber por temporada. Antes de perguntar quanto vale o imóvel, vale perguntar o que ele pode gerar. Nos empreendimentos Walk, a gestão Charlie cuida da operação."] },
    { h: "SLIDE 5:", l: ["SABER QUEM ESTÁ POR TRÁS DA OBRA.", "Investir com segurança passa por conhecer a incorporadora. Nos empreendimentos FBR, cada projeto tem memorial de incorporação registrado e regime de patrimônio de afetação."] },
    { h: "SLIDE 6:", l: ["Em 2027, o melhor investimento começa com uma boa escolha.", "Conheça os empreendimentos FBR"] },
  ],
  legenda: [
    "Compactos bem localizados, bairros com demanda, imóvel como fonte de renda e mais atenção a quem está por trás da obra. Esses são alguns dos movimentos que devem pesar nas decisões de quem vai investir em 2027.",
    "Salve para consultar depois e mande para quem está pensando no próximo imóvel.",
    "Link na bio.",
  ],
});
F.push({ semana: 3 });
F.push({
  data: "19/01", formato: FMT.carrossel,
  tema: "Walk Funcionários: a beleza está nos detalhes.",
  objetivo: "Usar o recurso visual da referência, em que a imagem do empreendimento aparece como um quebra-cabeça com uma peça de fora. A peça destacada mostra um detalhe do projeto, valorizando o design de cada espaço de forma criativa e com alto potencial de retenção.",
  persona: "Jovens profissionais e investidores que valorizam design e um projeto bem resolvido em uma região central de BH.",
  editoria: "Arquitetura / Produto.",
  ref: "https://www.instagram.com/p/DfmveSlEahv/?img_index=4&hvrq=MWc5a2pubDlvNGlhbQ==",
  slides: [
    { h: "SLIDE 1:", l: ["A beleza do Walk Funcionários está nos detalhes.", "(Fachada com arquitetura verde montada em quebra-cabeça; a peça solta mostra o detalhe do verde na fachada.)"] },
    { h: "SLIDE 2:", l: ["A varanda com jardineira.", "(Studio decorado em quebra-cabeça; a peça solta mostra a varanda.)"] },
    { h: "SLIDE 3:", l: ["A praça do fogo no rooftop.", "(Rooftop em quebra-cabeça; a peça solta mostra a praça do fogo.)"] },
    { h: "SLIDE 4:", l: ["O coworking no térreo.", "(Área de convivência em quebra-cabeça; a peça solta mostra uma mesa de trabalho.)"] },
    { h: "SLIDE 5:", l: ["Cada peça foi pensada para encaixar na sua rotina.", "Walk Funcionários", "Studios de 26 a 49 m²"] },
  ],
  legenda: [
    "Um bom projeto é feito de muitas peças. No Walk Funcionários, cada uma foi pensada para encaixar na sua rotina: a fachada com arquitetura verde, a varanda em todas as unidades, o rooftop para curtir BH de cima e o coworking para os dias de trabalho.",
    "Rua dos Aimorés, 1030, Funcionários.",
    "Link na bio.",
  ],
});
F.push({
  data: "21/01", formato: FMT.reels,
  tema: "POV: o seu primeiro verão no Terrace.",
  objetivo: "Aproveitar o auge do verão para mostrar, em primeira pessoa, como vai ser aproveitar o lazer do Terrace. É um vídeo leve e aspiracional, feito com animação 3D das perspectivas, para gerar desejo e identificação.",
  persona: "Famílias de alta renda com filhos que buscam 3 ou 4 quartos no Santa Lúcia e valorizam lazer completo para aproveitar sem sair de casa.",
  editoria: "Estilo de Vida / Lazer.",
  rows: [
    ["00:00 - 00:03", "POV abrindo a porta da varanda descoberta, com sol da manhã e o horizonte de BH.",
      { t: "POV: o seu primeiro verão no Terrace ☀️ (fixo no topo)", rs: 5 },
      { t: "Sem locução. Trilha leve e solar, com clima de férias.", rs: 5 },
      { t: "O primeiro verão em casa nova tem outro gosto. No Terrace, ele vai ter piscina com deck, espaço gourmet, sauna, quadra e espaço kids, tudo sem sair do prédio.\n\n3 e 4 quartos • 115 a 297 m²\nRua Arrudas, 50, Santa Lúcia\nEntrega em abril de 2028\n\nLink na bio.", rs: 6 }],
    ["00:03 - 00:07", "Câmera descendo até a piscina com deck, com pessoas na água. Humanizar IA.", null, null, null],
    ["00:07 - 00:10", "Crianças brincando no espaço kids e no playground.", null, null, null],
    ["00:10 - 00:13", "Amigos reunidos no espaço gourmet, integrado à piscina.", null, null, null],
    ["00:13 - 00:16", "Fim de tarde na varanda, com o céu alaranjado.", null, null, null],
    ["00:16 - 00:18", "Cartela final com os logos.", "Terrace\nEntrega em abril de 2028", "", null],
  ],
});
F.push({ semana: 4 });
F.push({
  data: "26/01", formato: FMT.carrossel,
  tema: "O que torna uma casa inesquecível?",
  objetivo: "Conteúdo editorial e sofisticado, no estilo da referência, com frases curtas sobre arquitetura e moradia sobre as fotos do La Place pronto. Valoriza o projeto atemporal e a última unidade disponível.",
  persona: "Famílias e casais de alta renda que valorizam arquitetura, exclusividade e um imóvel com identidade no Santa Lúcia.",
  editoria: "Arquitetura / Experiência de Morar.",
  ref: "https://www.instagram.com/p/DgGMkAmAUQM/?bqrl=MXNweHA5b3hiZGRsMw==",
  slides: [
    { h: "SLIDE 1:", l: ["O que torna uma casa INESQUECÍVEL?"] },
    { h: "SLIDE 2:", l: ["UMA CASA NÃO PRECISA SE PARECER COM NENHUMA OUTRA.", "No La Place, são apenas 5 unidades, cada uma com a sua própria planta."] },
    { h: "SLIDE 3:", l: ["A MELHOR PARTE NEM SEMPRE É A MAIS FOTOGRAFADA.", "Às vezes é a jardineira na janela, ou a luz que entra logo cedo na sala."] },
    { h: "SLIDE 4:", l: ["LUXO DE VERDADE É TER BELEZA SEM ABRIR MÃO DA PRATICIDADE.", "Um gourmet integrado ao jardim, pronto para o almoço de domingo."] },
    { h: "SLIDE 5:", l: ["UMA CASA INESQUECÍVEL É AQUELA QUE NÃO FARIA O MESMO SENTIDO PARA MAIS NINGUÉM.", "La Place", "Rua Laplace, 721, Santa Lúcia", "Última unidade disponível"] },
  ],
  legenda: [
    "Uma casa inesquecível tem a ver com os detalhes que fazem sentido para quem vive ali: a luz da manhã, o verde na janela, o espaço para receber.",
    "No La Place, são apenas 5 unidades em um projeto de arquitetura atemporal no Santa Lúcia. Resta uma.",
    "Link na bio.",
  ],
});
F.push({
  data: "28/01", formato: FMT.estatico,
  tema: "Walk Funcionários: enquanto a cidade desacelera, a obra segue.",
  objetivo: "Usar uma das novas captações da obra para mostrar que o Walk Funcionários segue avançando em janeiro, reforçando compromisso com o cronograma e transparência.",
  persona: "Compradores e investidores que acompanham a obra do Walk Funcionários.",
  editoria: "Obras / Institucional.",
  slides: [
    { l: ["Janeiro de férias para muita gente.", "De obra a todo vapor para o Walk Funcionários."] },
    { l: ["[etapa atual da obra]"] },
    { l: ["Acompanhe por aqui"] },
  ],
  legenda: [
    "Enquanto boa parte da cidade tira uns dias de descanso, a obra do Walk Funcionários segue avançando.",
    "[Etapa atual da obra em uma frase.]",
    "Studios de 26 a 49 m², com varanda em todas as unidades, na Rua dos Aimorés.",
    "Link na bio.",
  ],
});

// ---------------------------------------------------------------- build
(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Intenção de Post - Janeiro";
  addCover(pres, "FBR", "INTENÇÃO DE POST - JANEIRO");
  F.forEach((it) => (it.semana ? addDivider(pres, it.semana) : addPost(pres, it, "belvedere")));
  addEnd(pres);
  await pres.writeFile({ fileName: path.join(__dirname, "INTENCAO_FBR_JANEIRO.pptx") });
  console.log("ok");
})();
