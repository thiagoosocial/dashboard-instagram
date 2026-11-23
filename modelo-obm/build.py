"""
Modelo "Caderno do Leno" v4 — carrossel de perfil PESSOAL do Reinaldo Heleno (One Big Media por trás, sem cara institucional).

Linguagem: página de caderno / feed pessoal.
  • Fotos como POLAROIDES presas com fita, levemente tortas (sem máscara/forma de marca).
  • Anotações à mão (Caveat), círculos, sublinhados e setas rabiscados em volta dos números.
  • Marca-texto neon "de verdade" nas palavras-chave do título (Bricolage Grotesque 800).
  • Post-its neon para dados curtos; folha pautada para tabela; balão de fala com a foto dele na opinião.
  • Sem tag, sem barra de progresso, sem selo/logo (logo pequeno só no último slide).
  • Alterna papel (bege) e fundo escuro (navy quase preto).

Cores: Navy #142544 · Neon #E2FC51 · Purple #8140FA · Blue #3157F7 (só em destaques/rabiscos). Papel #F2EEE5.

Uso:  python3 build.py   ->  out/slide-XX.png (1080x1350) e out/carrossel.pdf
"""
import os, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
A = f"file://{HERE}/assets/"
R = f"file://{HERE}/assets/refs/"
F = f"file://{HERE}/fonts/"

NAME, HANDLE = "Reinaldo Heleno", "@reinaldoheleno"
NAVY, BLUE, PURPLE, NEON, SKY, PAPER = "#142544", "#3157F7", "#8140FA", "#E2FC51", "#79AAF7", "#F2EEE5"
TOTAL = 7

NOISE = ("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>"
         "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/>"
         "<feColorMatrix values='0 0 0 0 .3  0 0 0 0 .25  0 0 0 0 .2  0 0 0 .6 0'/></filter>"
         "<rect width='300' height='300' filter='url(%23n)'/></svg>")

ff = lambda fam, w, f: f"@font-face{{font-family:'{fam}';font-weight:{w};src:url('{F}{f}.woff2') format('woff2');}}"
fonts = (ff("Brico", 700, "bricolage-grotesque-latin-700-normal") + ff("Brico", 800, "bricolage-grotesque-latin-800-normal")
         + ff("Hand", 600, "caveat-latin-600-normal") + ff("Hand", 700, "caveat-latin-700-normal")
         + "".join(ff("DM Sans", w, f"dm-sans-latin-{w}-normal") for w in (400, 500, 700)))

