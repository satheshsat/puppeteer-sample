import puppeteer from 'puppeteer';
import { setTimeout } from 'node:timers/promises';

(async () => {
  // 1. Launch a headless browser instance
  const browser = await puppeteer.launch({ 
    headless: true // Change to false if you want to visually see the browser open
  });

  // 2. Open a new page/tab
  const pages = await browser.pages();
  const page = pages[0];


  // 3. Set the screen size for consistent rendering
  await page.setViewport({ width: 1280, height: 800 });

  // 4. Navigate to the target website
  await page.goto('https://satheshsat.github.io/', {
    waitUntil: 'networkidle2', // Wait until network traffic settles down
  });

  // Extract contact details
  const contactDetails = await page.evaluate(() => {
    // Regular expression for emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    
    // Regular expression for phone numbers (matches various international formats)
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

    // Get all visible text from the webpage body
    const pageText = document.body.innerText;

    // Match patterns against page text
    const emailsFound = pageText.match(emailRegex) || [];
    const phonesFound = pageText.match(phoneRegex) || [];

    // Remove duplicates using Set
    return {
      emails: [...new Set(emailsFound)],
      phones: [...new Set(phonesFound)]
    };
  });

  console.log('Extracted Data:', contactDetails);
  await browser.close();
})();
