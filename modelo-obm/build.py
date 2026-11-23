"""
Modelo OBM Editorial v2 — carrossel do Leno (One Big Media), inspirado nas referências do Drive.

Duas famílias de layout (como nas referências):
  A) "Impacto" (estilo @joaoadolfooficial): fundo escuro com grão, foto grande, título condensado (Anton),
     palavra de destaque em cor da marca, divisor curto, corpo leve (Poppins), frase em itálico serifado,
     botão-seta de contorno.
  B) "Editorial": kicker, título serifado (Instrument Serif), foto em moldura fina, texto em camadas.
  Variante clara (fundo cinza #E8E8E9) para alternar o ritmo.

Cores: SOMENTE paleta One Big Media, e apenas em títulos/destaques/frases:
  Neon #E2FC51 · Bright Purple #8140FA · Vibrancy Blue #3157F7 · Azul claro #79AAF7 · Navy #142544.
  Fundos: preto/navy escuros (neutros) e cinza claro da marca.

Uso:  python3 build.py   ->  out/slide-XX.png (1080x1350) e out/carrossel.pdf
"""
import os, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
A = f"file://{HERE}/assets/"
R = f"file://{HERE}/assets/refs/"
F = f"file://{HERE}/fonts2/"

HANDLE = "@reinaldoheleno"
NAVY, BLUE, PURPLE, NEON, SKY, GRAY = "#142544", "#3157F7", "#8140FA", "#E2FC51", "#79AAF7", "#E8E8E9"

NOISE = ("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>"
         "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/>"
         "<feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter>"
         "<rect width='300' height='300' filter='url(%23n)'/></svg>")

fonts = (f"@font-face{{font-family:'Anton';src:url('{F}anton-latin-400-normal.woff2') format('woff2');}}"
         + "".join(f"@font-face{{font-family:'Poppins';font-weight:{w};src:url('{F}poppins-latin-{w}-normal.woff2') format('woff2');}}" for w in (300, 400, 600))
         + f"@font-face{{font-family:'Serif';font-style:normal;src:url('{F}instrument-serif-latin-400-normal.woff2') format('woff2');}}"
         + f"@font-face{{font-family:'Serif';font-style:italic;src:url('{F}instrument-serif-latin-400-italic.woff2') format('woff2');}}")

CSS = fonts + f"""
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1350px;background:#000}}
.slide{{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:'Poppins',sans-serif;color:#fff;
  display:flex;flex-direction:column;padding:64px 68px 56px}}
.dark{{background:radial-gradient(120% 70% at 85% 0%,#1d2c63 0%,rgba(20,37,68,0) 60%),linear-gradient(180deg,#0b0c12 0%,#07070b 100%)}}
.dark2{{background:radial-gradient(110% 60% at 10% 100%,#2a1a66 0%,rgba(20,20,60,0) 62%),linear-gradient(180deg,#0a0a10,#08080d)}}
.light{{background:{GRAY};color:#0d0d14}}
.noise{{position:absolute;inset:0;background:url("{NOISE}");opacity:.07;mix-blend-mode:overlay;pointer-events:none;z-index:9}}
.light .noise{{opacity:.5;mix-blend-mode:multiply}}
.handle{{position:relative;z-index:5;display:flex;align-items:center;gap:12px;font-size:27px;font-weight:400;letter-spacing:-.2px;flex:none}}
.handle.c{{justify-content:center}}
.title{{font-family:'Anton',sans-serif;text-transform:uppercase;letter-spacing:-.012em;line-height:1.0;font-weight:400}}
.title .h{{color:{NEON};text-shadow:0 0 44px rgba(226,252,81,.35)}}
.light .title .h{{color:{PURPLE};text-shadow:none}}
.rule{{height:3px;width:200px;background:linear-gradient(90deg,{NEON},rgba(226,252,81,0));margin:26px 0 24px}}
.rule.c{{margin-left:auto;margin-right:auto;background:linear-gradient(90deg,rgba(226,252,81,0),{NEON},rgba(226,252,81,0))}}
.light .rule{{background:#c3c3cc;width:100%;height:2px}}
.hr{{height:2px;width:100%;background:rgba(255,255,255,.18);margin:26px 0}}
.body{{font-weight:300;font-size:32px;line-height:1.45;color:rgba(255,255,255,.9)}}
.body b{{font-weight:600;color:#fff}}
.body p+p{{margin-top:.55em}}
.light .body{{color:#2a2a35}} .light .body b{{color:#0d0d14}}
.acc{{font-family:'Serif',serif;font-style:italic;font-size:50px;line-height:1.1;color:{SKY};letter-spacing:-.2px}}
.light .acc{{color:{BLUE}}}
.src{{font-size:21px;font-weight:400;color:rgba(255,255,255,.5);margin-top:16px}}
.light .src{{color:#6b6b78}}
.btn{{display:flex;align-items:center;justify-content:center;gap:16px;height:66px;padding:0 40px;border-radius:99px;border:2px solid rgba(255,255,255,.9);
  font-size:24px;font-weight:400;color:#fff;flex:none}}
.light .btn{{border-color:#0d0d14;color:#0d0d14}}
.foot{{position:relative;z-index:5;display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:20px;flex:none}}
.foot.r{{justify-content:flex-end}}
.seal{{height:36px;opacity:.7}} .light .seal{{filter:invert(1)}}
.card{{background:#fff;border-radius:6px;color:#0d0d14}}
.frame{{border:1.5px solid rgba(255,255,255,.35);overflow:hidden}}
.kicker{{font-family:'Serif',serif;font-size:34px;letter-spacing:.01em;text-transform:uppercase;color:rgba(255,255,255,.85)}}
.serif{{font-family:'Serif',serif;font-weight:400;letter-spacing:-.01em;line-height:.98}}
.serif em{{font-style:italic;color:{NEON}}}
"""

