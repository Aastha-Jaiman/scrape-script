const ExcelJS = require("exceljs");
const ScrapedData = require("../models/ScrapedData");
const sendEmail = require("../utils/sendEmail");
const UrlScrape = require("../utils/urlScrape");
const path = require("path");
const fs = require("fs");

const scrapeDynamic = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const data = await UrlScrape(url);

    // Save in DB
    const record = await ScrapedData.create({ url, data });

    // Excel export
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Scraped Data");
    worksheet.columns = [
      { header: "Tag", key: "tag", width: 15 },
      { header: "Text", key: "text", width: 60 },
      { header: "Href", key: "href", width: 40 },
    ];
    worksheet.addRows(data);

    const exportDir = path.join(__dirname, "../exports");
    if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

    const filePath = path.join(exportDir, `scraped-${Date.now()}.xlsx`);
    await workbook.xlsx.writeFile(filePath);

    res.json({
      success: true,
      message: "Scraping successful (static or JS site)",
      record,
      file: filePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed", message: err.message });
  }
};



// GET -> fetch all scraped data
const getScrapedData = async (req, res) => {
  try {
    const data = await ScrapedData.find().sort({ createdAt: -1 });
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetching failed" });
  }
};

// POST -> email scraped data excel
const emailScrapedData = async (req, res) => {
  try {
    const { recipients } = req.body;
    if (!recipients) return res.status(400).json({ error: "Recipients required" });

    // latest scrape data fetch
    const latest = await ScrapedData.findOne().sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ error: "No scraped data found" });

    // Excel export
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Scraped Data");
    worksheet.columns = [
      { header: "Tag", key: "tag", width: 15 },
      { header: "Text", key: "text", width: 60 },
      { header: "Href", key: "href", width: 40 },
    ];
    worksheet.addRows(latest.data);

    const filePath = `exports/scraped-${Date.now()}.xlsx`;
    await workbook.xlsx.writeFile(filePath);

    // send mail
    const emailSent = await sendEmail(recipients, filePath);

    if (emailSent) {
      res.json({ success: true, message: "Email sent successfully" });
    } else {
      res.status(500).json({ error: "Email sending failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email failed" });
  }
};

module.exports = { scrapeDynamic, getScrapedData, emailScrapedData };

