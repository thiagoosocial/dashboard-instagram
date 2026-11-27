# Carrossel Chilli Beans — design Twitter do Leno
8 slides em Montserrat, com fotos em todos.
- Fotos do Caito Maia: Wikimedia Commons, "Caito Maia.jpg", CC BY-SA 4.0 (crédito na imagem). Salvas em `assets/src/caito.jpg`.
- Fotos de óculos: site oficial loja.chillibeans.com.br (slides 2 e 5), em `assets/src/prod/`.
- `python3 prep_photos.py` gera `photos/s1..s8.jpg`; `python3 build.py` gera `out/slide-XX.png` e `out/carrossel.pdf`.
Para trocar uma foto, salve a nova em `photos/sN.jpg` (depois do prep_photos) e rode build.py.
