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
            ...(r.link ? {} : { color: r.color || "000000" }),
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
function addDivider(pres, n, month, extra) {
  const s = pres.addSlide();
  s.background = { path: A("semana.jpg") };
  s.addText(month, {
    x: 0.53, y: 1.5, w: 6, h: 0.5, margin: 0, fontFace: BODY, fontSize: 22,
    bold: true, color: YELLOW, valign: "middle", isTextBox: true,
  });
  s.addText("SEMANA " + n, {
    x: 0.53, y: 2.0, w: 6, h: 0.85, margin: 0, fontFace: BODY, fontSize: 48,
    bold: true, color: YELLOW, valign: "middle", isTextBox: true,
  });
  if (extra) {
    const runs = [];
    if (extra.titulo) runs.push({ text: extra.titulo, options: { bold: true, color: YELLOW, fontSize: 14, breakLine: true, paraSpaceAfter: 6 } });
    (extra.linhas || []).forEach((l, k, arr) => {
      if (l.label) runs.push({ text: l.label + " ", options: { bold: true, color: "FFFFFF", fontSize: 10.5, breakLine: false } });
      runs.push({ text: l.text, options: { color: "FFFFFF", fontSize: 10.5, breakLine: k < arr.length - 1, paraSpaceAfter: 6 } });
    });
    s.addText(runs, { x: 0.53, y: 3.0, w: 3.9, h: 2.3, margin: 0, fontFace: BODY, valign: "top", isTextBox: true });
  }
}
function addEnd(pres) {
  const s = pres.addSlide();
  s.background = { path: A("fim.jpg") };
}

// ---------------------------------------------------------------- modelo Capanema
const BLUE = "1155CC";
const MAGENTA = "E91EE0";
const GRID = { type: "solid", pt: 1, color: "999999" };

function fmtCell(f, size) {
  const base = { fontFace: BODY, fontSize: size, color: "000000" };
  const L = (t, o = {}) => ({ text: t, options: { ...base, ...o } });
  if (f === "REELS")
    return [L("REELS", { breakLine: true }), L("Feed e Story", { underline: { style: "sng" } }), L(":", { breakLine: true }), L("1080x1920px")];
  const first = f === "ESTÁTICO" ? "ESTÁTICO" : "CARROSSEL";
  return [
    L(first, { breakLine: true }),
    L("Feed", { underline: { style: "sng" } }), L(": 1080x1440px", { breakLine: true }),
    L("Story", { underline: { style: "sng" } }), L(": 1080x1920px"),
  ];
}
function canaisCell(list, size) {
  const base = { fontFace: BODY, fontSize: size, color: "000000" };
  return list.map((c, i) => ({
    text: c.toUpperCase(),
    options: c === "TikTok"
      ? { ...base, bold: true, italic: true, color: MAGENTA, breakLine: i < list.length - 1 }
      : { ...base, breakLine: i < list.length - 1 },
  })).map((r) => { if (r.text === "TIKTOK") r.text = "TIKTOK"; return r; });
}

function contentParas(p) {
  const paras = [];
  if (p.conteudo) {
    paras.push({ lines: [[run("Conteúdo:", true), run(" " + p.conteudo)]] });
    return paras;
  }
  paras.push({ lines: [[run("Editoria:", true), run(" " + p.editoria)], [run("Tema:", true), run(" " + p.tema)]] });
  paras.push({ lines: [[run(p.desc)]] });
  if (p.ref) {
    const lines = [[{ t: p.ref.label, b: true, color: BLUE }, ...(p.ref.text ? [run(" " + p.ref.text)] : [])]];
    p.ref.urls.forEach((u, i) => {
      const line = [{ t: u, link: u }];
      if (i < p.ref.urls.length - 1) line.push(run(" e "));
      lines.push(line);
    });
    paras.push({ lines });
  }
  return paras;
}