CSS = fonts + f"""
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1350px;background:#000}}
.slide{{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:'DM Sans',sans-serif;
  display:flex;flex-direction:column;padding:56px 66px 50px}}
.paper{{background:{PAPER};color:{NAVY}}}
.dark{{background:radial-gradient(80% 50% at 100% 0%,#1d2c5e 0%,rgba(20,37,68,0) 70%),#0c1222;color:#fff}}
.grain{{position:absolute;inset:0;background:url("{NOISE}");pointer-events:none;z-index:20}}
.paper .grain{{opacity:.16;mix-blend-mode:multiply}} .dark .grain{{opacity:.07;mix-blend-mode:screen}}
.hdr{{position:relative;z-index:6;display:flex;align-items:center;justify-content:space-between;flex:none;height:92px}}
.who{{display:flex;align-items:center;gap:18px}}
.av{{width:84px;height:84px;border-radius:50%;background:url('{A}avatar.png') center/cover;border:4px solid {NEON};box-shadow:0 6px 18px rgba(0,0,0,.25)}}
.paper .av{{border-color:{NAVY}}}
.nm{{font-family:'Brico';font-weight:800;font-size:30px;letter-spacing:-.02em;line-height:1.1;display:flex;align-items:center;gap:8px}}
.hd{{font-family:'Hand';font-weight:600;font-size:34px;line-height:1;opacity:.75;margin-top:2px}}
.pg{{font-family:'Hand';font-weight:700;font-size:46px;transform:rotate(5deg);opacity:.85}}
.main{{position:relative;z-index:5;flex:1;display:flex;flex-direction:column;min-height:0;padding-top:26px}}
h1{{font-family:'Brico';font-weight:800;letter-spacing:-.04em;line-height:1.1}}
.hl{{color:{NAVY};background:linear-gradient(103deg,rgba(226,252,81,0) 0,{NEON} 2.5%,{NEON} 97%,rgba(226,252,81,0) 100%);
  padding:.02em .14em .06em;border-radius:.3em .12em .34em .14em/.22em .32em .14em .3em;-webkit-box-decoration-break:clone;box-decoration-break:clone}}
.body{{font-size:30px;line-height:1.42;font-weight:400}}
.body b{{font-weight:700}} .body p+p{{margin-top:.6em}}
.dark .body{{color:rgba(255,255,255,.9)}} .paper .body{{color:#2b3550}}
.hand{{font-family:'Hand';font-weight:700;line-height:1.02;letter-spacing:.005em}}
.dark .hand.k{{color:{NEON}}} .paper .hand.k{{color:{PURPLE}}}
.src{{font-size:21px;margin-top:14px;opacity:.55}}
.next{{position:absolute;right:70px;bottom:44px;z-index:7;display:flex;align-items:center;gap:6px;font-family:'Hand';font-weight:700;font-size:46px}}
.dark .next{{color:{NEON}}} .paper .next{{color:{PURPLE}}}
.pola{{position:absolute;background:#fff;padding:18px 18px 72px;box-shadow:0 22px 40px rgba(0,0,0,.28),0 2px 6px rgba(0,0,0,.2);z-index:4}}
.pola .ph{{width:100%;height:100%;background-size:cover;background-position:center}}
.pola .cap{{position:absolute;left:0;right:0;bottom:14px;text-align:center;font-family:'Hand';font-weight:700;font-size:42px;color:{NAVY}}}
.tape{{position:absolute;width:150px;height:46px;background:rgba(235,225,190,.82);box-shadow:0 2px 6px rgba(0,0,0,.18);z-index:8;
  clip-path:polygon(2% 0,98% 6%,100% 94%,0 100%)}}
.sticky{{position:absolute;background:{NEON};color:{NAVY};padding:20px 22px 22px;box-shadow:0 14px 26px rgba(0,0,0,.22);z-index:5}}
.sticky .n{{font-family:'Brico';font-weight:800;font-size:60px;letter-spacing:-.04em;line-height:1}}
.sticky .t{{font-family:'Hand';font-weight:700;font-size:32px;line-height:1.05;margin-top:6px}}
"""

BADGE = ('<svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/>'
         '<path d="M7 12.5l3.2 3.2L17 8.8" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')


# ---------------------------------------------------------------- rabiscos (SVG)
def scribble_circle(w, h, color, sw=6, style=""):
    return (f'<svg style="position:absolute;pointer-events:none;overflow:visible;{style}" width="{w}" height="{h}" viewBox="0 0 220 100" preserveAspectRatio="none">'
            f'<path d="M30 20 C 80 -4, 190 2, 208 40 C 224 78, 130 100, 62 92 C 8 86, -6 50, 26 26 C 40 14, 70 8, 96 8" '
            f'fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>')


def underline(w, color, sw=6, style=""):
    return (f'<svg style="position:absolute;pointer-events:none;overflow:visible;{style}" width="{w}" height="18" viewBox="0 0 300 18" preserveAspectRatio="none">'
            f'<path d="M3 11 C 50 3, 90 15, 140 8 S 230 4, 297 9" fill="none" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>')


def arrow(color, w=150, h=90, flip=False, rot=0, style=""):
    tr = f"transform:rotate({rot}deg) scaleX({-1 if flip else 1});"
    return (f'<svg style="position:absolute;pointer-events:none;overflow:visible;{tr}{style}" width="{w}" height="{h}" viewBox="0 0 170 100">'
            f'<path d="M6 80 C 30 20, 90 4, 150 46 M126 24 L152 48 L120 60" fill="none" stroke="{color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>')


def next_arrow(txt="arrasta"):
    return (f'<div class="next"><span>{txt}</span><svg width="86" height="40" viewBox="0 0 86 40"><path d="M4 22 C 24 12, 44 30, 78 18 M62 6 L80 18 L64 32" '
            f'fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>')


def hdr(n, avatar=True):
    av = '<div class="av"></div>' if avatar else ""
    return (f'<div class="hdr"><div class="who">{av}<div><div class="nm">{NAME} {BADGE}</div><div class="hd">{HANDLE}</div></div></div>'
            f'<div class="pg">{n}/{TOTAL}</div></div>')


