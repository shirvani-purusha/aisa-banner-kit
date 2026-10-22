/*
  Capture each banner as a PNG at exact output size, plus an alt-text file.
  Uses event/content.js as the source of truth (edit-panel changes that were
  not downloaded into content.js are not included).

    npm install          (once, inside banner-kit/)
    npm run capture      writes exports/DRAFT_preview_*.png and *.alt.txt
*/
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'exports');
const FORMATS = [
  { id: '1920x1080', file: 'DRAFT_preview_1920x1080' },
  { id: '1920x640', file: 'DRAFT_preview_1920x640' },
  { id: 'mobile-1080x1350', file: 'DRAFT_preview_mobile_1080x1350' },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const launch = {};
  if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;
  if (process.env.HTTPS_PROXY) launch.proxy = { server: process.env.HTTPS_PROXY }; // for Google Fonts behind a proxy
  const browser = await chromium.launch(launch);
  for (const f of FORMATS) {
    const page = await browser.newPage();
    const url = pathToFileURL(path.join(ROOT, 'banner.html')).href + `?format=${f.id}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready.then(() => BannerKit.fixSeparators()));
    const missing = await page.evaluate(() =>
      ['Barlow', 'Libre Baskerville'].filter((fam) => ![...document.fonts].some((x) => x.family.replace(/"/g, '') === fam && x.status === 'loaded')));
    if (missing.length) console.warn(`  ${f.id}: fonts not loaded (${missing.join(', ')}); fallbacks were used`);
    const banner = page.locator('.bk-banner');
    await banner.screenshot({ path: path.join(OUT, `${f.file}.png`) });
    const alt = await page.evaluate((id) => BannerKit.content.altText[id], f.id);
    fs.writeFileSync(path.join(OUT, `${f.file}.alt.txt`), alt + '\n');
    console.log(`  wrote exports/${f.file}.png`);
    await page.close();
  }
  await browser.close();
})();
