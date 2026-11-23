"""
Modelo OBM "Marca-texto" v3 — carrossel do Leno (One Big Media).

Sistema próprio, inspirado (sem copiar) nas referências de carrosséis de creators/artistas:
  • Fotos recortadas na MÁSCARA da marca (forma do ícone, do manual de ID visual) + contorno deslocado.
  • Destaque de palavras com MARCA-TEXTO neon ("Neon Marker" da marca) em vez de só trocar a cor da fonte.
  • Tipografia da marca: DM Sans (800 nos títulos em caixa baixa/alta natural, 400 no corpo).
  • Cabeçalho com ícone One Big Media + @, barra de progresso segmentada e chip "Arrasta" no rodapé.
  • Blocos próprios: tabela em colunas, números gigantes, contagem regressiva, cards de dado.
  • Ritmo alternando fundo escuro (navy quase preto com grade de pontos) e claro (cinza da marca).

Cores (Manual ID Visual 1BMG): Navy #142544 · Vibrancy Blue #3157F7 · Bright Purple #8140FA · Neon Marker #E2FC51
· Azul claro #79AAF7 · Cinza #E8E8E9. Cor só em destaques: marca-texto, números, contornos.

Uso:  python3 build.py   ->  out/slide-XX.png (1080x1350) e out/carrossel.pdf
"""
import os, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
A = f"file://{HERE}/assets/"
R = f"file://{HERE}/assets/refs/"
F = f"file://{HERE}/fonts/"

HANDLE = "@reinaldoheleno"
NAVY, BLUE, PURPLE, NEON, SKY, GRAY = "#142544", "#3157F7", "#8140FA", "#E2FC51", "#79AAF7", "#E8E8E9"
TOTAL = 7

fonts = "".join(
    f"@font-face{{font-family:'DM Sans';font-weight:{w};font-style:normal;src:url('{F}dm-sans-latin-{w}-normal.woff2') format('woff2');}}"
    for w in (400, 500, 600, 700, 800, 900)
) + "".join(
    f"@font-face{{font-family:'DM Sans';font-weight:{w};font-style:italic;src:url('{F}dm-sans-latin-{w}-italic.woff2') format('woff2');}}"
    for w in (600, 700))

CSS = fonts + f"""
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1350px;background:#000}}
.slide{{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:'DM Sans',sans-serif;color:#fff;
  display:flex;flex-direction:column;padding:60px 68px 54px}}
.dark{{background:radial-gradient(circle,rgba(255,255,255,.07) 1.4px,transparent 1.6px) 0 0/34px 34px,
  radial-gradient(90% 55% at 100% 0%,#1b2a5c 0%,rgba(20,37,68,0) 70%),#0a0e1a}}
.light{{background:radial-gradient(circle,rgba(20,37,68,.10) 1.4px,transparent 1.6px) 0 0/34px 34px,{GRAY};color:{NAVY}}}
.gfx{{position:absolute;background-repeat:no-repeat;background-size:contain;pointer-events:none;z-index:0}}
.top{{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;height:54px;flex:none}}
.who{{display:flex;align-items:center;gap:14px;font-size:25px;font-weight:500;letter-spacing:-.2px}}
.who .ic{{height:44px;width:auto}} .light .who .ic{{filter:invert(1)}}
.tag{{font-size:19px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:9px 18px;border-radius:99px;
  border:1.5px solid rgba(255,255,255,.4);color:rgba(255,255,255,.85)}}
.light .tag{{border-color:rgba(20,37,68,.4);color:{NAVY}}}
.main{{position:relative;z-index:3;flex:1;display:flex;flex-direction:column;min-height:0;padding-top:30px}}
h1{{font-weight:800;letter-spacing:-.04em;line-height:1.12}}
.mk{{background:{NEON};color:{NAVY};padding:.0em .14em .04em;border-radius:.12em;-webkit-box-decoration-break:clone;box-decoration-break:clone}}
.body{{font-size:30px;line-height:1.42;font-weight:400;color:rgba(255,255,255,.88)}}
.body b{{font-weight:700;color:#fff}}
.body p+p{{margin-top:.6em}}
.light .body{{color:#2b3550}} .light .body b{{color:{NAVY}}}
.call{{border-left:9px solid {NEON};padding:2px 0 2px 24px;font-weight:700;letter-spacing:-.01em;line-height:1.2;color:#fff}}
.light .call{{border-left-color:{PURPLE};color:{NAVY}}}
.src{{font-size:21px;color:rgba(255,255,255,.5);margin-top:14px}} .light .src{{color:#5d6784}}
.bot{{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;height:58px;margin-top:auto;flex:none}}
.prog{{display:flex;gap:8px;align-items:center}}
.prog i{{display:block;width:38px;height:7px;border-radius:4px;background:rgba(255,255,255,.22)}}
.prog i.on{{background:{NEON}}} .prog i.cur{{width:64px}}
.light .prog i{{background:rgba(20,37,68,.2)}} .light .prog i.on{{background:{NAVY}}}
.chip{{display:flex;align-items:center;gap:12px;height:54px;padding:0 24px;border-radius:99px;font-size:22px;font-weight:700;
  background:rgba(255,255,255,.12);color:#fff}}
.light .chip{{background:rgba(20,37,68,.1);color:{NAVY}}}
.chip.f{{background:{NEON};color:{NAVY}}}
.panel{{border-radius:30px;padding:30px 34px}}
.lbl{{font-size:20px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6)}}
.light .lbl{{color:#5d6784}}
"""