function addWeek(pres, rows) {
  const s = pres.addSlide();
  s.background = { path: A("tabela.jpg") };
  const flat = (paras) => paras.map((q) => q.lines.map((l) => l.map((r) => r.t).join("")).join("\n"));
  const parasList = rows.map(contentParas);
  const height = (sz) =>
    0.4 + parasList.reduce((tot, ps) => tot + Math.max(0.95, estimate(flat(ps), 5.0, sz, 9) / 72 * 0.85 + 0.2), 0);
  let size = 7.5;
  for (const c of [10, 9.5, 9, 8.5, 8, 7.5]) { if (height(c) <= 5.1) { size = c; break; } }
  const hdr = (t) => ({
    text: t,
    options: { bold: true, align: "center", valign: "middle", fontFace: "Arial", fontSize: 12, color: "000000" },
  });
  const ctr = { align: "center", valign: "top", margin: [0.06, 0.05, 0.05, 0.05] };
  const table = [[hdr("CANAIS"), hdr("FORMATOS"), hdr("DATAS"), hdr("CONTEÚDO")]];
  rows.forEach((p, i) => {
    table.push([
      { text: canaisCell(p.canais, 10), options: ctr },
      { text: p.fmt ? fmtCell(p.fmt, 10) : "", options: ctr },
      { text: p.data.split("\n").map((t, k, a) => ({ text: t, options: { fontFace: BODY, fontSize: 10, color: "000000", breakLine: k < a.length - 1 } })), options: ctr },
      { text: runsFromParas(parasList[i], size, 9), options: { align: "left", valign: "top", margin: [0.06, 0.1, 0.05, 0.1] } },
    ]);
  });
  s.addTable(table, {
    x: 0, y: 0.02, w: 10, colW: [1.65, 1.96, 1.19, 5.2], rowH: [0.4].concat(rows.map(() => 0.95)),
    border: GRID, margin: [0.05, 0.05, 0.05, 0.05],
  });
}

// ---------------------------------------------------------------- dados
const FB = ["Facebook", "Instagram"];
const FBT = ["Facebook", "Instagram", "TikTok"];
const W = [];

