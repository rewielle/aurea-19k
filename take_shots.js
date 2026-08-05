import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = 'C:/Users/mrewi/.gemini/antigravity/brain/68768543-0812-468e-b8aa-530ae0f2af02';

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // 1440x900 Desktop
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Preloader state shot
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_shot_preloader_1440.png') });

  // Wait for preloader to finish (2 seconds)
  await new Promise(r => setTimeout(r, 2200));

  // Hero state
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_shot_hero_1440.png') });

  // Scroll to Architectural Concept
  await page.evaluate(() => {
    document.querySelector('#architecture')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_shot_concept_1440.png') });

  // Scroll to Exploded Architecture
  await page.evaluate(() => {
    const el = document.querySelectorAll('section')[2];
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_shot_exploded_1440.png') });

  // Scroll to Floor Selector
  await page.evaluate(() => {
    document.querySelector('#floor-selector')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_shot_floor_selector_1440.png') });

  // Scroll to Amenities
  await page.evaluate(() => {
    document.querySelector('#experience')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_shot_amenities_1440.png') });

  // 430x932 Mobile Pro Max Viewport
  await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'aurea_shot_mobile_430.png') });

  console.log('Screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