BADGE = ('<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/>'
         '<path d="M7 12.5l3.2 3.2L17 8.8" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')
ARROW = ('<svg width="34" height="16" viewBox="0 0 34 16"><path d="M2 8h28M23 2l7 6-7 6" stroke="currentColor" stroke-width="2.6" '
         'fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')

# forma da máscara da marca (ícone "sombra sólida", manual p.21), normalizada 0-1
MASK = "M0 .07 L.40 0 L.47 .13 L.80 .07 L1 .58 Q1 .73 .88 .80 L.60 .97 Q.32 1.07 .10 .91 Q0 .83 0 .70 Z"


def mask(name, w, h, ring=NEON, pos="xMidYMid", dx=24, dy=20):
    cid = f"m{name}{w}"
    return (f'<svg width="{w+dx}" height="{h+dy}" viewBox="0 0 {w+dx} {h+dy}" style="display:block;overflow:visible;flex:none">'
            f'<defs><clipPath id="{cid}" clipPathUnits="objectBoundingBox"><path d="{MASK}"/></clipPath></defs>'
            f'<g transform="translate({dx},{dy}) scale({w},{h})"><path d="{MASK}" fill="none" stroke="{ring}" stroke-width="3" vector-effect="non-scaling-stroke"/></g>'
            f'<image href="{R}{name}.png" x="0" y="0" width="{w}" height="{h}" preserveAspectRatio="{pos} slice" clip-path="url(#{cid})"/></svg>')


def top(n, tag="YouTube 2027"):
    return (f'<div class="top"><div class="who"><img class="ic" src="{A}icon_white.png">{HANDLE} {BADGE}</div>'
            f'<div class="tag">{tag}</div></div>')


def bot(n, chip="Arrasta", filled=False):
    segs = "".join(f'<i class="{"on cur" if i==n else ("on" if i<n else "")}"></i>' for i in range(1, TOTAL + 1))
    c = f'<div class="chip{" f" if filled else ""}">{chip}{ARROW}</div>' if chip else ""
    return f'<div class="bot"><div class="prog">{segs}</div>{c}</div>'


def page(n, inner, cls="dark", gfx="", chip="Arrasta", filled=False, tag="YouTube 2027"):
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>'
            f'<div class="slide {cls}">{gfx}{top(n, tag)}<div class="main">{inner}</div>{bot(n, chip, filled)}</div></body></html>')


def line(img, x, y, w, h, rot=0, op=.12):
    return f'<div class="gfx" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;background-image:url({A}{img});transform:rotate({rot}deg);opacity:{op}"></div>'