BADGE = ('<svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/>'
         '<path d="M7 12.5l3.2 3.2L17 8.8" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')
ARROW = ('<svg width="54" height="22" viewBox="0 0 54 22"><path d="M2 11h48M41 2l9 9-9 9" stroke="currentColor" stroke-width="2.4" '
         'fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')


def handle(center=False):
    return f'<div class="handle{" c" if center else ""}">{HANDLE} {BADGE}</div>'


def foot(btn="", seal=True):
    s = f'<img class="seal" src="{A}seal_white.png">' if seal else "<span></span>"
    b = f'<div class="btn">{btn}{ARROW}</div>' if btn is not None else ""
    return f'<div class="foot{"" if seal else " r"}">{s}{b}</div>'


def page(inner, cls="dark", photo=""):
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>'
            f'<div class="slide {cls}">{photo}{inner}<div class="noise"></div></div></body></html>')


def img(name, extra=""):
    return f'<img src="{R}{name}.png" style="display:block;width:100%;{extra}">'


# ---------------------------------------------------------------- slides
def s1_capa():
    photo = (f'<div style="position:absolute;left:0;top:0;width:1080px;height:760px;background:url({R}trophy.png) center top/cover"></div>'
             '<div style="position:absolute;left:0;top:0;width:1080px;height:790px;background:linear-gradient(180deg,rgba(7,7,11,.0) 52%,rgba(7,7,11,.9) 90%,#07070b 100%)"></div>')
    inner = f"""<div style="height:690px;flex:none"></div>
    {handle(True)}
    <div class="title" style="font-size:118px;text-align:center;margin-top:22px;white-space:nowrap">O YOUTUBE <span class="h">VAI MUDAR</span></div>
    <div class="rule c" style="width:240px"></div>
    <div class="body" style="text-align:center;font-size:31px;padding:0 10px">A regra de monetização dos canais muda em <b>1º de fevereiro de 2027</b>, a primeira mudança relevante do programa desde 2018.</div>
    <div class="acc" style="text-align:center;margin-top:18px;font-size:48px">E ela não afeta só quem está começando.</div>
    <div class="foot" style="justify-content:center"><div class="btn">Vem conferir{ARROW}</div></div>"""
    return page(inner, "dark", photo)


