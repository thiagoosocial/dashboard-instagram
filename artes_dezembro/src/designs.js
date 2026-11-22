const { u, page, ICON, sparkle, dots, bauble } = require('./common');

const logo = (v = 'laranja', extra = '') => `<img class="logo" style="${extra}" src="${u('logo_' + v + '.png')}">`;
const arcs = `
<div class="arc" style="width:600px;height:600px;right:-300px;top:-300px"></div>
<div class="arc" style="width:520px;height:520px;left:-340px;top:1020px"></div>`;

// ------------------------------------------------------------------ 01/12
const biosseguranca = page(`
${arcs}${logo()}
<div style="position:absolute;left:70px;right:70px;top:214px">
  <span class="tag" style="font-size:19px;padding:12px 26px">${ICON.ribbon('#D3253A', 18)} Dia Mundial de Luta contra a Aids</span>
  <h1 style="margin-top:34px;font-size:86px">Biossegurança<br>é <b>cuidado</b><br>com você.</h1>
  <p class="sub" style="margin-top:30px;width:880px">Em cada atendimento, seguimos protocolos rigorosos de <b>esterilização e proteção</b> para você sorrir com tranquilidade.</p>
</div>
<div class="photo fade" style="height:640px;background-image:url(${u('biosseguranca.jpg')});background-size:cover;background-position:center 12%"></div>
<div class="bar"><div class="chk">${ICON.check}</div>
<div class="t"><b>Informação é prevenção.</b> Procure uma unidade de saúde para testagem e acompanhamento.</div></div>
`);

// ------------------------------------------------------------------ 03/12
const acessibilidade = page(`
${arcs}${logo()}
<div style="position:absolute;left:70px;right:70px;top:214px">
  <span class="tag">Dia Internacional da Pessoa com Deficiência</span>
  <h1 style="margin-top:34px">Todo sorriso<br>merece <b>ser bem<br>cuidado.</b></h1>
  <p class="sub" style="margin-top:28px;width:900px">Atendimento <b>acolhedor, respeitoso e adaptado</b> às necessidades de cada paciente.</p>
</div>
<div class="photo fade" style="height:660px;background-image:url(${u('cadeirante.jpg')});background-size:cover;background-position:center 48%"></div>
<div class="bar"><div class="chk">${ICON.check}</div>
<div class="t">Tem alguma necessidade específica? <b>Conte para a nossa equipe</b> e preparamos tudo para você.</div></div>
`);

// ------------------------------------------------------------------ 05/12
const voluntario = page(`
${arcs}${logo()}
<div style="position:absolute;left:70px;right:70px;top:214px">
  <span class="tag">5 de dezembro · Dia do Voluntário</span>
  <h1 style="margin-top:34px">Pequenos gestos<br>geram <b>grandes<br>sorrisos.</b></h1>
  <p class="sub" style="margin-top:28px;width:900px">Lançamos a <b>Ação Solidária de Natal</b>: vamos arrecadar kits de higiene bucal para quem mais precisa.</p>
</div>
<div class="photo fade" style="height:610px;background-image:url(${u('voluntarios.jpg')});background-size:cover;background-position:center 30%"></div>
<div class="bar"><div class="chk">${ICON.check}</div>
<div class="t"><b>Doe escova, creme e fio dental.</b> Fale com a nossa equipe e saiba como participar.</div>
<div class="cta">Participe ${ICON.arrow}</div></div>
`);

// ------------------------------------------------------------------ 08/12
const familia = page(`
${arcs}${logo()}
<div style="position:absolute;left:70px;right:70px;top:214px;z-index:3">
  <span class="tag">8 de dezembro · Dia Nacional da Família</span>
  <h1 style="margin-top:32px;font-size:78px">Antes das férias,<br><b>cuide do sorriso</b><br>de quem você ama.</h1>
  <div style="margin-top:28px;display:flex;gap:14px"><span class="chip solid">Check-up em família</span><span class="chip">Vale-cuidado de Natal</span></div>
</div>
<div class="photo fade" style="height:770px;background-image:url(${u('familia_wide.jpg')});background-size:cover;background-position:center bottom"></div>
<div class="bar"><div class="chk">${ICON.check}</div>
<div class="t"><b>Agende o horário de toda a família</b> e comece as férias com o sorriso em dia.</div></div>
`);

