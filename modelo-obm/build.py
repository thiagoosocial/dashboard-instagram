"""
Modelo OBM Editorial — novo design de carrossel para o Leno (One Big Media).

Identidade visual (Manual ID Visual 1BMG, set/2021):
  Navy Blue #142544 · Vibrancy Blue #3157F7 · Bright Purple #8140FA · Neon Marker #E2FC51
  Tipografia: Cera Black/Bold (títulos) + DM Sans (corpo). Cera é fonte comercial e não está
  disponível aqui, então usamos DM Sans (fonte secundária oficial do manual) em todo o modelo.
  Grafismo: ícone em linha da marca sobre fundos preenchidos.

Referências de layout: carrosséis de @joaoadolfooficial (capa/telas escuras, título forte com
palavra em destaque, divisor curto, corpo leve com negrito, frase em itálico, botão-seta) e
carrosséis editoriais (kicker, texto em hierarquia, pills, cards).

Uso:  python3 build.py   ->  gera out/slide-XX.png (1080x1350) e out/carrossel.pdf
"""
import os, json, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
A = f"file://{HERE}/assets/"
F = f"file://{HERE}/fonts/"

HANDLE = "@reinaldoheleno"
NAVY, BLUE, PURPLE, NEON, GRAY = "#142544", "#3157F7", "#8140FA", "#E2FC51", "#E8E8E9"

fonts = "".join(
    f"@font-face{{font-family:'DM Sans';font-weight:{w};font-style:normal;src:url('{F}dm-sans-latin-{w}-normal.woff2') format('woff2');}}"
    for w in (400, 500, 600, 700, 800, 900)
) + "".join(
    f"@font-face{{font-family:'DM Sans';font-weight:{w};font-style:italic;src:url('{F}dm-sans-latin-{w}-italic.woff2') format('woff2');}}"
    for w in (600, 700)
)

CSS = fonts + f"""
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1350px;background:{NAVY}}}
.slide{{position:relative;width:1080px;height:1350px;overflow:hidden;color:#fff;font-family:'DM Sans',sans-serif;
  padding:64px 80px 64px 80px;display:flex;flex-direction:column}}
.bg-navy{{background:linear-gradient(118deg,{NAVY} 30%,#3a2a9a 78%,{PURPLE} 100%)}}
.bg-navy2{{background:linear-gradient(200deg,{NAVY} 35%,#2b2f8f 100%)}}
.bg-purple{{background:linear-gradient(160deg,{PURPLE} 0%,#5a2bd9 55%,{NAVY} 130%)}}
.glow{{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}}
.gfx{{position:absolute;background-repeat:no-repeat;background-size:contain;pointer-events:none}}
.head{{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;height:64px;flex:none}}
.who{{display:flex;align-items:center;gap:16px}}
.av{{width:60px;height:60px;border-radius:50%;background:url('{A}avatar.png') center/cover;border:2px solid rgba(255,255,255,.35)}}
.hd{{font-size:26px;font-weight:500;letter-spacing:-.2px;display:flex;align-items:center;gap:8px}}
.pill{{font-size:21px;font-weight:700;letter-spacing:3px;padding:10px 20px;border-radius:99px;background:{NEON};color:{NAVY}}}
.pill.o{{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.55)}}
.main{{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;min-height:0;padding-top:34px}}
.title{{font-weight:900;text-transform:uppercase;letter-spacing:-0.035em;line-height:.93}}
.title em{{font-style:normal;color:{NEON}}}
.rule{{width:132px;height:5px;border-radius:3px;background:{NEON};margin:34px 0 30px}}
.body{{font-size:35px;line-height:1.38;font-weight:400;color:rgba(255,255,255,.9);letter-spacing:-.1px}}
.body b{{font-weight:800;color:#fff}}
.body p+p{{margin-top:.62em}}
.acc{{font-style:italic;font-weight:600;color:{NEON}}}
.src{{font-size:23px;font-weight:500;color:rgba(255,255,255,.55);margin-top:26px;letter-spacing:.2px}}
.card{{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.16);border-radius:30px;backdrop-filter:blur(2px)}}
.foot{{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;height:70px;flex:none}}
.seal{{height:40px;opacity:.85}}
.btn{{display:flex;align-items:center;justify-content:center;height:68px;min-width:170px;padding:0 34px;border-radius:99px;border:2.5px solid #fff;font-size:26px;font-weight:700;gap:14px}}
.btn.f{{background:{NEON};border-color:{NEON};color:{NAVY}}}
"""

