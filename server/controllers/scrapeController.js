const axios = require("axios");
const cheerio = require("cheerio");
const Book = require("../models/Book");
const exportToExcel = require("../utils/exportToExcel");
const sendEmail = require("../utils/sendEmail");

const scrapeBooks = async (req, res) => {
  try {
    const url = "https://books.toscrape.com/";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let books = [];

    $(".product_pod").each((i, el) => {
      books.push({
        title: $(el).find("h3 a").attr("title"),
        price: $(el).find(".price_color").text(),
        availability: $(el).find(".availability").text().trim(),
        rating: $(el).find("p").attr("class").replace("star-rating ", ""),
        url: "https://books.toscrape.com/" + $(el).find("h3 a").attr("href"),
      });
    });

    await Book.deleteMany({});
    await Book.insertMany(books);

    res.json({ success: true, count: books.length, books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Scraping failed" });
  }
};

const exportBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ success: false, message: "No books found" });
    }

    const filePath = await exportToExcel(books);
    res.download(filePath); // user ko file download karne dega
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Excel export failed" });
  }
};


const emailBooks = async (req, res) => {
  try {
    const { recipients } = req.body; 
    const books = await Book.find();

    if (books.length === 0) {
      return res.status(404).json({ success: false, message: "No books found" });
    }

    const filePath = await exportToExcel(books);
    const emailSent = await sendEmail(recipients, filePath);

    if (emailSent) {
      res.json({ success: true, message: "Email sent successfully" });
    } else {
      res.status(500).json({ success: false, error: "Email sending failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Email failed" });
  }
};

module.exports = { scrapeBooks, exportBooks, emailBooks };