def page(n, inner, cls="paper", nxt="arrasta", avatar=True, extra=""):
    nx = next_arrow(nxt) if nxt else ""
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>'
            f'<div class="slide {cls}">{extra}{hdr(n, avatar)}<div class="main">{inner}</div>{nx}<div class="grain"></div></div></body></html>')


def pola(img, x, y, w, h, rot, cap="", pos="center", tape_rot=-4):
    capd = f'<div class="cap">{cap}</div>' if cap else ""
    pad = 72 if cap else 18
    return (f'<div class="pola" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({rot}deg);padding-bottom:{pad}px">'
            f'<div class="ph" style="background-image:url({R}{img}.png);background-position:{pos}"></div>{capd}'
            f'<div class="tape" style="left:{w/2-75}px;top:-26px;transform:rotate({tape_rot}deg)"></div></div>')


# ---------------------------------------------------------------- slides
def s1():
    inner = f"""{pola('trophy', 4, 14, 770, 520, -3.5, '1º de fevereiro de 2027', 'center 20%')}
      <div style="height:560px;flex:none"></div>
      <h1 style="font-size:124px">O YouTube<br><span class="hl">vai mudar</span></h1>
      <div class="body" style="margin-top:26px;font-size:29px">A regra de monetização dos canais muda em <b>1º de fevereiro de 2027</b>, a primeira mudança relevante do programa desde 2018.</div>
      <div class="hand k" style="font-size:58px;margin-top:14px;position:relative;width:fit-content">E ela não afeta só quem está começando.</div>"""
    return page(1, inner, "dark", nxt="vem conferir")


def s2():
    lab = lambda t: f'<div class="hand" style="font-size:40px;line-height:1.05;opacity:.85">{t}</div>'
    num = lambda t, c=NAVY: f'<div style="font-family:Brico;font-weight:800;font-size:64px;letter-spacing:-.04em;line-height:1;color:{c}">{t}</div>'
    sub = lambda t: f'<div class="hand" style="font-size:32px;opacity:.6;margin-top:2px">{t}</div>'
    rows = f"""<div style="display:grid;grid-template-columns:230px 1fr 1fr;align-items:center;row-gap:0">
        <div></div><div class="hand" style="font-size:60px;opacity:.55;padding-left:8px">2026</div><div class="hand" style="font-size:60px;padding-left:36px;position:relative">2027<span class="hand k" style="position:absolute;left:150px;top:-26px;font-size:70px;transform:rotate(8deg)">2×</span></div>
        {lab('inscritos')}<div style="padding:26px 8px">{num('1.000')}</div><div style="padding:26px 36px">{num('1.000')}</div>
        {lab('horas de exibição')}<div style="padding:26px 8px">{num('4.000 h','#6a7390')}{sub('em 12 meses')}</div><div style="padding:26px 36px;position:relative">{num('8.000 h')}{sub('em 365 dias')}{scribble_circle(300,130,PURPLE,6,'left:12px;top:8px')}</div>
        {lab('ou views de Shorts')}<div style="padding:26px 8px">{num('10 mi','#6a7390')}{sub('em 90 dias')}</div><div style="padding:26px 36px;position:relative">{num('20 mi')}{sub('em 90 dias')}{scribble_circle(260,120,PURPLE,6,'left:12px;top:10px')}</div></div>"""
    inner = f"""<h1 style="font-size:122px">O que <span class="hl">muda?</span></h1>
      <div style="margin-top:34px;background:#fff;border-radius:6px;padding:26px 34px 22px 90px;position:relative;box-shadow:0 18px 40px rgba(20,37,68,.14);
        background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 71px,rgba(49,87,247,.18) 72px)">
        <div style="position:absolute;left:62px;top:0;bottom:0;width:3px;background:rgba(129,64,250,.35)"></div>{rows}</div>
      <div class="body" style="margin-top:44px;font-size:31px;position:relative"><p><b style="font-family:Brico;font-weight:800;font-size:42px;letter-spacing:-.03em;position:relative;display:inline-block">O dobro do requisito{underline(420,PURPLE,6,'left:0;bottom:-12px')}</b> para canais que vão pedir entrada.</p>
        <p style="margin-top:.7em">Quem já está no Programa de Parcerias <b>mantém o status.</b></p></div>
      <div class="src">Fonte: YouTube, 10/08/2026</div>"""
    return page(2, inner, "paper")