def sticker(txt, sub, x, y, rot=-6, bg=PURPLE, fg="#fff"):
    return (f'<div style="position:absolute;left:{x}px;top:{y}px;transform:rotate({rot}deg);background:{bg};color:{fg};padding:14px 24px;'
            f'border-radius:18px;box-shadow:0 14px 34px rgba(0,0,0,.35);z-index:6"><div style="font-size:17px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.9">{sub}</div>'
            f'<div style="font-size:42px;font-weight:900;letter-spacing:-.03em;line-height:1.05">{txt}</div></div>')


# ---------------------------------------------------------------- slides
def s1():
    inner = f"""<div style="position:relative;height:590px;flex:none;margin:0 0 0 -8px">
        {mask('trophy', 900, 550, NEON, 'xMidYMin')}{sticker('1º FEV 2027','a partir de',640,-6,5)}</div>
      <h1 style="font-size:124px;margin-top:14px;line-height:1.1">O YouTube<br><span class="mk">vai mudar</span></h1>
      <div class="body" style="margin-top:34px;font-size:29px">A regra de monetização dos canais muda em <b>1º de fevereiro de 2027</b>, a primeira mudança relevante do programa desde 2018.</div>
      <div class="call" style="margin-top:26px;font-size:34px">E ela não afeta só quem está começando.</div>"""
    return page(1, inner, "dark", line("icon_line_lilac.png", 620, 700, 560, 760, 12, .10), chip="Vem conferir", filled=True)


def s2():
    cell = lambda big, sub, hot=False: (f'<div style="padding:32px 0;text-align:left"><div style="font-size:{58 if hot else 54}px;font-weight:900;letter-spacing:-.04em;line-height:1;'
                                         f'color:{NEON if hot else NAVY}">{big}</div><div style="font-size:21px;font-weight:500;margin-top:6px;color:{"rgba(255,255,255,.7)" if hot else "#5d6784"}">{sub}</div></div>')
    lab = lambda t: f'<div class="lbl" style="padding:32px 0;display:flex;align-items:center;line-height:1.3">{t}</div>'
    row = lambda *c: "".join(c)
    grid = f"""<div style="position:relative;display:grid;grid-template-columns:200px 1fr 1fr;column-gap:0;margin-top:74px">
      <div style="position:absolute;right:0;top:-26px;bottom:-26px;width:calc(50% - 100px + 0px);background:{NAVY};border-radius:30px;box-shadow:0 24px 50px rgba(20,37,68,.35)"></div>
      <div></div><div style="font-size:54px;font-weight:900;letter-spacing:-.04em;color:#8a93ad;padding:0 0 8px 24px;position:relative">2026</div>
      <div style="font-size:54px;font-weight:900;letter-spacing:-.04em;color:{NEON};padding:0 0 8px 40px;position:relative">2027<span style="position:absolute;right:-6px;top:-34px;background:{NEON};color:{NAVY};font-size:28px;padding:4px 16px;border-radius:99px;transform:rotate(6deg);letter-spacing:-.02em">2×</span></div>
      {lab('Inscritos')}<div style="padding:0 0 0 24px;position:relative">{cell('1.000','inscritos')}</div><div style="padding:0 0 0 40px;position:relative">{cell('1.000','inscritos',True)}</div>
      {lab('Horas de exibição')}<div style="padding:0 0 0 24px;border-top:2px solid rgba(20,37,68,.15);position:relative">{cell('4.000 h','em 12 meses')}</div><div style="padding:0 0 0 40px;border-top:2px solid rgba(255,255,255,.18);position:relative">{cell('8.000 h','em 365 dias',True)}</div>
      {lab('ou views de Shorts')}<div style="padding:0 0 0 24px;border-top:2px solid rgba(20,37,68,.15);position:relative">{cell('10 mi','em 90 dias')}</div><div style="padding:0 0 0 40px;border-top:2px solid rgba(255,255,255,.18);position:relative">{cell('20 mi','em 90 dias',True)}</div></div>"""
    inner = f"""<h1 style="font-size:122px">O que <span class="mk">muda?</span></h1>
      {grid}
      <div class="body" style="margin-top:66px;font-size:31px"><p><b style="font-size:38px;letter-spacing:-.02em">O dobro do requisito</b> para canais que vão pedir entrada.</p>
        <p>Quem já está no Programa de Parcerias <b>mantém o status.</b></p></div>
      <div class="src">Fonte: YouTube, 10/08/2026</div>"""
    return page(2, inner, "light", line("icon_line_purple.png", 640, 760, 520, 700, 12, .13))


