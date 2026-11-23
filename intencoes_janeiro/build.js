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
            fontFace: BODY,
            fontSize: size,
            color: "000000",
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
      cparas.push({ lines: [[run(sl.h, true)], ...sl.l.map((t) => [run(t)])] });
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

// tabela do roteiro de vídeo (Reels)
function addReel(pres, p, style) {
  const s = pres.addSlide();
  s.background = { path: A("tabela.jpg") };
  const bordered = style === "belvedere";
  const colWE = [0.8, 1.98, 1.94, 2.31, 2.53];
  const hOf = (sz) => p.rows.reduce((tot, r) => tot + Math.max(...r.map((t, i) => estimate(t.split("\n"), colWE[i] - 0.14, sz, 0) / 72)) + 0.12, 0.4);
  let size = 7;
  for (const c of [9.5, 9, 8.5, 8, 7.5, 7]) { if (hOf(c) <= 5.2) { size = c; break; } }
  const hdrOpts = {
    bold: true, align: "center", valign: "middle", fontFace: BODY,
    fontSize: bordered ? 9 : 7, color: "000000",
  };
  const rows = [["TEMPO", "CENA", "LETTERING", "NARRAÇÃO", "LEGENDA"].map((t) => ({ text: t, options: hdrOpts }))];
  p.rows.forEach((r) => {
    rows.push(
      r.map((t, i) => ({
        text: i === 0 ? t.replace(" - ", " -\n") : t,
        options: {
          fontFace: BODY, fontSize: size, color: "000000", valign: "top", align: "left",
          margin: [0.07, 0.07, 0.05, 0.07],
        },
      }))
    );
  });
  const colW = [0.8, 1.98, 1.94, 2.31, 2.53];
  const opts = {
    x: 0.17, y: 0.17, w: 9.56, colW, margin: [0.05, 0.07, 0.05, 0.07],
    rowH: [0.38].concat(p.rows.map(() => 0.5)),
  };
  if (bordered) opts.border = border();
  else opts.border = { type: "none" };
  s.addTable(rows, opts);
}

function addPost(pres, p, style) {
  const hdrFont = style === "belvedere" ? "Arial" : "Roboto";
  addIntention(pres, p, hdrFont);
  if (p.rows) addReel(pres, p, style);
  else addContentLegend(pres, p, "Arial");
}