// ------------------------------------------------------------------ 10/12
const direitos = page(`
<div class="arc" style="width:1100px;height:1100px;right:-520px;bottom:-560px;border-color:rgba(228,112,28,.35)"></div>
<div class="arc" style="width:800px;height:800px;right:-380px;bottom:-400px;border-color:rgba(228,112,28,.45)"></div>
<div class="arc" style="width:500px;height:500px;right:-230px;bottom:-250px;border-color:rgba(228,112,28,.6)"></div>
<div class="arc" style="width:620px;height:620px;left:-360px;top:-300px"></div>
${logo()}
<div style="position:absolute;left:80px;right:80px;top:230px">
  <span class="tag" style="font-size:20px">10 de dezembro · Direitos Humanos</span>
  <h1 style="font-size:92px;position:relative;margin-top:60px">Cuidar do<br>sorriso é cuidar<br>da <b>dignidade.</b></h1>
  <p class="sub" style="margin-top:36px;width:860px;font-size:32px">Há 78 anos, a Declaração Universal dos Direitos Humanos reconheceu que toda pessoa merece <b>respeito, cuidado e acesso à saúde.</b></p>
</div>
<div style="position:absolute;left:70px;top:900px;font-family:'Playfair Display';font-weight:800;font-size:250px;line-height:1;color:rgba(228,112,28,.17);letter-spacing:-.03em">1948</div>
<div style="position:absolute;left:80px;right:80px;bottom:80px;display:flex;align-items:center;gap:18px">
  <div style="width:90px;height:3px;background:var(--o)"></div>
  <span class="chip">Respeito</span><span class="chip">Acolhimento</span><span class="chip solid">Cuidado</span>
</div>
`);

// ------------------------------------------------------------------ 21/12
const verao = page(`
<div class="arc" style="width:600px;height:600px;right:-300px;top:-300px;border-color:rgba(255,255,255,.7)"></div>
${logo()}
<div style="position:absolute;left:70px;right:70px;top:214px">
  <span class="tag">21 de dezembro · Começa o verão</span>
  <h1 style="margin-top:34px;font-size:90px">Sorriso <b>pronto</b><br>para as festas<br>e para o verão.</h1>
  <p class="sub" style="margin-top:28px;width:880px">Clareamento dental com <b>avaliação profissional</b> para você brilhar nas festas e nas férias.</p>
</div>
<div class="photo fade" style="height:700px;background-image:url(${u('verao.jpg')});background-size:cover;background-position:center 46%"></div>
<div class="bar"><div class="chk">${ICON.check}</div>
<div class="t"><b>Agende sua avaliação.</b> O clareamento é indicado após consulta com o dentista.</div>
<div class="cta">Agende ${ICON.arrow}</div></div>
`, `.cream{background:radial-gradient(1300px 950px at 15% 0,#FFF6EA 0,#FBE6CE 55%,#F6D2AE 100%)}`);

// ------------------------------------------------------------------ Carrossel viagem
const slideBase = (inner, n) => page(`
<div class="arc" style="width:600px;height:600px;right:-300px;top:-300px"></div>
<div class="arc" style="width:520px;height:520px;left:-300px;bottom:-200px"></div>
${logo()}
${inner}
<div style="position:absolute;left:70px;right:70px;bottom:56px;display:flex;justify-content:space-between;align-items:center;font-weight:600;font-size:22px;color:var(--od);letter-spacing:.08em">
  <span>CUIDADOS NA VIAGEM</span><span>${n} / 6</span></div>`);