def s3():
    inner = f"""<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-top:-6px">
        <h1 style="font-size:108px;margin-top:20px;white-space:nowrap;line-height:1.12">E quem já<br><span class="mk">monetiza?</span></h1>
        <div style="position:relative;margin-right:-22px;margin-top:10px">{mask('shorts_phones', 360, 350, NEON, 'xMidYMid', 22, 18)}</div></div>
      <div class="body" style="margin-top:34px;font-size:31px;line-height:1.42"><p>Existe uma <b>segunda mudança, menos comentada</b>, e ela vale para todos.</p>
        <p>A partir de 1º de fevereiro, para receber a receita de anúncios e assinaturas dos Shorts, o canal precisa de <b>10 milhões de visualizações qualificadas de Shorts nos últimos 90 dias</b>, em janela móvel.</p>
        <p>Quem ficar abaixo não precisa pedir entrada de novo, mas <b>não recebe a receita de Shorts</b> naquele período.</p></div>
      <div class="call" style="margin-top:30px;font-size:34px">Vale conferir no YouTube Studio se há novos termos para aceitar até <span class="mk" style="padding:0 .12em">31/01/2027</span>.</div>
      <div class="src">Fonte: Digiday e guias do setor</div>"""
    return page(3, inner, "dark", line("icon_line_blue.png", -170, 760, 480, 650, -10, .14))


def s4():
    chip = lambda big, sub: (f'<div style="flex:1;border:1.5px solid rgba(255,255,255,.22);border-radius:22px;padding:16px 22px;background:rgba(255,255,255,.04)">'
                             f'<div style="font-size:52px;font-weight:900;letter-spacing:-.04em;line-height:1;color:{NEON}">{big}</div>'
                             f'<div style="font-size:19px;font-weight:500;color:rgba(255,255,255,.7);margin-top:6px;line-height:1.25">{sub}</div></div>')
    inner = f"""<h1 style="font-size:100px">Por que o<br>YouTube <span class="mk">fez isso?</span></h1>
      <div style="position:relative;height:300px;margin-top:26px;flex:none">
        <div style="position:absolute;left:-6px;top:0">{mask('shyamalan', 500, 262, PURPLE, 'xMidYMid', 18, 16)}</div>
        <div style="position:absolute;left:430px;top:34px">{mask('kevin', 520, 262, NEON, 'xMidYMid', 18, 16)}</div></div>
      <div style="display:flex;gap:14px;margin-top:8px">{chip('3 mi+','criadores no programa')}{chip('2018','última mudança grande')}{chip('2027','paga mais que 2026, diz o YouTube')}</div>
      <div class="body" style="margin-top:24px;font-size:26px;line-height:1.38"><p>O YouTube diz que os ajustes refletem o <b>crescimento do ecossistema</b>: o programa já tem mais de 3 milhões de criadores, e a última mudança grande foi em 2018.</p>
        <p>A plataforma também diz esperar <b>pagar mais aos criadores em 2027</b> do que em 2026 e prepara novos programas de incentivo, como o bônus de Shorts por constância, hoje em teste.</p></div>
      <div class="call" style="margin-top:18px;font-size:30px">Na prática, o YouTube está trocando volume por qualidade de quem monetiza.</div>"""
    return page(4, inner, "dark", line("icon_line_lilac.png", 700, 40, 460, 620, 14, .08))