def req_card(hot, subs, hrs, shorts):
    bd = f"border:3px solid {NEON};box-shadow:0 0 40px rgba(226,252,81,.25);" if hot else ""
    bar = lambda c, w: f'<div style="height:9px;border-radius:5px;background:#e6e6ec;margin-top:8px"><div style="height:9px;width:{w}%;border-radius:5px;background:{c}"></div></div>'
    return f"""<div class="card" style="padding:18px 22px 20px;{bd}">
      <div style="font-size:17px;font-weight:600;margin-bottom:12px">Requisitos do Programa de Parcerias do YouTube</div>
      <div style="display:flex;gap:16px;align-items:stretch">
        <div style="flex:1;border:1.5px solid #dcdce4;border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:center">
          <div style="font-size:30px;font-weight:600;line-height:1">{subs}</div><div style="font-size:14px;color:#555">inscritos</div>{bar('#12b5cb',60)}</div>
        <div style="font-size:30px;align-self:center;color:#555">+</div>
        <div style="flex:1.5;border:1.5px solid #dcdce4;border-radius:12px;padding:14px">
          <div style="font-size:30px;font-weight:600;line-height:1">{hrs}</div><div style="font-size:14px;color:#555">horas de exibição públicas e válidas</div>{bar('#d946c9',60)}
          <div style="text-align:center;font-size:13px;color:#777;margin:8px 0 2px">ou</div>
          <div style="font-size:30px;font-weight:600;line-height:1">{shorts}</div><div style="font-size:14px;color:#555">visualizações de Shorts, últimos 90 dias</div>{bar('#34c759',60)}</div></div></div>"""


def s2_tabela():
    year = lambda t, c, extra="": f'<div class="title" style="font-size:132px;color:{c};{extra}">{t}</div>'
    inner = f"""{handle()}
    <div style="display:flex;gap:30px;align-items:center;margin-top:28px">
      <div style="width:640px;display:flex;flex-direction:column;gap:18px">{req_card(False,'1.000','4.000 h','10 milhões')}{req_card(True,'1.000','8.000 h','20 milhões')}</div>
      <div style="display:flex;flex-direction:column;gap:150px;padding-top:6px">{year('2026','#6f6f78')}{year('2027',NEON,'text-shadow:0 0 44px rgba(226,252,81,.4)')}</div></div>
    <div class="title" style="font-size:96px;margin-top:34px">O QUE <span class="h">MUDA?</span></div>
    <div class="hr" style="margin:20px 0 18px"></div>
    <div class="body" style="font-size:27px;line-height:1.42"><p><b>2026:</b> 1.000 inscritos + 4.000 horas de exibição em 12 meses, ou 10 milhões de views de Shorts em 90 dias.</p>
      <p><b>2027:</b> 1.000 inscritos + 8.000 horas de exibição em 365 dias, ou 20 milhões de views de Shorts em 90 dias.</p></div>
    <div class="acc" style="margin-top:14px;font-size:44px">O dobro do requisito para canais que vão pedir entrada.</div>
    <div class="body" style="font-size:27px;margin-top:10px">Quem já está no Programa de Parcerias <b>mantém o status.</b></div>
    <div class="src" style="margin-top:8px">Fonte: YouTube, 10/08/2026</div>
    {foot('')}"""
    return page(inner, "dark")


def s3_monetiza():
    inner = f"""{handle()}
    <div class="frame" style="margin-top:22px;border:none;border-radius:2px;box-shadow:0 18px 50px rgba(0,0,0,.25)">{img('shorts_phones')}</div>
    <div class="title" style="font-size:96px;margin-top:26px;color:#0d0d14">E QUEM JÁ <span class="h">MONETIZA?</span></div>
    <div class="rule" style="margin:18px 0 16px"></div>
    <div class="body" style="font-size:25.5px;line-height:1.4"><p>Existe uma <b>segunda mudança, menos comentada</b>, e ela vale para todos.</p>
      <p>A partir de 1º de fevereiro, para receber a receita de anúncios e assinaturas dos Shorts, o canal precisa de <b>10 milhões de visualizações qualificadas de Shorts nos últimos 90 dias</b>, em janela móvel.</p>
      <p>Quem ficar abaixo não precisa pedir entrada de novo, mas <b>não recebe a receita de Shorts</b> naquele período.</p></div>
    <div class="acc" style="margin-top:14px;font-size:38px">Vale conferir no YouTube Studio se há novos termos para aceitar até 31/01/2027.</div>
    <div class="src">Fonte: Digiday e guias do setor</div>
    {foot('')}"""
    return page(inner, "light")