BADGE = ('<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/>'
         '<path d="M7 12.5l3.2 3.2L17 8.8" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')
ARROW = ('<svg width="56" height="22" viewBox="0 0 56 22"><path d="M2 11h50M42 2l10 9-10 9" stroke="currentColor" '
         'stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')


def gfx(img, x, y, w, h, rot=0, op=1):
    return (f'<div class="gfx" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;'
            f'background-image:url({A}{img});transform:rotate({rot}deg);opacity:{op}"></div>')


def glow(x, y, d, c, op=.5):
    return f'<div class="glow" style="left:{x}px;top:{y}px;width:{d}px;height:{d}px;background:{c};opacity:{op}"></div>'


def frame(n, total, body, bg="bg-navy", decor="", footer="arrow"):
    counter = f'<div class="pill">{n:02d}/{total:02d}</div>'
    if footer == "arrow":
        foot_r = f'<div class="btn">{ARROW}</div>'
    elif isinstance(footer, str) and footer.startswith("cta:"):
        foot_r = f'<div class="btn f">{footer[4:]}{ARROW}</div>'
    else:
        foot_r = ""
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>
<div class="slide {bg}">{decor}
<div class="head"><div class="who"><div class="av"></div><div class="hd">{HANDLE} {BADGE}</div></div>{counter}</div>
<div class="main">{body}</div>
<div class="foot"><img class="seal" src="{A}seal_white.png">{foot_r}</div>
</div></body></html>"""


# ---------------------------------------------------------------- slide types
def play_icon(w, color=NEON, tri=NAVY):
    h = int(w * 0.72)
    return (f'<svg width="{w}" height="{h}" viewBox="0 0 150 108"><rect width="150" height="108" rx="30" fill="{color}"/>'
            f'<path d="M60 30l46 24-46 24z" fill="{tri}" stroke="{tri}" stroke-width="8" stroke-linejoin="round"/></svg>')


def cover(n, total, title_white, title_neon, body, accent, cta, tag):
    decor = (glow(560, 60, 560, PURPLE, .55) + glow(-160, 700, 420, BLUE, .35)
             + gfx("icon_line_neon.png", 520, 100, 470, 640, 8, .9)
             + gfx("icon_line_lilac.png", 40, 560, 300, 400, -10, .35))
    visual = f"""<div style="position:relative;height:430px;margin-top:6px">
      <div style="position:absolute;left:10px;top:70px;transform:rotate(-7deg);filter:drop-shadow(0 26px 50px rgba(0,0,0,.45))">{play_icon(480)}</div>
      <div class="card" style="position:absolute;right:0;top:250px;padding:22px 34px;background:{PURPLE};border-color:rgba(255,255,255,.3);transform:rotate(3deg)">
        <div style="font-size:21px;font-weight:700;letter-spacing:3px;opacity:.85">{tag[0]}</div>
        <div style="font-size:58px;font-weight:900;letter-spacing:-1.5px;line-height:1.05">{tag[1]}</div></div></div>"""
    html = f"""{visual}
    <div class="title" style="font-size:134px;margin-top:6px">{title_white}<br><em>{title_neon}</em></div>
    <div class="rule" style="margin:30px 0 26px"></div>
    <div class="body" style="font-size:34px">{body}</div>
    <div class="body acc" style="font-size:38px;margin-top:18px">{accent}</div>"""
    return frame(n, total, html, "bg-navy", decor, footer=f"cta:{cta}")


def table(n, total):
    def cell(big, sub, hot=False, dim=False):
        c = NEON if hot else ("rgba(255,255,255,.55)" if dim else "#fff")
        return (f'<div><div style="font-size:62px;font-weight:900;letter-spacing:-2px;color:{c};line-height:1">{big}</div>'
                f'<div style="font-size:21px;font-weight:600;color:rgba(255,255,255,.6);margin-top:8px">{sub}</div></div>')
    head = lambda t: f'<div style="font-size:19px;font-weight:700;letter-spacing:2.5px;color:rgba(255,255,255,.55)">{t}</div>'
    row26 = f'''<div style="display:grid;grid-template-columns:150px 1fr 1.3fr 1.3fr;gap:14px;align-items:center;padding:36px 34px">
      <div style="font-size:56px;font-weight:900;color:rgba(255,255,255,.45)">2026</div>
      {cell("1.000","inscritos",dim=True)}{cell("4.000 h","em 12 meses",dim=True)}{cell("10 mi","views de Shorts em 90 dias",dim=True)}</div>'''
    row27 = f'''<div style="display:grid;grid-template-columns:150px 1fr 1.3fr 1.3fr;gap:14px;align-items:center;padding:36px 34px;position:relative;
      background:rgba(226,252,81,.08);border:2.5px solid {NEON};border-radius:30px;margin:0 -2px">
      <div style="font-size:56px;font-weight:900;color:{NEON}">2027</div>
      {cell("1.000","inscritos")}{cell("8.000 h","em 365 dias",hot=True)}{cell("20 mi","views de Shorts em 90 dias",hot=True)}
      <div style="position:absolute;right:26px;top:-28px;background:{NEON};color:{NAVY};font-weight:900;font-size:30px;padding:6px 20px;border-radius:99px;letter-spacing:-.5px">2×</div></div>'''
    html = f"""<div class="title" style="font-size:128px">O QUE <em>MUDA?</em></div>
    <div class="card" style="margin-top:44px;padding:28px 0 0">
      <div style="display:grid;grid-template-columns:150px 1fr 1.3fr 1.3fr;gap:14px;padding:0 34px 4px">
        <div></div>{head("INSCRITOS")}{head("HORAS DE EXIBIÇÃO")}{head("OU SHORTS")}</div>
      {row26}<div style="padding:0 14px 14px">{row27}</div></div>
    <div class="body" style="margin-top:40px;font-size:38px"><p><b>O dobro do requisito</b> para canais que vão pedir entrada.</p>
      <p>Quem já está no Programa de Parcerias <b>mantém o status.</b></p></div>
    <div class="src">Fonte: YouTube, 10/08/2026</div>"""
    decor = glow(640, -100, 560, PURPLE, .5) + gfx("icon_line_purple.png", 700, 860, 520, 700, 12, .35)
    return frame(n, total, html, "bg-navy2", decor)


def window_visual():
    ticks = "".join(
        f'<div style="flex:1;height:{44 if i%6==0 else 30}px;border-radius:3px;background:{NEON if i>=18 else "rgba(255,255,255,.22)"}"></div>'
        for i in range(30))
    return f"""<div class="card" style="padding:26px 30px;margin-top:34px">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <div style="font-size:54px;font-weight:900;letter-spacing:-1.5px;color:{NEON}">10 mi</div>
        <div style="font-size:21px;font-weight:700;letter-spacing:2.5px;color:rgba(255,255,255,.65)">JANELA MÓVEL · 90 DIAS</div></div>
      <div style="display:flex;gap:6px;align-items:flex-end;margin-top:16px;height:46px">{ticks}</div>
      <div style="font-size:21px;font-weight:600;color:rgba(255,255,255,.65);margin-top:12px">visualizações qualificadas de Shorts · prazo para aceitar novos termos: <b style="color:#fff">31/01/2027</b></div></div>"""


def monetiza(n, total):
    html = f"""<div class="title" style="font-size:112px">E QUEM<br>JÁ <em>MONETIZA?</em></div>
    <div class="rule"></div>
    <div class="body" style="font-size:32px">
      <p>Existe uma <b>segunda mudança, menos comentada</b>, e ela vale para todos.</p>
      <p>A partir de 1º de fevereiro, para receber a receita de anúncios e assinaturas dos Shorts, o canal precisa de <b>10 milhões de visualizações qualificadas de Shorts nos últimos 90 dias</b>, em janela móvel.</p>
      <p>Quem ficar abaixo não precisa pedir entrada de novo, mas <b>não recebe a receita de Shorts</b> naquele período. Vale conferir no YouTube Studio se há novos termos para aceitar até 31/01/2027.</p></div>
    {window_visual()}
    <div class="src" style="margin-top:20px">Fonte: Digiday e guias do setor</div>"""
    decor = glow(-200, 300, 500, BLUE, .4) + gfx("icon_line_lilac.png", 760, 380, 420, 560, -8, .22)
    return frame(n, total, html, "bg-navy", decor)


def porque(n, total):
    def stat(big, sub):
        return (f'<div class="card" style="flex:1;padding:28px 26px"><div style="font-size:64px;font-weight:900;letter-spacing:-2px;color:{NEON};line-height:1">{big}</div>'
                f'<div style="font-size:22px;font-weight:600;color:rgba(255,255,255,.75);margin-top:10px;line-height:1.25">{sub}</div></div>')
    html = f"""<div class="title" style="font-size:104px">POR QUE O <em>YOUTUBE</em> FEZ ISSO?</div>
    <div class="rule"></div>
    <div class="body" style="font-size:33px">
      <p>O YouTube diz que os ajustes refletem o <b>crescimento do ecossistema</b>: o programa já tem mais de 3 milhões de criadores, e a última mudança grande foi em 2018.</p>
      <p>A plataforma também diz esperar <b>pagar mais aos criadores em 2027</b> do que em 2026 e prepara novos programas de incentivo, como o bônus de Shorts por constância, hoje em teste.</p></div>
    <div style="display:flex;gap:18px;margin-top:34px">{stat("3 mi+","criadores no programa")}{stat("2018","última mudança grande")}{stat("2027","paga mais que 2026, diz o YouTube")}</div>
    <div class="body acc" style="font-size:40px;margin-top:34px;line-height:1.2">Na prática, o YouTube está trocando volume por qualidade de quem monetiza.</div>"""
    decor = glow(560, 20, 520, PURPLE, .45) + gfx("icon_line_blue.png", 650, 700, 560, 760, 14, .4)
    return frame(n, total, html, "bg-navy2", decor)


def regua(n, total):
    def block(label, big, sub, hot=True):
        return f"""<div class="card" style="padding:36px 36px">
          <div style="font-size:21px;font-weight:700;letter-spacing:2.5px;color:rgba(255,255,255,.65)">{label}</div>
          <div style="display:flex;align-items:baseline;gap:18px;margin-top:10px">
            <div style="font-size:30px;font-weight:600;color:rgba(255,255,255,.7)">cerca de</div>
            <div style="font-size:140px;font-weight:900;letter-spacing:-5px;color:{NEON};line-height:1">{big}</div></div>
          <div style="font-size:33px;font-weight:600;line-height:1.3;margin-top:8px">{sub}</div></div>"""
    html = f"""<div class="title" style="font-size:116px">A RÉGUA<br>EM <em>NÚMEROS</em><br>POR DIA</div>
    <div class="rule"></div>
    <div style="display:flex;flex-direction:column;gap:22px">
      {block("PISO DOS SHORTS · QUEM JÁ MONETIZA","110 mil","visualizações qualificadas por dia, <b>todo dia</b>, durante 90 dias.")}
      <div class="card" style="padding:36px 36px">
        <div style="font-size:21px;font-weight:700;letter-spacing:2.5px;color:rgba(255,255,255,.65)">ENTRADA · CANAL NOVO</div>
        <div style="display:flex;align-items:baseline;gap:16px;margin-top:10px;flex-wrap:nowrap">
          <div style="font-size:30px;font-weight:600;color:rgba(255,255,255,.7)">cerca de</div>
          <div style="font-size:100px;font-weight:900;letter-spacing:-4px;color:{NEON};line-height:1">22 h</div>
          <div style="font-size:30px;font-weight:700;color:rgba(255,255,255,.7)">ou</div>
          <div style="font-size:100px;font-weight:900;letter-spacing:-4px;color:{NEON};line-height:1">222 mil</div></div>
        <div style="font-size:33px;font-weight:600;line-height:1.3;margin-top:8px">de <b>exibição por dia</b>, ou views de <b>Shorts por dia</b>.</div></div></div>
    <div class="src">Fonte: vidIQ</div>"""
    decor = glow(500, 300, 600, PURPLE, .45) + gfx("icon_line_purple.png", 640, 40, 520, 700, -6, .4)
    return frame(n, total, html, "bg-navy", decor)


def opiniao(n, total):
    html = f"""<div style="display:flex;align-items:center;gap:18px"><div class="pill o" style="letter-spacing:3px">OPINIÃO</div></div>
    <div style="font-size:150px;font-weight:900;line-height:.7;color:{NEON};margin:34px 0 0;height:90px">“</div>
    <div class="title" style="font-size:84px;line-height:1.0;letter-spacing:-0.03em">Minha leitura: canal monetizado vai ficar <em>mais escasso.</em></div>
    <div class="rule"></div>
    <div class="body" style="font-size:37px">
      <p>Quanto mais difícil entrar, <b>mais valem os canais que já estão dentro.</b> Mas estar dentro não basta: o piso dos Shorts exige <b>acompanhar os dados toda semana.</b></p>
      <p>Para podcasts, grupos de mídia e canais com cortes, o Shorts continua sendo porta de descoberta.</p></div>
    <div class="body acc" style="font-size:46px;margin-top:20px">Só vira receita acima do piso.</div>"""
    decor = glow(-120, -80, 520, NEON, .12) + gfx("icon_line_lilac.png", 620, 560, 640, 860, 10, .3)
    return frame(n, total, html, "bg-purple", decor)


def cta(n, total):
    html = f"""<div class="title" style="font-size:112px">FALTAM <em>70 DIAS</em> PARA 1º DE FEVEREIRO.</div>
    <div class="rule"></div>
    <div class="body" style="font-size:35px">
      <p>Quem tem audiência precisa chegar lá <b>com os dados na mão:</b> horas, Shorts, retenção e termos aceitos.</p>
      <p>A <b>One Big Media</b> acompanha cada mudança do YouTube de perto, com equipe certificada pela plataforma, e estrutura a estratégia do canal para as novas regras.</p></div>
    <div style="flex:1"></div>
    <img src="{A}logo_white.png" style="width:330px;align-self:flex-start;margin-bottom:6px">"""
    decor = glow(500, 0, 600, NEON, .16) + gfx("icon_line_neon.png", 600, 860, 520, 700, 8, .6)
    return frame(n, total, html, "bg-purple", decor, footer="none")


SLIDES = [
    lambda n, t: cover(n, t, "O YOUTUBE", "VAI MUDAR",
                       "A regra de monetização dos canais muda em <b>1º de fevereiro de 2027</b>, a primeira mudança relevante do programa desde 2018.",
                       "E ela não afeta só quem está começando.", "Vem conferir", ("A PARTIR DE", "1º FEV 2027")),
    table, monetiza, porque, regua, opiniao, cta,
]


def main():
    out = os.path.join(HERE, "out"); os.makedirs(out, exist_ok=True)
    tmp = os.path.join(HERE, "out", "_html"); os.makedirs(tmp, exist_ok=True)
    total = len(SLIDES)
    for i, fn in enumerate(SLIDES, 1):
        open(f"{tmp}/s{i:02d}.html", "w").write(fn(i, total))
    shot = os.path.join(HERE, "shot.js")
    subprocess.check_call(["node", shot, tmp, out], env={**os.environ, "NODE_PATH": subprocess.check_output(["npm", "root", "-g"]).decode().strip()})
    from PIL import Image
    ims = [Image.open(f"{out}/slide-{i:02d}.png").convert("RGB") for i in range(1, total + 1)]
    ims[0].save(f"{out}/carrossel.pdf", save_all=True, append_images=ims[1:], resolution=150)


if __name__ == "__main__":
    main()
