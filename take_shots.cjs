const puppeteer = require('puppeteer');
const path = require('path');

const SCREENSHOT_DIR = 'C:/Users/mrewi/.gemini/antigravity/brain/68768543-0812-468e-b8aa-530ae0f2af02';

async function capture() {
  console.log('Capturing /aurea-19k-rebuild static visual lock screenshots...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // 1440x900 Desktop
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Desktop Full Page
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_01_desktop_full.png'), fullPage: true });

  // 3. Architecture scene
  await page.evaluate(() => document.querySelector('#concept')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_03_architecture.png') });

  // 4. Exploded tower closed & 5. Exploded open
  await page.evaluate(() => document.querySelector('#exploded')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_05_exploded_open.png') });

  await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    btns.forEach(b => { if (b.textContent.includes('Collapse Layers')) b.click(); });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_04_exploded_closed.png') });

  // 6. Exterior & 7. Interior state
  await page.evaluate(() => document.querySelector('#spatial')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_06_exterior.png') });

  await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    btns.forEach(b => { if (b.textContent.includes('PANORAMIC SUITE')) b.click(); });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_07_interior.png') });

  // 8. Low floor & 9. High floor perspective
  await page.evaluate(() => document.querySelector('#perspective')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_08_low_floor.png') });

  await page.evaluate(() => {
    const btns = document.querySelectorAll('div');
    btns.forEach(b => { if (b.textContent.includes('LEVEL 35')) b.click(); });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_09_high_floor.png') });

  // 10. Horizon pool
  await page.evaluate(() => document.querySelector('#amenities')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_10_horizon_pool.png') });

  // 11. Material gallery
  await page.evaluate(() => document.querySelector('#materials')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_11_material_gallery.png') });

  // 12. Night CTA
  await page.evaluate(() => document.querySelector('#presentation')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_12_night_cta.png') });

  // 13. Cinematic footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_13_cinematic_footer.png') });

  // 2. Mobile Full Page (390px)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_19k_02_mobile_full.png'), fullPage: true });

  console.log('/aurea-19k-rebuild screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