const iconTip = (svg) => `<div style="width:200px;height:200px;border-radius:50%;border:3px solid var(--o);display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.55)">${svg}</div>`;
const sv = (inner) => `<svg width="104" height="104" viewBox="0 0 64 64" fill="none" stroke="#E4701C" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const ICONS = {
  kit: sv('<rect x="10" y="22" width="44" height="30" rx="6"/><path d="M24 22v-5a4 4 0 014-4h8a4 4 0 014 4v5M10 36h44"/><path d="M28 36v4h8v-4"/>'),
  water: sv('<path d="M32 8C24 20 16 28 16 38a16 16 0 0032 0c0-10-8-18-16-30z"/><path d="M24 40a8 8 0 007 7"/>'),
  sugar: sv('<path d="M16 16h32l-4 34a4 4 0 01-4 4H24a4 4 0 01-4-4z"/><path d="M18 28h28M36 16l6-9h9"/>'),
  ice: sv('<path d="M32 6l7 12 13 2-9 10 3 14-14-7-14 7 3-14-9-10 13-2z"/>'),
};

function tip(n, title, text, icon) {
  return slideBase(`
  <div style="position:absolute;left:80px;right:80px;top:330px;text-align:left">
    <div style="display:flex;align-items:center;gap:36px">${iconTip(icon)}
      <div style="font-family:'Playfair Display';font-weight:800;font-size:280px;line-height:.8;color:rgba(228,112,28,.9)">${n - 1}</div></div>
    <h1 style="margin-top:60px;font-size:80px">${title}</h1>
    <p class="sub" style="margin-top:36px;font-size:36px;line-height:1.5">${text}</p>
  </div>
  <div style="position:absolute;right:70px;bottom:130px" class="cta">Arraste ${ICON.arrow}</div>`, n);
}

const carr1 = page(`
<div class="arc" style="width:600px;height:600px;right:-300px;top:-300px"></div>
${logo()}
<div style="position:absolute;left:70px;right:70px;top:214px">
  <span class="tag">21 de dezembro · Começa o verão</span>
  <h1 style="margin-top:32px;font-size:84px">4 cuidados com<br>o sorriso <b>na<br>viagem.</b></h1>