// ---------------------------------------------------------------- dados
const B = []; // Belvedere
B.push({ semana: 1 });
B.push({
  data: "05/01", formato: FMT.carrossel,
  tema: "Quantos boletos de aluguel de 2026 viraram seus? Uma provocação de início de ano para quem ainda paga aluguel.",
  objetivo: "Usar o clima de planejamento de janeiro para gerar reflexão sobre o aluguel e apresentar o Belvedere como o caminho para sair dele, gerando leads.",
  persona: "Pessoas e famílias que moram de aluguel e querem comprar o primeiro imóvel.",
  editoria: "Comercial / Oportunidade",
  slides: [
    { h: "SLIDE 1", l: ["Em 2026 você pagou 12 boletos de aluguel.", "Quantos viraram seus?"] },
    { h: "SLIDE 2", l: ["Nenhum.", "O aluguel mora com você, mas nunca é seu."] },
    { h: "SLIDE 3", l: ["Em 2027, a sua parcela pode construir algo que fica.", "2 quartos com suíte e varanda | 50 a 63 m² | vaga de garagem"] },
    { h: "SLIDE 4", l: ["Residencial Belvedere", "A partir de R$ 349.900", "10% de entrada + 48x de R$ 4.893,96 sem juros", "4 parcelas anuais de R$ 20.000", INCC] },
  ],
  legenda: [
    "Começo de ano é hora de fazer as contas. E tem uma que pouca gente gosta de fazer: quanto do aluguel de 2026 virou patrimônio?",
    "No Residencial Belvedere, a sua parcela vira apartamento: 2 quartos com suíte e varanda, todos com vaga de garagem, numa das regiões mais valorizadas de São João del-Rei.",
    "A partir de R$ 349.900\n10% de entrada\n48x de R$ 4.893,96 sem juros\n4 parcelas anuais de R$ 20.000 " + INCC,
    "Que 2027 seja o último ano de aluguel. Clique no link da bio e fale com nosso time.",
  ],
});
B.push({
  data: "07/01", formato: FMT.estatico,
  tema: "Leia de novo. Estático que empilha os atributos do Belvedere até chegar no preço, provocando surpresa.",
  objetivo: "Gerar percepção de oportunidade e conversão, mostrando quanto o apartamento entrega pelo valor de entrada.",
  persona: "Pessoas e famílias que buscam uma oportunidade acessível em São João del-Rei e já pesquisaram preços na cidade.",
  editoria: "Comercial / Oportunidade de compra",
  texto: ["2 quartos.", "Suíte.", "Varanda.", "Vaga de garagem.", "Vista para a serra.", "+15 itens de lazer.", "R$ 349.900.", "Leia de novo."],
  legenda: [
    "Não, você não leu errado.",
    "No Residencial Belvedere, R$ 349.900 é o ponto de partida para um apartamento de 2 quartos com suíte, varanda e vaga de garagem, com vista para a Serra do Lenheiro e mais de 15 itens de lazer no prédio.",
    "E ainda com 10% de entrada + 48x de R$ 4.893,96 sem juros e 4 parcelas anuais de R$ 20.000 " + INCC,
    "Quer conferir de perto? Clique no link da bio e fale com nosso time.",
  ],
});
B.push({ semana: 2 });
B.push({
  data: "12/01", formato: FMT.reels,
  tema: "Férias sem sair do prédio. Um dia de férias escolares no Belvedere, com as crianças se divertindo e os pais trabalhando ou descansando no mesmo endereço.",
  objetivo: "Gerar identificação com famílias durante as férias de janeiro, mostrando o lazer como solução real para a rotina, e gerar leads.",
  persona: "Famílias com filhos pequenos que buscam segurança, lazer e praticidade sem sair de casa.",
  editoria: "Estilo de vida / Família",
  obs: "Cortes rápidos entre crianças e pais, sempre em paralelo (enquanto um faz X, o outro faz Y). Perspectivas animadas e humanizadas com a mesma família. Trilha alegre e leve, voz próxima, com um toque de humor.",
  reelSize: 7.5,
  rows: [
    ["00:00 - 00:04", "Criança pulando no sofá enquanto o pai tenta trabalhar no notebook", "Férias escolares + home office = 😵", "Férias das crianças e você trabalhando em casa?", "Janeiro chegou, as aulas acabaram e a pergunta é sempre a mesma: o que fazer com as crianças?"],
    ["00:04 - 00:09", "Corte para a brinquedoteca, crianças brincando", "Enquanto eles brincam na brinquedoteca...", "No Belvedere, enquanto eles brincam na brinquedoteca...", "No Residencial Belvedere, as férias acontecem dentro do prédio."],
    ["00:09 - 00:14", "Pai trabalhando tranquilo no coworking", "...você trabalha em paz no coworking.", "...você trabalha em paz no coworking.", "Brinquedoteca, piscina, salão de jogos e cinema para eles. Coworking, academia e sauna para você."],
    ["00:14 - 00:19", "Crianças na piscina, mãe lendo na espreguiçadeira", "Piscina para eles. Descanso para você.", "De tarde, piscina para eles e descanso para você.", "São mais de 15 itens de lazer em mais de 1.300 m²."],
    ["00:19 - 00:24", "Família no cinema/auditório com pipoca", "Sessão de cinema sem pegar o carro.", "E a sessão de cinema é no próprio prédio.", "A partir de R$ 349.900 com 10% de entrada + 48x de R$ 4.893,96 sem juros."],
    ["00:24 - 00:29", "Fachada do Belvedere ao entardecer", "Residencial Belvedere. Férias o ano inteiro.", "Residencial Belvedere. Aqui as férias duram o ano inteiro.", "4 parcelas anuais de R$ 20.000 " + INCC],
    ["00:29 - 00:32", "Logo assinatura Belvedere + Lacca", "Clique no link da bio.", "Clique no link da bio e fale com o nosso time.", "Clique no link da bio e fale com nosso time."],
  ],
});
B.push({
  data: "14/01", formato: FMT.carrossel,
  tema: "3 perguntas para fazer antes de comprar o primeiro apartamento. Conteúdo educativo em que cada resposta leva ao Belvedere.",
  objetivo: "Construir autoridade e ajudar o público a decidir, posicionando o Belvedere como a escolha que responde às principais dúvidas de quem vai comprar.",
  persona: "Pessoas e famílias comprando o primeiro imóvel, que pesquisam bastante antes de decidir.",
  editoria: "Conteúdo educativo / Produto",
  slides: [
    { h: "SLIDE 1", l: ["Vai comprar seu primeiro apartamento em 2027?", "Faça essas 3 perguntas antes."] },
    { h: "SLIDE 2", l: ["1. A localização facilita a minha rotina?", "No Belvedere: Av. 8 de Dezembro, a poucos minutos do centro e de toda a estrutura da cidade."] },
    { h: "SLIDE 3", l: ["2. A planta acompanha a minha vida daqui a 5 anos?", "No Belvedere: 2 quartos com suíte e varanda. Espaço para o home office hoje e para o quarto do filho amanhã."] },
    { h: "SLIDE 4", l: ["3. A condição cabe no meu bolso sem apertar?", "No Belvedere: 10% de entrada + 48x de R$ 4.893,96 sem juros."] },
    { h: "SLIDE 5", l: ["Três respostas. Um endereço.", "Residencial Belvedere. A partir de R$ 349.900"] },
  ],
  legenda: [
    "Comprar o primeiro apartamento é uma das maiores decisões da vida. E boas decisões começam com boas perguntas.",
    "Localização, planta e condição de pagamento. Quando as três respostas são \"sim\", você encontrou o lugar certo.",
    "No Residencial Belvedere, elas são: apartamentos de 2 quartos com suíte e varanda, todos com vaga de garagem, a partir de R$ 349.900, com 10% de entrada + 48x de R$ 4.893,96 sem juros e 4 parcelas anuais de R$ 20.000 " + INCC,
    "Salve este post para consultar depois e clique no link da bio para falar com nosso time.",
  ],
});
B.push({ semana: 3 });
B.push({
  data: "19/01", formato: FMT.carrossel,
  tema: "Qual Belvedere tem a sua cara? Apresentação das tipologias em formato de \"teste de perfil\", conectando cada planta a um estilo de vida.",
  objetivo: "Apresentar as opções de planta de forma leve e interativa, gerando engajamento nos comentários e interesse comercial.",
  persona: "Pessoas e famílias que buscam um apartamento funcional e confortável para diferentes momentos da vida.",
  editoria: "Produto / Plantas",
  slides: [
    { h: "SLIDE 1", l: ["Qual Belvedere tem a sua cara?", "Arraste e descubra."] },
    { h: "SLIDE 2", l: ["Você quer praticidade e o melhor custo-benefício?", "2 quartos com 50 m².", "A partir de R$ 349.900"] },
    { h: "SLIDE 3", l: ["Você recebe a família todo fim de semana?", "2 quartos com 57 m².", "A partir de R$ 385.900"] },
    { h: "SLIDE 4", l: ["Você sonha com um espaço ao ar livre só seu?", "Garden de 2 quartos com 61 m².", "A partir de R$ 399.900"] },
    { h: "SLIDE 5", l: ["Você quer o máximo de espaço?", "2 quartos com 62 m².", "A partir de R$ 409.900"] },
    { h: "SLIDE 6", l: ["Todos com suíte, varanda e vaga de garagem.", "Comenta aqui: qual é o seu?"] },
  ],
  legenda: [
    "Cada família tem um jeito de viver. Por isso, o Residencial Belvedere tem plantas pensadas para perfis diferentes.",
    "Do apartamento mais compacto ao garden com área privativa, todos têm 2 quartos com suíte, varanda e vaga de garagem, com mais de 15 itens de lazer no prédio.",
    "E todos com a mesma condição facilitada: 10% de entrada + 48 parcelas sem juros + 4 parcelas anuais de R$ 20.000 " + INCC,
    "Conta pra gente nos comentários qual combina mais com você. E para conhecer as plantas, clique no link da bio e fale com nosso time.",
  ],
});
B.push({
  data: "21/01", formato: FMT.carrossel,
  tema: "Coisas que só quem mora em São João del-Rei entende. Conteúdo de pertencimento sobre a cidade, conectando a história local ao Belvedere.",
  objetivo: "Gerar identificação e compartilhamento entre moradores da cidade, reforçando o Belvedere como parte da essência de São João del-Rei.",
  persona: "Moradores de São João del-Rei e região que têm orgulho da cidade e pensam em comprar um imóvel nela.",
  editoria: "Cidade / Pertencimento",
  slides: [
    { h: "SLIDE 1", l: ["5 coisas que só quem mora em São João del-Rei entende."] },
    { h: "SLIDE 2", l: ["1. Saber a hora certa só de ouvir os sinos."] },
    { h: "SLIDE 3", l: ["2. Chamar a Maria Fumaça de passeio de domingo."] },
    { h: "SLIDE 4", l: ["3. Ter a Serra do Lenheiro como paisagem de todo dia."] },
    { h: "SLIDE 5", l: ["4. Cruzar com séculos de história no caminho do trabalho."] },
    { h: "SLIDE 6", l: ["5. Saber que não existe lugar igual para morar.", "Residencial Belvedere. Amplie seus horizontes em São João del-Rei."] },
  ],
  legenda: [
    "São João del-Rei tem um jeito só dela. Quem mora aqui sabe.",
    "É nesse cenário de história, arte e cultura que nasce o Residencial Belvedere: um empreendimento que se integra à essência da cidade, com vista para a Serra do Lenheiro e a Serra de São José e a poucos minutos do centro.",
    "Qual item você acrescentaria nessa lista? Conta nos comentários e marca alguém que é são-joanense de coração.",
    "Quer morar com essa vista? Clique no link da bio e fale com nosso time.",
  ],
});
B.push({ semana: 4 });
B.push({
  data: "26/01", formato: FMT.reels,
  tema: "Mais de 15 itens de lazer em 30 segundos. Um tour acelerado pelos espaços do Belvedere, com contador na tela.",
  objetivo: "Mostrar a dimensão da estrutura de lazer de forma dinâmica e prender a atenção até o final, gerando desejo e leads.",
  persona: "Compradores que valorizam lazer, conforto, qualidade de vida e potencial de valorização.",
  editoria: "Produto / Diferenciais",
  obs: "Contador grande no canto da tela, subindo a cada corte (1, 2, 3...). Cortes muito rápidos na batida, com perspectivas humanizadas. O ritmo acelera até o número final. Trilha energética, voz animada.",
  reelSize: 7.5,
  rows: [
    ["00:00 - 00:03", "Fachada do Belvedere com zoom rápido", "Duvido você contar até o fim.", "Mais de 15 itens de lazer em 30 segundos. Duvido você acompanhar.", "Fez a contagem até o final? 👀"],
    ["00:03 - 00:08", "Cortes rápidos: piscina, sauna, quadra de beach tennis, academia", "1 Piscina / 2 Sauna / 3 Beach tennis / 4 Academia", "Piscina, sauna, beach tennis, academia...", "O Residencial Belvedere tem mais de 15 itens de lazer e comodidade, distribuídos em mais de 1.300 m²."],
    ["00:08 - 00:13", "Cortes rápidos: espaço wellness, espaço beauty, salão de festas, espaço gourmet", "5 Wellness / 6 Beauty / 7 Salão de festas / 8 Gourmet", "espaço wellness, beauty, salão de festas, gourmet...", "Do térreo ao rooftop, tem espaço para treinar, relaxar, celebrar, trabalhar e brincar."],
    ["00:13 - 00:18", "Cortes rápidos: skybar, cinema/auditório, salão de jogos, brinquedoteca", "9 Skybar / 10 Cinema / 11 Jogos / 12 Brinquedoteca", "skybar, cinema, salão de jogos, brinquedoteca...", "Tudo isso em apartamentos de 2 quartos com suíte e varanda, a partir de R$ 349.900."],
    ["00:18 - 00:23", "Cortes rápidos: coworking, pet place, lavanderia, passarela aérea", "13 Coworking / 14 Pet place / 15 Lavanderia / 16 Passarela aérea", "coworking, pet place, lavanderia e uma passarela entre as torres.", "10% de entrada + 48x de R$ 4.893,96 sem juros. 4 parcelas anuais de R$ 20.000 " + INCC],
    ["00:23 - 00:28", "Câmera abre na vista da serra a partir do rooftop", "E a vista? Essa não dá para contar.", "E a vista? Essa não dá nem pra contar.", "Clique no link da bio e fale com nosso time."],
    ["00:28 - 00:31", "Logo assinatura Belvedere + Lacca", "Residencial Belvedere. A partir de R$ 349.900.", "Residencial Belvedere. Clique no link da bio.", ""],
  ],
});
B.push({
  data: "28/01", formato: FMT.carrossel,
  tema: "Comprar na planta é arriscado? Mitos e verdades sobre a compra na planta, usando a trajetória da Lacca como prova de confiança.",
  objetivo: "Quebrar a principal objeção de quem compra na planta, reforçando a credibilidade da Lacca e gerando segurança para a decisão.",
  persona: "Pessoas e famílias que querem comprar na planta, mas têm receio de atrasos ou de não saber em quem confiar.",
  editoria: "Autoridade / Institucional",
  slides: [
    { h: "SLIDE 1", l: ["\"Comprar na planta é arriscado.\"", "Mito ou verdade?"] },
    { h: "SLIDE 2", l: ["Depende de quem constrói."] },
    { h: "SLIDE 3", l: ["A Lacca tem mais de 25 anos de história.", "Mais de 2.500 unidades entregues.", "Presente em 7 cidades de Minas."] },
    { h: "SLIDE 4", l: ["Em São João del-Rei, o My House e o My Place foram 100% vendidos."] },
    { h: "SLIDE 5", l: ["Comprar na planta com quem entrega é a forma mais inteligente de conquistar o seu apartamento.", "Residencial Belvedere. Uma realização Lacca."] },
  ],
  legenda: [
    "O medo de comprar na planta é real. E a forma de resolver é olhar para quem está construindo.",
    "A Lacca tem mais de 25 anos de história, mais de 2.500 unidades entregues e é sucesso de vendas em todas as cidades onde atua. Aqui em São João del-Rei, o My House e o My Place foram 100% vendidos.",
    "Comprar na planta com quem entrega significa pagar com condições facilitadas e acompanhar o seu apartamento nascer.",
    "No Residencial Belvedere, a partir de R$ 349.900, com 10% de entrada + 48x de R$ 4.893,96 sem juros.",
    "Clique no link da bio e fale com nosso time.",
  ],
});

