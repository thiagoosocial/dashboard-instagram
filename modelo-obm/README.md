# Modelo OBM Editorial v2 (novo design do Leno)

Terceiro formato do perfil, ao lado dos vídeos e dos posts estilo Twitter. Baseado nas referências do Drive
(carrosséis de creators/artistas): foto grande, título forte, texto leve, frase em itálico serifado.

## Duas famílias de layout
- **Impacto** (estilo @joaoadolfooficial): fundo escuro com grão, foto full-bleed na capa, título condensado
  (Anton) com a palavra de destaque em neon, divisor curto, corpo leve (Poppins 300 + negrito 600),
  frase em itálico serifado (Instrument Serif) e botão-seta de contorno.
- **Editorial**: kicker em caixa alta, título serifado grande com trecho em itálico colorido, foto em moldura fina.
- Variante **clara** (fundo cinza #E8E8E9) para alternar o ritmo.

## Regra de cor
Só cores da One Big Media, e só em títulos, palavras de destaque e frases:
Neon `#E2FC51` (destaque no escuro) · Bright Purple `#8140FA` (destaque no claro) · Azul `#79AAF7`/`#3157F7` (frase em itálico).
Fundos são neutros escuros (preto/navy) ou o cinza claro da marca. Rodapé: selo "powered by" da marca.

## Imagens
Fotos recortadas das referências ficam em `assets/refs/`. Para um novo carrossel, coloque as fotos do tema lá
(capa: foto grande de creator/artista; slides internos: foto em moldura, grade 2x2, print de tela ou card de dados).

## Gerar
`python3 build.py` → `out/slide-XX.png` (1080×1350) e `out/carrossel.pdf`. Cada slide é uma função (`s1_capa`, `s2_tabela`,
`s3_monetiza`, `s4_porque`, `s5_regua`, `s6_opiniao`, `s7_cta`) que serve de molde. A versão anterior (v1) está em `v1/`.
