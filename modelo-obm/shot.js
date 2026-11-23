// node shot.js <htmlDir> <outDir>  — renderiza cada sNN.html em slide-NN.png (1080x1350)
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [src, out] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const f of fs.readdirSync(src).filter(x => x.endsWith('.html')).sort()) {
    await p.goto('file://' + src + '/' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(250);
    const m = await p.evaluate(() => {
      const sl = document.querySelector('.slide');
      return { overflow: sl.scrollHeight - sl.clientHeight };
    });
    console.log(f, JSON.stringify(m));
    await p.screenshot({ path: out + '/slide-' + f.slice(1, 3) + '.png' });
  }
  await b.close();
})();