def s4_porque():
    tile = lambda n: f'<div class="frame" style="height:196px;background:url({R}{n}.png) center/cover"></div>'
    inner = f"""{handle()}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:24px">{tile('lebron')}{tile('shyamalan')}{tile('kevin')}{tile('ina')}</div>
    <div class="title" style="font-size:100px;margin-top:30px">POR QUE O <span class="h">YOUTUBE</span><br>FEZ ISSO?</div>
    <div class="rule" style="margin:20px 0 18px"></div>
    <div class="body" style="font-size:27px;line-height:1.42"><p>O YouTube diz que os ajustes refletem o <b>crescimento do ecossistema</b>: o programa já tem mais de 3 milhões de criadores, e a última mudança grande foi em 2018.</p>
      <p>A plataforma também diz esperar <b>pagar mais aos criadores em 2027</b> do que em 2026 e prepara novos programas de incentivo, como o bônus de Shorts por constância, hoje em teste.</p></div>
    <div class="acc" style="margin-top:14px;font-size:46px">Na prática, o YouTube está trocando volume por qualidade de quem monetiza.</div>
    {foot('')}"""
    return page(inner, "dark2")


def s5_regua():
    big = lambda t, sz=230: f'<div class="title h" style="font-size:{sz}px;line-height:.95;color:{NEON};text-shadow:0 0 50px rgba(226,252,81,.45)">{t}</div>'
    cen = "text-align:center"
    inner = f"""<div style="display:flex;justify-content:flex-start">{handle()}</div>
    <div class="title" style="font-size:104px;{cen};margin-top:44px">A RÉGUA EM <span class="h">NÚMEROS</span><br>POR DIA</div>
    <div class="rule c" style="margin-top:30px;margin-bottom:34px"></div>
    <div class="body" style="{cen};font-size:32px">Piso dos Shorts para quem já monetiza: cerca de</div>
    <div style="{cen};margin-top:2px">{big('110 MIL')}</div>
    <div class="body" style="{cen};font-size:30px;margin-top:4px"><b>visualizações qualificadas por dia</b>, todo dia, durante 90 dias.</div>
    <div class="hr" style="width:760px;margin:56px auto"></div>
    <div class="body" style="{cen};font-size:32px">Entrada de um canal novo: cerca de</div>
    <div style="{cen};display:flex;justify-content:center;align-items:baseline;gap:22px;margin-top:2px">{big('22 HORAS',128)}<span class="acc" style="font-size:46px">ou</span>{big('222 MIL',128)}</div>
    <div class="body" style="{cen};font-size:32px;margin-top:6px">de <b>exibição por dia</b>, ou <b>views de Shorts por dia</b>.</div>
    <div class="src" style="{cen}">Fonte: vidIQ</div>
    {foot('')}"""
    return page(inner, "dark")


def s6_opiniao():
    inner = f"""{handle()}
    <div class="kicker" style="margin-top:44px">Minha leitura</div>
    <div class="serif" style="font-size:112px;margin-top:12px">Canal monetizado vai ficar <em>mais escasso.</em></div>
    <div class="frame" style="margin-top:34px;border-radius:2px">{img('bench')}</div>
    <div class="body" style="margin-top:28px;font-size:30px;line-height:1.42"><p>Quanto mais difícil entrar, <b>mais valem os canais que já estão dentro.</b> Mas estar dentro não basta: o piso dos Shorts exige <b>acompanhar os dados toda semana.</b></p>
      <p>Para podcasts, grupos de mídia e canais com cortes, o Shorts continua sendo porta de descoberta.</p></div>
    <div class="acc" style="margin-top:12px;font-size:52px">Só vira receita acima do piso.</div>
    {foot('')}"""
    return page(inner, "dark2")


def s7_cta():
    inner = f"""{handle()}
    <div class="title" style="font-size:132px;margin-top:46px">FALTAM <span class="h">70 DIAS</span> PARA 1º DE FEVEREIRO.</div>
    <div class="rule"></div>
    <div class="body" style="font-size:31px"><p>Quem tem audiência precisa chegar lá <b>com os dados na mão:</b> horas, Shorts, retenção e termos aceitos.</p>
      <p>A <b>One Big Media</b> acompanha cada mudança do YouTube de perto, com equipe certificada pela plataforma, e estrutura a estratégia do canal para as novas regras.</p></div>
    <div class="frame" style="margin-top:34px;border-radius:22px;border:1.5px solid rgba(255,255,255,.25)">{img('obm_profile')}</div>
    {foot(None)}"""
    return page(inner, "dark")


SLIDES = [s1_capa, s2_tabela, s3_monetiza, s4_porque, s5_regua, s6_opiniao, s7_cta]


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
