const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const { list } = require('./designs');
const only = process.argv.slice(2);
const root = path.resolve(__dirname, '..');
(async () => {
  const b = await chromium.launch();
  for (const [name, html, w, h] of list) {
    if (only.length && !only.some((o) => name.includes(o))) continue;
    const f = path.join(root, 'src', 'html', name + '.html');
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, html);
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(root, 'png', name + '.png'), type: 'png' });
    await p.pdf({ path: path.join(root, 'pdf', name + '.pdf'), width: w + 'px', height: h + 'px', printBackground: true, pageRanges: '1' });
    await ctx.close();
    console.log('ok', name);
  }
  await b.close();
})();