def s3():
    inner = f"""<div style="position:absolute;left:590px;top:14px;width:360px;height:360px;z-index:4;transform:rotate(3.5deg)">
        <div style="width:100%;height:100%;background:url({R}shorts_phones.png) center/cover;box-shadow:0 24px 44px rgba(0,0,0,.5)"></div>
        <div class="tape" style="left:110px;top:-24px;transform:rotate(3deg)"></div></div>
      <h1 style="font-size:112px;margin-top:6px;white-space:nowrap">E quem já<br><span class="hl">monetiza?</span></h1>
      <div style="height:150px;flex:none"></div>
      <div class="body" style="font-size:30px;line-height:1.42"><p>Existe uma <b>segunda mudança, menos comentada</b>, e ela vale para todos.</p>
        <p>A partir de 1º de fevereiro, para receber a receita de anúncios e assinaturas dos Shorts, o canal precisa de <b>10 milhões de visualizações qualificadas de Shorts nos últimos 90 dias</b>, em janela móvel.</p>
        <p>Quem ficar abaixo não precisa pedir entrada de novo, mas <b>não recebe a receita de Shorts</b> naquele período.</p></div>
      <div class="hand k" style="font-size:50px;margin-top:20px;position:relative">Vale conferir no YouTube Studio se há novos termos para aceitar até <span style="position:relative;display:inline-block;color:#fff">31/01/2027{scribble_circle(330,86,NEON,6,'left:-20px;top:-8px')}</span></div>
      <div class="src">Fonte: Digiday e guias do setor</div>"""
    return page(3, inner, "dark")


def s4():
    st = lambda n, t, x, y, rot, w=290: f'<div class="sticky" style="left:{x}px;top:{y}px;width:{w}px;transform:rotate({rot}deg)"><div class="n">{n}</div><div class="t">{t}</div></div>'
    inner = f"""{pola('shyamalan', 0, 266, 470, 270, -5, '', 'center', 3)}{pola('kevin', 454, 286, 490, 280, 4, '', 'center', -3)}
      <h1 style="font-size:100px">Por que o<br>YouTube <span class="hl">fez isso?</span></h1>
      <div style="height:330px;flex:none"></div>
      {st('3 mi+','criadores no programa',0,574,-3)}{st('2018','última mudança grande',328,586,2.5)}{st('2027','paga mais que 2026, diz o YouTube',662,572,-2)}
      <div style="height:196px;flex:none"></div>
      <div class="body" style="font-size:25px;line-height:1.38"><p>O YouTube diz que os ajustes refletem o <b>crescimento do ecossistema</b>: o programa já tem mais de 3 milhões de criadores, e a última mudança grande foi em 2018.</p>
        <p>A plataforma também diz esperar <b>pagar mais aos criadores em 2027</b> do que em 2026 e prepara novos programas de incentivo, como o bônus de Shorts por constância, hoje em teste.</p></div>
      <div class="hand k" style="font-size:42px;margin-top:14px;position:relative;width:fit-content">Na prática, o YouTube está trocando volume por qualidade de quem monetiza.</div>"""
    return page(4, inner, "paper", nxt="arrasta")


def s5():
    inner = f"""<h1 style="font-size:106px">A régua em<br><span class="hl">números</span> por dia</h1>
      <div class="hand" style="font-size:44px;margin-top:34px;opacity:.85">Piso dos Shorts · quem já monetiza · cerca de</div>
      <div style="position:relative;width:fit-content"><div style="font-family:Brico;font-weight:800;font-size:236px;letter-spacing:-.06em;line-height:.95;color:{NEON};text-shadow:0 0 60px rgba(226,252,81,.25)">110 mil</div>
        {underline(640,NEON,8,'left:6px;bottom:-4px')}</div>
      <div class="body" style="margin-top:22px;font-size:32px"><b>visualizações qualificadas por dia</b>, todo dia, durante 90 dias.</div>
      <div class="hand" style="font-size:44px;margin-top:50px;opacity:.85">Entrada de um canal novo · cerca de</div>
      <div style="display:flex;align-items:baseline;gap:22px;position:relative">
        <div style="font-family:Brico;font-weight:800;font-size:128px;letter-spacing:-.05em;line-height:1">22 h</div>
        <div class="hand k" style="font-size:60px">ou</div>
        <div style="font-family:Brico;font-weight:800;font-size:128px;letter-spacing:-.05em;line-height:1">222 mil</div></div>
      <div class="body" style="margin-top:12px;font-size:30px">de <b>exibição por dia</b>, ou <b>views de Shorts por dia</b>.</div>
      <div class="src">Fonte: vidIQ</div>"""
    return page(5, inner, "dark")