def s5():
    inner = f"""<h1 style="font-size:112px">A régua em<br><span class="mk">números</span> por dia</h1>
      <div class="panel" style="background:{NAVY};margin-top:54px;padding:44px 40px 42px;position:relative;box-shadow:0 24px 50px rgba(20,37,68,.3)">
        <div class="lbl">Piso dos Shorts · quem já monetiza</div>
        <div style="display:flex;align-items:baseline;gap:20px;margin-top:6px"><div style="font-size:34px;font-weight:500;color:rgba(255,255,255,.75)">cerca de</div>
          <div style="font-size:196px;font-weight:900;letter-spacing:-.06em;line-height:1;color:{NEON}">110 mil</div></div>
        <div style="font-size:28px;font-weight:500;color:#fff;line-height:1.3;margin-top:-4px"><b>visualizações qualificadas por dia</b>, todo dia, durante 90 dias.</div></div>
      <div class="panel" style="background:#fff;margin-top:30px;padding:44px 40px 46px;box-shadow:0 16px 40px rgba(20,37,68,.12)">
        <div class="lbl">Entrada · canal novo · cerca de</div>
        <div style="display:flex;align-items:center;gap:14px;margin-top:10px">
          <div style="flex:1"><div style="font-size:112px;font-weight:900;letter-spacing:-.05em;line-height:1;color:{PURPLE}">22 h</div><div style="font-size:27px;font-weight:600;margin-top:6px;color:{NAVY}">de exibição por dia</div></div>
          <div style="font-size:28px;font-weight:800;color:#8a93ad">ou</div>
          <div style="flex:1.25"><div style="font-size:112px;font-weight:900;letter-spacing:-.05em;line-height:1;color:{PURPLE}">222 mil</div><div style="font-size:27px;font-weight:600;margin-top:6px;color:{NAVY}">views de Shorts por dia</div></div></div></div>
      <div class="src" style="margin-top:26px">Fonte: vidIQ</div>"""
    return page(5, inner, "light", line("icon_line_purple.png", 700, 20, 440, 600, 10, .12))


def s6():
    inner = f"""<div style="font-size:200px;font-weight:900;line-height:.6;height:96px;color:{NEON};margin-top:12px">“</div>
      <div class="lbl" style="margin-top:14px">Minha leitura</div>
      <h1 style="font-size:96px;margin-top:14px">Canal monetizado vai ficar <span class="mk">mais escasso.</span></h1>
      <div class="body" style="margin-top:30px;font-size:29px"><p>Quanto mais difícil entrar, <b>mais valem os canais que já estão dentro.</b> Mas estar dentro não basta: o piso dos Shorts exige <b>acompanhar os dados toda semana.</b></p>
        <p>Para podcasts, grupos de mídia e canais com cortes, o Shorts continua sendo porta de descoberta.</p></div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-top:26px">
        <div class="call" style="font-size:44px;width:460px;letter-spacing:-.03em;line-height:1.1">Só vira receita acima do piso.</div>
        <div style="margin-right:-18px">{mask('bench', 470, 250, PURPLE, 'xMidYMid', 20, 18)}</div></div>"""
    return page(6, inner, "dark", line("icon_line_lilac.png", 640, -60, 520, 700, 14, .09))


def s7():
    inner = f"""<div style="display:flex;align-items:flex-end;gap:26px;margin-top:-4px">
        <div style="font-size:400px;font-weight:900;letter-spacing:-.08em;line-height:.78;color:{NEON};text-shadow:0 0 70px rgba(226,252,81,.28)">70</div>
        <h1 style="font-size:80px;padding-bottom:8px;line-height:1.12">dias para<br>1º de<br><span class="mk">fevereiro.</span></h1></div>
      <div class="body" style="margin-top:34px;font-size:29px"><p>Quem tem audiência precisa chegar lá <b>com os dados na mão:</b> horas, Shorts, retenção e termos aceitos.</p>
        <p>A <b>One Big Media</b> acompanha cada mudança do YouTube de perto, com equipe certificada pela plataforma, e estrutura a estratégia do canal para as novas regras.</p></div>
      <div style="position:relative;margin-top:30px;transform:rotate(-2deg);width:700px;border-radius:24px;overflow:hidden;border:2px solid rgba(255,255,255,.25);box-shadow:0 30px 60px rgba(0,0,0,.5)">
        <img src="{R}obm_profile.png" style="display:block;width:100%"></div>
      <img src="{A}logo_white.png" style="position:absolute;right:0;bottom:6px;height:150px;width:auto;opacity:.95">"""
    return page(7, inner, "dark", line("icon_line_neon.png", 560, 620, 600, 800, 10, .10), chip="")


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
