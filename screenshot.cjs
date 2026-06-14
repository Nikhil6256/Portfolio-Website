const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sites = [
  {
    url: 'https://vbjbuildingchemicals.com/',
    output: path.join(__dirname, 'public/images/chemical-preview.webp'),
    name: 'Chemical E-commerce'
  },
  {
    url: 'https://www.cybronixprojects.com/',
    output: path.join(__dirname, 'public/images/agency-preview.webp'),
    name: 'Social Media Agency'
  }
];

(async () => {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  for (const site of sites) {
    try {
      console.log(`Capturing: ${site.name} -> ${site.url}`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      // Use domcontentloaded instead of networkidle2 for faster/more reliable load
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      // Wait a bit for images/fonts to render
      await new Promise(r => setTimeout(r, 5000));
      await page.screenshot({ path: site.output, type: 'webp', quality: 85, fullPage: false });
      console.log(`  Saved -> ${site.output}`);
      await page.close();
    } catch (err) {
      console.error(`  FAILED for ${site.name}:`, err.message);
      // Try a fallback: just wait longer with load event
      try {
        console.log(`  Retrying ${site.name}...`);
        const page2 = await browser.newPage();
        await page2.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
        await page2.goto(site.url, { waitUntil: 'load', timeout: 120000 });
        await new Promise(r => setTimeout(r, 6000));
        await page2.screenshot({ path: site.output, type: 'webp', quality: 85, fullPage: false });
        console.log(`  Retry saved -> ${site.output}`);
        await page2.close();
      } catch (err2) {
        console.error(`  Retry also FAILED for ${site.name}:`, err2.message);
      }
    }
  }

  await browser.close();
  console.log('All done!');
})();