def s6():
    inner = f"""<div style="display:flex;align-items:flex-start;gap:26px;margin-top:6px">
        <div style="width:150px;height:150px;border-radius:50%;background:url({A}avatar.png) center/cover;border:5px solid {NAVY};flex:none;margin-top:60px"></div>
        <div style="position:relative;background:{NAVY};color:#fff;border-radius:46px 46px 46px 10px;padding:34px 40px 40px;box-shadow:0 20px 40px rgba(20,37,68,.25)">
          <div class="hand" style="font-size:44px;color:{NEON};opacity:.95">Minha leitura:</div>
          <h1 style="font-size:76px;margin-top:6px">canal monetizado vai ficar <span class="hl">mais escasso.</span></h1></div></div>
      <div class="body" style="margin-top:38px;font-size:31px"><p>Quanto mais difícil entrar, <b>mais valem os canais que já estão dentro.</b> Mas estar dentro não basta: o piso dos Shorts exige <b>acompanhar os dados toda semana.</b></p>
        <p>Para podcasts, grupos de mídia e canais com cortes, o Shorts continua sendo porta de descoberta.</p></div>
      {pola('bench', 530, 770, 420, 260, 4, '', 'center', -3)}
      <div class="hand k" style="font-size:64px;margin-top:34px;width:500px;position:relative">Só vira receita acima do piso.{underline(430,PURPLE,7,'left:0;bottom:-30px')}</div>"""
    return page(6, inner, "paper", avatar=False)


def s7():
    inner = f"""<div style="display:flex;align-items:flex-end;gap:24px;margin-top:-6px">
        <div style="font-family:Brico;font-weight:800;font-size:400px;letter-spacing:-.08em;line-height:.8;color:{NEON};text-shadow:0 0 70px rgba(226,252,81,.22)">70</div>
        <h1 style="font-size:80px;padding-bottom:10px">dias para<br>1º de<br><span class="hl">fevereiro.</span></h1></div>
      <div class="body" style="margin-top:44px;font-size:30px"><p>Quem tem audiência precisa chegar lá <b>com os dados na mão:</b> horas, Shorts, retenção e termos aceitos.</p>
        <p>A <b>One Big Media</b> acompanha cada mudança do YouTube de perto, com equipe certificada pela plataforma, e estrutura a estratégia do canal para as novas regras.</p></div>
      <div style="position:relative;margin-top:40px;width:690px;transform:rotate(-2.5deg)">
        <img src="{R}obm_profile.png" style="display:block;width:100%;border-radius:22px;border:2px solid rgba(255,255,255,.25);box-shadow:0 28px 54px rgba(0,0,0,.55)">
        <div class="tape" style="left:270px;top:-26px;transform:rotate(-2deg)"></div></div>
      <img src="{A}logo_white.png" style="position:absolute;right:66px;bottom:50px;height:120px;width:auto;opacity:.9;z-index:7">"""
    return page(7, inner, "dark", nxt="")


SLIDES = [s1, s2, s3, s4, s5, s6, s7]


def main():
    out = os.path.join(HERE, "out"); os.makedirs(out, exist_ok=True)
    tmp = os.path.join(out, "_html"); os.makedirs(tmp, exist_ok=True)
    for i, fn in enumerate(SLIDES, 1):
        open(f"{tmp}/s{i:02d}.html", "w").write(fn())
    env = {**os.environ, "NODE_PATH": subprocess.check_output(["npm", "root", "-g"]).decode().strip()}
    subprocess.check_call(["node", os.path.join(HERE, "shot.js"), tmp, out], env=env)
    from PIL import Image
    ims = [Image.open(f"{out}/slide-{i:02d}.png").convert("RGB") for i in range(1, len(SLIDES) + 1)]
    ims[0].save(f"{out}/carrossel.pdf", save_all=True, append_images=ims[1:], resolution=150)


if __name__ == "__main__":
    main()
