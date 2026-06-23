import puppeteer from 'puppeteer';
import { setTimeout } from 'node:timers/promises';

(async () => {
  // 1. Launch a headless browser instance
  const browser = await puppeteer.launch({ 
    headless: false // Change to false if you want to visually see the browser open
  });

  // 2. Open a new page/tab
  const pages = await browser.pages();
  const page = pages[0];


  // 3. Set the screen size for consistent rendering
  await page.setViewport({ width: 1280, height: 800 });

  // 4. Navigate to the target website
  await page.goto('https://google.com/', {
    waitUntil: 'networkidle2', // Wait until network traffic settles down
  });
  setTimeout(5000); // Wait for 2 seconds to ensure the page is fully loaded
//   await page.click('input[name="q"]');
  await page.type('textarea[name="q"]', 'satheshsat', { delay: 100 });
  await page.keyboard.press('Enter');
//   await browser.close();
})();