W.push({
  semana: 1,
  rows: [
    {
      canais: FB, fmt: "ESTÁTICO", data: "07/12\n16h", editoria: "Institucional/Comercial",
      tema: "Vietri: O valor absoluto do silêncio",
      desc: "Uma perspectiva limpa da suíte master ou da varanda olhando para o horizonte do bairro. O foco do texto será o conforto acústico, a exclusividade de ter poucos vizinhos e a privacidade como o maior pilar do alto padrão Capanema. Funciona como uma pausa visual no feed.",
    },
    {
      canais: FBT, fmt: "REELS", data: "07/12\n19h", editoria: "Conexão/Comercial",
      tema: "Vietri: A coreografia do seu dia a dia",
      desc: "Um vídeo imersivo e contemplativo focado na transição das coisas da vida acontecendo de forma natural nos ambientes do Vietri. O objetivo é transmitir a sensação de amplitude e o ritmo calmo do bairro Santa Lúcia. A trilha deve ser sofisticada (cordas lentas), e a legenda abordará como a planta de 142 m² respeita o tempo e a privacidade do morador.",
      ref: { label: "Referências:", urls: ["https://www.instagram.com/reel/DeligryRw_q/", "https://www.instagram.com/reel/DbQQ0DhIB7Z/"] },
    },
    {
      canais: FB, fmt: "CARROSSEL", data: "07/12\n21h", editoria: "Técnica/Comercial",
      tema: "Vietri: Plantas do tipo",
      desc: "Foco prático em como os 142 m² (4 quartos, 2 suítes) foram distribuídos. Usar recortes minimalistas da planta baixa intercalados com renders dos ambientes correspondentes. O objetivo é provar tecnicamente o conforto evidenciado nos posts anteriores, mostrando a clara separação entre a área social (para receber) e a área íntima (para desconectar).",
      ref: { label: "Ref:", text: "trazer como um estudo de layout, como na referência", urls: ["https://www.instagram.com/reel/DcCOtclh2_K/"] },
    },
  ],
});
W.push({
  semana: 2,
  extra: {
    titulo: "Tríade do Portovenere",
    linhas: [
      { label: "Direcionamento:", text: "Do seu jeito, por quem constrói BH. A última unidade do Portovenere chega com kit de personalização: o projeto é da Capanema, o estilo é do morador." },
      { label: "Meta:", text: "agregar valor à unidade com a personalização e reforçar a confiança na qualidade construtiva da Capanema." },
    ],
  },
  rows: [
    {
      canais: FB, fmt: "ESTÁTICO", data: "14/12\n16h", editoria: "Comercial",
      tema: "Portovenere: A última unidade",
      desc: "Uma imagem imponente da fachada do Portovenere, sem texto, como capa da tríade. A legenda reúne os quatro argumentos da última unidade em um só post: 3 quartos, 3 vagas, kit de personalização e condição sem correção de INCC até a entrega, com CTA para agendar visita. Funciona como o anúncio direto da semana.",
    },
    {
      canais: FBT, fmt: "REELS", data: "14/12\n19h", editoria: "Institucional/Comercial",
      tema: "Portovenere: Só resta uma",
      desc: "Vídeo em motion sobre a fachada e o projeto do Portovenere, com a mensagem de que resta apenas uma unidade. Cortes lentos entre a fachada, o lazer e a vista para o bairro Sion, com trilha de cordas e lettering mínimo, para reforçar a confiança na qualidade construtiva da Capanema. A legenda leva para o agendamento da visita.",
      ref: { label: "Referência:", text: "mesma linguagem do reels do Portovenere de 03/11,", urls: ["https://www.instagram.com/p/DbDqx8sxjU8/"] },
    },
    {
      canais: FB, fmt: "CARROSSEL", data: "14/12\n21h", editoria: "Técnica/Comercial",
      tema: "Portovenere: Kit de personalização",
      desc: "Mostrar como a última unidade pode ficar com a cara de quem vai morar. A primeira tela é só imagem e as demais têm pouquíssimo texto, com renders e recortes da planta de 93 m² (3 quartos, sendo 1 suíte) para apresentar as possibilidades do kit de personalização. Fecha com a condição sem correção de INCC até a entrega e o CTA para agendar visita.",
      ref: { label: "Referência:", text: "carrossel de outubro do Portovenere, com a planta sobreposta ao render,", urls: ["https://www.instagram.com/p/DdHdNm_lqvT/"] },
    },
  ],
});
W.push({
  semana: 3,
  extra: { titulo: "Tríade 2 do Vietri" },
  rows: [
    {
      canais: FB, fmt: "ESTÁTICO", data: "21/12\n16h", editoria: "Técnica/Comercial",
      tema: "Vietri: A consolidação do seu legado",
      desc: "Uma imagem imponente da fachada do Vietri (ou um detalhe macro dos materiais de acabamento externos). A abordagem será direta sobre segurança patrimonial e investimento: comprar no Vietri é cravar um ativo de altíssima qualidade no coração de um dos bairros mais valorizados de Belo Horizonte.",
    },
    {
      canais: FBT, fmt: "REELS", data: "21/12\n19h", editoria: "Conexão/Comercial",
      tema: "Vietri: Arquitetura autoral",
      desc: "Usando o áudio que temos do Bernardo falando sobre a criação do Vietri, vamos trazer um vídeo que mostra e define arquitetura autoral e como isso é um diferencial do Vietri que vai além das tipologias e metragens.",
      ref: { label: "Ref:", urls: ["https://www.instagram.com/p/DbDqx8sxjU8/"] },
    },
    {
      canais: FBT, fmt: "REELS", data: "21/12\n21h", editoria: "Conexão/Comercial",
      tema: "Vietri: Perspectiva x Experiência",
      desc: "Seguindo a ideia da referência, vamos apresentar o lazer do Vietri comparando como ele vai ficar (perspectiva) com a experiência de estar lá (humanização em take de looping de IA, mostrando como o morador vai aproveitar o espaço). Se possível, precisamos trazer takes de qualidade com uma visão mais artística da obra. Meio dia de captação é suficiente.",
      ref: { label: "Referência:", urls: ["https://www.instagram.com/reel/Dck4mk6SkCd/"] },
    },
  ],
});
W.push({
  semana: 4,
  extra: { titulo: "25/12 e 31/12", linhas: [{ label: "", text: "Post de Natal e final de ano já criados anteriormente." }] },
  rows: [
    { canais: FB, fmt: null, data: "25/12\nsexta-feira", conteudo: "Post de Natal já criado anteriormente." },
    { canais: FB, fmt: null, data: "31/12\nquinta-feira", conteudo: "Post de final de ano já criado anteriormente." },
  ],
});

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Intenção de Post - Dezembro";
  addCover(pres, "CAPANEMA", "INTENÇÃO DE POST");
  W.forEach((w) => {
    addDivider(pres, w.semana, "DEZEMBRO", w.extra);
    addWeek(pres, w.rows);
  });
  addEnd(pres);
  await pres.writeFile({ fileName: path.join(__dirname, "INTENCAO_CAPANEMA_DEZEMBRO.pptx") });
  console.log("ok");
})();
