// node shot.js <htmlDir> <outDir>
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [src, out] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const f of fs.readdirSync(src).filter(x => x.endsWith('.html')).sort()) {
    await p.goto('file://' + src + '/' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(200);
    const m = await p.evaluate(() => {
      const s = document.querySelector('.slide'); const i = document.querySelector('.img');
      return { overflow: s.scrollHeight - s.clientHeight, imgH: i ? Math.round(i.getBoundingClientRect().height) : null };
    });
    console.log(f, JSON.stringify(m));
    await p.screenshot({ path: out + '/slide-' + f.slice(1, 3) + '.png' });
  }
  await b.close();
})();