</div>
<div class="photo fade" style="height:700px;background-image:url(${u('verao.jpg')});background-size:cover;background-position:center 46%"></div>
<div class="bar"><div class="chk">${ICON.check}</div>
<div class="t">Guia rápido para <b>curtir as férias</b> sem dor de dente.</div>
<div class="cta">Arraste ${ICON.arrow}</div></div>`, `.cream{background:radial-gradient(1300px 950px at 15% 0,#FFF6EA 0,#FBE6CE 55%,#F6D2AE 100%)}`);

const carr = [
  carr1,
  tip(2, 'Leve o <b>básico</b> na bagagem.', 'Escova, creme dental e fio dental na necessaire: a higiene não tira férias.', ICONS.kit),
  tip(3, 'Mantenha a <b>água</b> por perto.', 'Beber água ao longo do dia ajuda a limpar a boca e reduz o efeito de bebidas e doces.', ICONS.water),
  tip(4, 'Cuidado com <b>açúcar e bebidas ácidas.</b>', 'Drinks, refrigerantes e petiscos o dia todo favorecem cáries. Prefira nas refeições e enxágue a boca com água.', ICONS.sugar),
  tip(5, 'Evite morder <b>gelo e coisas duras.</b>', 'Gelo, caroços e alimentos muito duros podem fraturar dentes e restaurações.', ICONS.ice),
  slideBase(`
  <div style="position:absolute;left:80px;right:80px;top:270px;text-align:center">
    <span class="tag">Antes de viajar</span>
    <h1 style="margin-top:44px;font-size:92px">Faça um <b>check-up</b><br>e viaje<br>tranquilo.</h1>
    <p class="sub" style="margin:40px auto 0;width:820px;font-size:36px;line-height:1.5">Uma avaliação antes das férias evita imprevistos. <b>Se sentir dor ou tiver uma urgência, procure um dentista.</b></p>
    <div style="margin-top:56px;display:flex;justify-content:center"><span class="chip solid" style="font-size:30px;padding:18px 44px">Agende com a nossa equipe</span></div>
  </div>`, 6),
];

// ------------------------------------------------------------------ 24/12
const burgBg = `body{background:radial-gradient(1100px 900px at 50% 28%,#8A2140 0,#6E1830 45%,#3F0C1B 100%)}`;
const vespera = page(`
${dots(110, 7, 1080, 1350, '255,236,190', 4, .15, .7)}
<div style="position:absolute;left:30px;right:30px;top:30px;bottom:30px;border:2px solid rgba(212,174,90,.7)"></div>
<div style="position:absolute;left:44px;right:44px;top:44px;bottom:44px;border:1px solid rgba(212,174,90,.35)"></div>
${bauble(150, 236, 46, '#F1D58F', '#A8741F', 190)}${bauble(250, 150, 30, '#E9C170', '#8F5E14', 120)}
${bauble(930, 190, 40, '#F1D58F', '#A8741F', 150)}${bauble(840, 116, 26, '#E9C170', '#8F5E14', 90)}
${sparkle(520, 120, 40)}${sparkle(190, 470, 26, '#F1D58F', .8)}${sparkle(880, 420, 30, '#F1D58F', .8)}
<div style="position:absolute;left:0;right:0;top:300px;text-align:center;color:var(--gold2)">
  <div style="font-weight:600;font-size:24px;letter-spacing:.32em">24 DE DEZEMBRO · VÉSPERA DE NATAL</div>
  <div style="font-weight:500;font-size:72px;letter-spacing:.34em;margin-top:56px;color:#F8E6B8;padding-left:.34em">FELIZ</div>
  <div style="font-family:'Playfair Display';font-style:italic;font-weight:700;font-size:250px;line-height:1.15;padding-bottom:.05em;background:linear-gradient(180deg,#FFE9A8 0,#D4AE5A 55%,#A8741F 100%);-webkit-background-clip:text;color:transparent;margin-top:-36px;margin-bottom:-36px">Natal</div>
  <p style="margin:46px auto 0;width:760px;font-size:33px;line-height:1.5;color:#FBEFD6;font-weight:400">Que esta noite seja de <b style="color:var(--gold2);font-weight:700">paz, amor e gratidão.</b> Obrigado por confiar o seu sorriso a nós ao longo de 2026.</p>
  <div style="margin:56px auto 0;width:120px;height:2px;background:var(--gold)"></div>
  <div style="margin-top:30px;font-family:'Playfair Display';font-style:italic;font-size:44px;color:#F8E6B8">Com carinho, equipe Cisos</div>
</div>
<img src="${u('logo_branco_laranja.png')}" style="position:absolute;left:50%;transform:translateX(-50%);bottom:84px;height:92px">
`, burgBg, '');

// ------------------------------------------------------------------ 25/12
const natal = page(`
${dots(70, 11, 1080, 1350, '212,174,90', 5, .2, .55)}
<div style="position:absolute;left:30px;right:30px;top:30px;bottom:30px;border:2px solid rgba(201,162,75,.65)"></div>
${bauble(120, 254, 44, '#F1D58F', '#A8741F', 210)}${bauble(220, 158, 28, '#C0392B', '#6E1830', 130)}
${bauble(960, 224, 44, '#F1D58F', '#A8741F', 180)}${bauble(860, 138, 28, '#C0392B', '#6E1830', 110)}
${sparkle(180, 520, 34, '#D4AE5A', .9)}${sparkle(880, 470, 28, '#D4AE5A', .9)}
${logo('laranja', 'top:300px')}
<div style="position:absolute;left:0;right:0;top:460px;text-align:center">
  <div style="font-weight:500;font-size:60px;letter-spacing:.34em;color:#7a4a2d;padding-left:.34em">FELIZ</div>
  <div style="font-family:'Playfair Display';font-style:italic;font-weight:700;font-size:240px;line-height:1.15;padding-bottom:.05em;background:linear-gradient(180deg,#E2B754 0,#B98324 60%,#8A5C12 100%);-webkit-background-clip:text;color:transparent;margin-top:-34px;margin-bottom:-34px">Natal!</div>
  <p class="sub" style="margin:40px auto 0;width:800px;font-size:34px">Hoje nossa clínica está fechada para celebrar com <b>quem a gente ama.</b> Voltamos em breve, com o mesmo carinho de sempre.</p>
  <div style="margin-top:44px"><span class="tag" style="background:var(--burg);border-color:var(--burg);color:#F8E6B8">25 de dezembro · Clínica fechada</span></div>
</div>
<svg style="position:absolute;left:0;bottom:0" width="1080" height="190" viewBox="0 0 1080 190"><defs><linearGradient id="gg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8A2140"/><stop offset="1" stop-color="#4A0F20"/></linearGradient></defs>
<path d="M0 190V110c120-60 260-70 400-40s300 50 460-10c80-30 160-30 220 0v130z" fill="url(#gg)"/>
<path d="M0 190V150c140-40 300-40 440-10s320 30 640-20v70z" fill="#D4AE5A" opacity=".85"/></svg>
`, `.cream{background:radial-gradient(1300px 950px at 50% 30%,#FFF9EE 0,#FBEBD3 55%,#F2D3A8 100%)}`);

// ------------------------------------------------------------------ 31/12
const anonovo = page(`
${dots(120, 21, 1080, 1350, '241,213,143', 5, .15, .6)}
<div style="position:absolute;left:30px;right:30px;top:30px;bottom:30px;border:2px solid rgba(212,174,90,.7)"></div>
<img src="${u('logo_branco_laranja.png')}" style="position:absolute;left:50%;transform:translateX(-50%);top:70px;height:100px">
<div style="position:absolute;left:0;right:0;top:200px;text-align:center">
  <div style="font-weight:600;font-size:22px;letter-spacing:.3em;color:var(--gold2);padding-left:.3em">31 DE DEZEMBRO · FELIZ ANO NOVO</div>
  <h1 style="color:#FBEFD6;margin-top:30px;font-size:80px">2026 foi de <i style="color:var(--gold2)">muitos sorrisos.</i></h1>
</div>
<div style="position:absolute;left:210px;right:210px;top:440px;height:520px;border-radius:300px 300px 28px 28px;border:3px solid var(--gold);overflow:hidden;background:url(${u('anonovo.jpg')}) 22% 55%/auto 125% no-repeat"></div>
<div style="position:absolute;left:0;right:0;top:960px;text-align:center;font-family:'Playfair Display';font-weight:800;font-size:215px;line-height:1;letter-spacing:-.02em;background:linear-gradient(180deg,#FFE9A8 0,#D4AE5A 55%,#A8741F 100%);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 8px 20px rgba(0,0,0,.45))">2027</div>
<div style="position:absolute;left:90px;right:90px;bottom:64px;text-align:center;color:#FBEFD6;font-size:29px;line-height:1.45">Obrigado por fazer parte da nossa história.<br><b style="color:var(--gold2)">Vamos começar 2027 com um tratamento planejado?</b></div>
`, `body{background:radial-gradient(1100px 900px at 50% 40%,#3A2214 0,#1E120C 60%,#120a06 100%)}`, '');

// ------------------------------------------------------------------ Vale-cuidado
const cardFront = (rad = 44) => `
<div style="width:1600px;height:900px;position:relative;overflow:hidden;border-radius:${rad}px;background:radial-gradient(1200px 900px at 20% 10%,#8A2140 0,#6E1830 50%,#3F0C1B 100%);font-family:Montserrat">
  ${dots(90, 5, 1600, 900, '241,213,143', 4, .12, .6)}
  <div style="position:absolute;inset:26px;border:2px solid rgba(212,174,90,.75);border-radius:30px"></div>
  <div style="position:absolute;right:140px;top:0;width:96px;height:100%;background:linear-gradient(90deg,#B98324,#F1D58F 50%,#B98324)"></div>
  <div style="position:absolute;left:0;top:300px;width:100%;height:84px;background:linear-gradient(180deg,#B98324,#F1D58F 50%,#B98324);opacity:.0"></div>
  ${bauble(1420, 130, 62, '#F1D58F', '#A8741F', 0)}${bauble(1300, 90, 38, '#E9C170', '#8F5E14', 0)}
  <img src="${u('logo_branco_laranja.png')}" style="position:absolute;left:90px;top:80px;height:112px">
  <div style="position:absolute;left:90px;top:262px;color:var(--gold2);font-weight:600;font-size:26px;letter-spacing:.3em">PRESENTE DE NATAL</div>
  <div style="position:absolute;left:90px;top:318px;font-family:'Playfair Display';font-weight:800;font-size:132px;line-height:1;background:linear-gradient(180deg,#FFE9A8 0,#D4AE5A 60%,#A8741F 100%);-webkit-background-clip:text;color:transparent">Vale-cuidado</div>
  <div style="position:absolute;left:94px;top:452px;font-family:'Playfair Display';font-style:italic;font-weight:700;font-size:104px;line-height:1;color:#FBEFD6">de Natal</div>
  <div style="position:absolute;left:94px;top:600px;color:#F6E4BE;font-size:30px;line-height:1.4;width:950px">Presente de cuidado: <b>avaliação · limpeza · clareamento</b></div>
  <div style="position:absolute;left:94px;bottom:80px;display:flex;gap:36px;color:#FBEFD6;font-size:26px">
    <div style="width:330px"><div style="height:2px;background:rgba(241,213,143,.7);margin-bottom:10px"></div>Para</div>
    <div style="width:330px"><div style="height:2px;background:rgba(241,213,143,.7);margin-bottom:10px"></div>De</div>
    <div style="width:260px"><div style="height:2px;background:rgba(241,213,143,.7);margin-bottom:10px"></div>Válido até</div>
  </div>
</div>`;

const cardBack = page(`
<div style="width:1600px;height:900px;position:relative;overflow:hidden;background:linear-gradient(135deg,#FFFAF4,#F7E2CC);font-family:Montserrat;color:var(--b)">
  <div style="position:absolute;inset:26px;border:2px solid rgba(228,112,28,.55);border-radius:30px"></div>
  <img src="${u('logo_laranja.png')}" style="position:absolute;left:90px;top:80px;height:100px">
  <div style="position:absolute;right:100px;top:94px;font-weight:600;font-size:24px;letter-spacing:.24em;color:var(--od)">Nº ______________</div>
  <div style="position:absolute;left:90px;top:236px;font-family:'Playfair Display';font-weight:800;font-size:60px">Regras de <span style="color:var(--o)">utilização</span></div>
  <div style="position:absolute;left:90px;top:340px;width:1420px;font-size:28px;color:#5b4033">
    ${[1,2,3,4].map(()=>`<div style="border-bottom:2px dotted rgba(58,34,24,.4);height:62px"></div>`).join('')}
  </div>
  <div style="position:absolute;left:90px;top:640px;font-size:28px;font-weight:600;display:flex;gap:44px;align-items:center">
    <span style="color:var(--od)">Serviço:</span>
    <span>☐ Avaliação</span><span>☐ Limpeza</span><span>☐ Clareamento</span>
  </div>
  <div style="position:absolute;left:90px;bottom:84px;font-size:24px;color:#5b4033">Agendamento: ______________________ · Cisos — Na direção do seu sorriso</div>
</div>`, `body{width:1600px;height:900px}html{width:1600px;height:900px}`, '');

const cardFrontPage = page(cardFront(0), `body{width:1600px;height:900px;background:transparent}html{width:1600px;height:900px}`, '');

const valePost = page(`
<div class="arc" style="width:600px;height:600px;right:-300px;top:-300px"></div>
<div class="arc" style="width:520px;height:520px;left:-300px;bottom:100px"></div>
${dots(40, 3, 1080, 1350, '212,174,90', 4, .25, .6)}
${logo()}
<div style="position:absolute;left:0;right:0;top:200px;text-align:center">
  <span class="tag">01 a 23/12 · Presente de Natal</span>
  <h1 style="margin-top:26px;font-size:92px">Vale-cuidado<br><i>de Natal</i></h1>
  <p class="sub" style="margin:20px auto 0;width:820px;font-size:30px">Presenteie quem você ama com <b>saúde e bem-estar.</b></p>
  <div style="margin-top:26px;display:inline-flex;gap:14px"><span class="chip solid">Avaliação</span><span class="chip solid">Limpeza</span><span class="chip solid">Clareamento</span></div>
</div>
<div style="position:absolute;left:50%;top:640px;transform:translateX(-50%) rotate(-4deg) scale(.58);transform-origin:center top;width:1600px;height:900px;margin-left:0;filter:drop-shadow(0 30px 40px rgba(60,10,20,.35))">${cardFront()}</div>
<div class="bar" style="bottom:44px"><div class="chk">${ICON.check}</div>
<div class="t"><b>Cartão físico e digital.</b> Peça o seu na recepção ou fale com a nossa equipe.</div></div>
`);

module.exports = {
  // [arquivo, html, largura, altura]
  list: [
    ['vale-cuidado_post-feed', valePost, 1080, 1350],
    ['vale-cuidado_cartao-frente', cardFrontPage, 1600, 900],
    ['vale-cuidado_cartao-verso', cardBack, 1600, 900],
    ['01-12_biosseguranca', biosseguranca, 1080, 1350],
    ['03-12_acessibilidade', acessibilidade, 1080, 1350],
    ['05-12_acao-solidaria', voluntario, 1080, 1350],
    ['08-12_familia', familia, 1080, 1350],
    ['10-12_direitos-humanos', direitos, 1080, 1350],
    ['21-12_verao-clareamento', verao, 1080, 1350],
    ...carr.map((h, i) => [`21-12_carrossel-viagem_${i + 1}`, h, 1080, 1350]),
    ['24-12_vespera-de-natal', vespera, 1080, 1350],
    ['25-12_feliz-natal', natal, 1080, 1350],
    ['31-12_ano-novo-2027', anonovo, 1080, 1350],
  ],
};
