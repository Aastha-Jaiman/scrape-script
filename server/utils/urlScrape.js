const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function UrlScrape(url) {
  // Step 1: Try static HTML scraping first
  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // Grab meaningful content
    let results = [];
    $("h1, h2, h3, p, a").each((i, el) => {
      const text = $(el).text().trim();
      if (text) {
        results.push({
          tag: el.tagName,
          text,
          href: $(el).attr("href") || null,
        });
      }
    });

    // results → static site
    if (results.length > 1 && !results.some(r => r.text === "Loading...")) {
      return results;
    }
  } catch (err) {
    console.warn("Static scrape failed, trying Puppeteer...", err.message);
  }

  // Step 2: Puppeteer fallback for JS-rendered site
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const results = await page.evaluate(() => {
    const elements = [...document.querySelectorAll("h1, h2, h3, p, a")];
    return elements.map(el => ({
      tag: el.tagName.toLowerCase(),
      text: el.innerText.trim(),
      href: el.href || null,
    }));
  });

  await browser.close();
  return results;
}

module.exports = UrlScrape;