// ---------------- Telésforo
const T = [];
const TL = "VIVER COM PRATICIDADE. INVESTIR COM INTELIGÊNCIA.";
const TP = "Investidor focado em alta rentabilidade e liquidez rápida, e o comprador estratégico que busca um ativo imobiliário prático, moderno e com alto potencial de valorização.";
const TCOND = "10% de entrada + 48x de R$ 3.204,38 SEM JUROS*";
T.push({ semana: 1 });
T.push({
  data: "06/01", formato: FMT.carrossel,
  tema: "3 metas de todo investidor para 2027, e como um studio no My Place Telésforo cumpre as três.",
  objetivo: "Aproveitar o planejamento financeiro de início de ano para posicionar o studio como o investimento do ano, gerando leads qualificados.",
  persona: "Investidor focado em alta rentabilidade, liquidez rápida e diversificação de patrimônio.",
  editoria: "Investimentos imobiliários / Comercial",
  slides: [
    { h: "SLIDE 1", l: ["3 metas de todo investidor para 2027.", "(Arraste >>)"] },
    { h: "SLIDE 2", l: ["Meta 1: Ter patrimônio que dá para ver e tocar.", "Um imóvel no endereço mais desejado de Lafaiete."] },
    { h: "SLIDE 3", l: ["Meta 2: Ter renda todo mês.", "Studios com alta procura para locação, a 1 minuto da UNA."] },
    { h: "SLIDE 4", l: ["Meta 3: Ver o dinheiro crescer.", "Potencial de valorização de 12%."] },
    { h: "SLIDE 5", l: ["Três metas. Um studio.", "A partir de R$ 170.900 com " + TCOND + "."] },
  ],
  legenda: [
    "Patrimônio, renda e valorização. Se essas são as suas metas para 2027, você não precisa de três investimentos diferentes.",
    "O My Place Telésforo reúne as três: um imóvel na Av. Prefeito Telésforo Cândido de Rezende, com demanda de locação do público universitário e corporativo e potencial de valorização de 12%.",
    "A partir de R$ 170.900,00, com " + TCOND + " direto com a construtora.",
    TL,
    "Comece o ano investindo. Clique no link da bio e fale com um consultor Lacca.",
  ],
});
T.push({
  data: "08/01", formato: FMT.estatico,
  tema: "A volta às aulas está chegando, e com ela a procura por imóveis perto da UNA.",
  objetivo: "Criar senso de oportunidade para o investidor, mostrando que a demanda universitária é constante e que a localização é o principal motor de locação.",
  persona: "Investidor focado em alta rentabilidade e liquidez rápida, que quer alugar para o público universitário.",
  editoria: "Mercado imobiliário / Investimento",
  texto: ["FEVEREIRO TEM VOLTA ÀS AULAS.", "Quem tem imóvel perto da faculdade já sabe o que isso significa.", "UNA a 1 minuto a pé."],
  legenda: [
    "Todo começo de semestre se repete: estudantes procurando onde morar perto da faculdade, e poucos imóveis modernos disponíveis.",
    "O My Place Telésforo fica a 1 minuto a pé da UNA, com studios e apartamentos de 1 quarto, todos com varanda, e mais de 900 m² de lazer e comodidades. É exatamente o que o estudante procura, e exatamente o que faz o seu imóvel alugar rápido.",
    "Demanda constante, todo semestre, todo ano.",
    "A partir de R$ 170.900,00 com " + TCOND + ".",
    TL,
    "Chame a equipe Lacca no direct.",
  ],
});
T.push({ semana: 2 });
T.push({
  data: "13/01", formato: FMT.reels,
  tema: "Se você fosse alugar um studio em Lafaiete, qual escolheria? Um tour pelo My Place Telésforo do ponto de vista do inquilino.",
  objetivo: "Fazer o investidor enxergar o imóvel pelos olhos de quem vai alugar, provando que o produto é o mais desejado da cidade e gerando leads.",
  persona: TP,
  editoria: "Produto / Investimento",
  obs: "Câmera em primeira pessoa (POV), como se o inquilino estivesse visitando o prédio. Perspectivas animadas com movimento de câmera fluido. Na virada final, a cena muda para o investidor. Trilha moderna, voz descontraída.",
  reelSize: 7.5,
  rows: [
    ["00:00 - 00:04", "POV chegando à fachada do My Place Telésforo", "POV: você está procurando um studio para alugar em Lafaiete.", "Imagina que você está procurando um studio para alugar em Lafaiete.", "Se você fosse alugar um studio em Lafaiete, qual escolheria?"],
    ["00:04 - 00:09", "POV entrando no studio e abrindo a porta da varanda", "Varanda? ✔", "Você entra e já tem varanda.", "O inquilino escolhe o prédio que facilita a vida dele. E o My Place Telésforo foi pensado exatamente para isso."],
    ["00:09 - 00:14", "POV descendo para o coworking e a lavanderia", "Coworking e lavanderia no prédio? ✔", "Coworking e lavanderia sem sair do prédio.", "Studios e apartamentos de 1 quarto, todos com varanda, a 1 minuto da UNA."],
    ["00:14 - 00:19", "POV subindo ao rooftop, piscina com borda infinita", "Piscina com borda infinita no rooftop? ✔", "E lá em cima, piscina com borda infinita.", "Mais de 900 m² de lazer e comodidades: rooftop, coworking, estúdio de podcast, academia e muito mais."],
    ["00:19 - 00:24", "POV saindo do prédio, mapa com a UNA a 1 minuto", "Faculdade a 1 minuto? ✔", "E a faculdade fica a um minuto.", "Para o investidor, isso significa alta procura, baixa vacância e liquidez real."],
    ["00:24 - 00:29", "Virada: pessoa assinando contrato com chave na mesa", "Agora imagina ser o dono do imóvel que todo inquilino quer.", "Agora imagina ser o dono do imóvel que todo mundo quer alugar.", "A partir de R$ 170.900,00 com " + TCOND + "."],
    ["00:29 - 00:33", "Fachada + logo assinatura My Place Telésforo + Lacca", "A partir de R$ 170.900. Link na bio.", "My Place Telésforo. Clique no link da bio.", TL + " Link na bio."],
  ],
});
T.push({
  data: "15/01", formato: FMT.carrossel,
  tema: "Studio ou 1 quarto: qual combina com a sua estratégia? Comparativo das tipologias pelo perfil de inquilino de cada uma.",
  objetivo: "Educar o investidor sobre as opções de planta e ajudar na decisão, gerando conversas com o time comercial.",
  persona: TP,
  editoria: "Produto / Investimento",
  slides: [
    { h: "SLIDE 1", l: ["Studio ou 1 quarto?", "Qual combina com a sua estratégia de investimento?"] },
    { h: "SLIDE 2", l: ["STUDIO", "A partir de 20,80 m², com varanda.", "Ideal para o universitário.", "Mais giro, menor ticket de entrada."] },
    { h: "SLIDE 3", l: ["APARTAMENTO 1 QUARTO", "De 25,50 m² a 28,52 m², com varanda.", "Ideal para o profissional e o casal jovem.", "Contratos mais longos e estáveis."] },
    { h: "SLIDE 4", l: ["Nos dois:", "Bancada em granito | Porcelanato | Preparado para fogão de indução | Estrutura para ar-condicionado"] },
    { h: "SLIDE 5", l: ["Ainda na dúvida? Fale com um consultor Lacca.", "Unidades a partir de R$ 170.900."] },
  ],
  legenda: [
    "Cada planta atende a um perfil de inquilino, e escolher a certa faz diferença no seu retorno.",
    "O studio é a escolha de quem quer entrar com o menor ticket e alugar para o público universitário, que gira bastante. O apartamento de 1 quarto atende o profissional e o casal jovem, que costumam ficar mais tempo.",
    "No My Place Telésforo, as duas opções têm varanda, acabamento de qualidade e mais de 900 m² de lazer e comodidades.",
    "A partir de R$ 170.900,00 com " + TCOND + ".",
    "Qual é a sua estratégia? Conta nos comentários ou chame a equipe Lacca no direct.",
  ],
});
T.push({ semana: 3 });
T.push({
  data: "20/01", formato: FMT.estatico,
  tema: "Seu inquilino tem carro? A possibilidade de vaga de garagem como diferencial que amplia o público de locação.",
  objetivo: "Apresentar as vagas de garagem como um diferencial de investimento, mostrando que o investidor pode escolher e ampliar o valor do imóvel.",
  persona: TP,
  editoria: "Produto / Investimento",
  texto: ["SEU INQUILINO TEM CARRO?", "No My Place Telésforo, você escolhe.", "Vagas de garagem que podem ser compradas e escolhidas.", "3 níveis de garagem | vagas para carros e motos"],
  legenda: [
    "Um detalhe que muda o perfil de quem aluga o seu imóvel: a vaga de garagem.",
    "No My Place Telésforo, as vagas podem ser compradas e escolhidas, em três níveis de garagem cobertos, com opções para carro e moto. Você decide se o seu studio vai atender também o profissional que chega de carro, ampliando o público e o valor do aluguel.",
    "E ainda tem carregador para carro elétrico e bike place.",
    "Unidades a partir de R$ 170.900,00 com " + TCOND + ".",
    TL,
    "Fale com um consultor Lacca pelo link da bio.",
  ],
});
T.push({
  data: "22/01", formato: FMT.carrossel,
  tema: "Checklist do imóvel que aluga rápido. Os 5 critérios que todo investidor deveria checar, e como o My Place Telésforo cumpre cada um.",
  objetivo: "Construir autoridade e transmitir segurança ao investidor, mostrando de forma prática por que o produto tem alta liquidez.",
  persona: TP,
  editoria: "Investimentos imobiliários / Autoridade",
  slides: [
    { h: "SLIDE 1", l: ["O checklist do imóvel que aluga rápido.", "Salve antes de investir."] },
    { h: "SLIDE 2", l: ["✔ Localização", "A 1 minuto da UNA e no centro comercial de Lafaiete."] },
    { h: "SLIDE 3", l: ["✔ Tamanho certo", "Studios e aptos de 1 quarto de 20 a 28 m², o formato mais procurado."] },
    { h: "SLIDE 4", l: ["✔ Varanda", "Todas as unidades."] },
    { h: "SLIDE 5", l: ["✔ Lazer que atrai", "Rooftop com piscina de borda infinita, academia e sauna."] },
    { h: "SLIDE 6", l: ["✔ Serviços no prédio", "Coworking, lavanderia e estúdio de podcast."] },
    { h: "SLIDE 7", l: ["5 de 5. My Place Telésforo.", "A partir de R$ 170.900."] },
  ],
  legenda: [
    "Antes de investir em um imóvel para alugar, faça esse checklist. Ele diz muito sobre quanto tempo o seu imóvel vai ficar vazio.",
    "O My Place Telésforo marca todos os itens: localização estratégica, metragem certa, varanda em todas as unidades, lazer completo no rooftop e serviços que facilitam a rotina do inquilino.",
    "Resultado: alta procura, baixa vacância e liquidez real.",
    "A partir de R$ 170.900,00 com " + TCOND + ".",
    TL,
    "Salve este post e chame a equipe Lacca no direct.",
  ],
});
T.push({ semana: 4 });
T.push({
  data: "27/01", formato: FMT.reels,
  tema: "O que o inquilino vê e o que o investidor vê. Os mesmos espaços do My Place Telésforo apresentados por dois olhares.",
  objetivo: "Mostrar que cada diferencial do prédio tem um valor para quem mora e um retorno para quem investe, reforçando o posicionamento duplo do produto.",
  persona: TP,
  editoria: "Produto / Investimento",
  obs: "Lettering em duas linhas em todas as cenas, sempre começando com \"Inquilino:\" e \"Investidor:\". A segunda linha entra um tempo depois da primeira. Perspectivas humanizadas com movimento lento. Trilha sofisticada e calma, voz segura.",
  reelSize: 7.5,
  rows: [
    ["00:00 - 00:04", "Fachada do My Place Telésforo", "O que o inquilino vê... e o que o investidor vê.", "O mesmo prédio, dois olhares.", "Quem mora e quem investe olham para o mesmo prédio. E os dois gostam do que veem."],
    ["00:04 - 00:09", "Rooftop com piscina de borda infinita", "Inquilino: a melhor vista da cidade.\nInvestidor: o motivo para escolher o seu imóvel.", "Para o inquilino, a melhor vista da cidade. Para o investidor, o motivo pra ele escolher o seu imóvel.", "No My Place Telésforo, cada espaço tem um valor para quem mora e um retorno para quem investe."],
    ["00:09 - 00:14", "Coworking", "Inquilino: trabalho sem sair de casa.\nInvestidor: o público corporativo garantido.", "O coworking é conforto pra um e público garantido pro outro.", "Rooftop, coworking, varanda, localização: tudo pensado para atrair o inquilino e valorizar o seu patrimônio."],
    ["00:14 - 00:19", "Varanda do studio", "Inquilino: café com vista.\nInvestidor: o detalhe que valoriza o aluguel.", "A varanda é o café da manhã de um e o valor do aluguel do outro.", "Studios e apartamentos de 1 quarto de 20 a 28 m², todos com varanda."],
    ["00:19 - 00:24", "Mapa com a UNA a 1 minuto", "Inquilino: 1 minuto da faculdade.\nInvestidor: baixa vacância.", "A faculdade a um minuto é praticidade pra um e imóvel ocupado pro outro.", "A partir de R$ 170.900,00 com " + TCOND + "."],
    ["00:24 - 00:29", "Fachada ao entardecer", "Dois olhares. Um investimento que funciona para os dois.", "Dois olhares. Um investimento que funciona para os dois.", TL],
    ["00:29 - 00:32", "Logo assinatura My Place Telésforo + Lacca", "A partir de R$ 170.900. Link na bio.", "Clique no link da bio e fale com um consultor Lacca.", "Clique no link da bio e fale com um consultor Lacca."],
  ],
});
T.push({
  data: "29/01", formato: FMT.estatico,
  tema: "Enquanto você pensa, alguém escolhe a sua unidade. Urgência para fechar o mês com conversão.",
  objetivo: "Gerar senso de urgência e acelerar decisões de quem já conhece o produto, convertendo em contato com o time comercial.",
  persona: "Investidores e compradores que já conhecem o My Place Telésforo e ainda não tomaram a decisão.",
  editoria: "Comercial / Urgência",
  texto: ["ENQUANTO VOCÊ PENSA,", "ALGUÉM ESCOLHE A SUA UNIDADE.", "Studios a partir de R$ 170.900", TCOND],
  legenda: [
    "As melhores unidades são sempre as primeiras a sair: o andar mais alto, a melhor posição, a planta que você queria.",
    "Se o My Place Telésforo já está nos seus planos, janeiro é o momento de garantir a sua com as condições de lançamento: a partir de R$ 170.900,00 com " + TCOND + " direto com a construtora.",
    "Não deixe para descobrir depois que a sua unidade já tem dono.",
    TL,
    "Fale agora com um consultor Lacca pelo link da bio.",
  ],
});

// ---------------------------------------------------------------- build
async function build(items, subtitle, style, file) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Intenção de Post - Janeiro";
  addCover(pres, subtitle, "INTENÇÃO DE POST - JANEIRO");
  items.forEach((it) => {
    if (it.semana) addDivider(pres, it.semana);
    else addPost(pres, it, style);
  });
  addEnd(pres);
  await pres.writeFile({ fileName: path.join(__dirname, file) });
  console.log("ok", file);
}

(async () => {
  await build(B, "LACCA Residencial Belvedere", "belvedere", "INTENCAO_BELVEDERE_JANEIRO.pptx");
  await build(T, "LACCA - TELÉSFORO", "telesforo", "INTENCAO_TELESFORO_JANEIRO.pptx");
})();
