// const express = require("express");
// const { scrapeBooks, exportBooks, emailBooks, scrapeDynamic } = require("../controllers/scrapeController");

// const router = express.Router();

// router.post("/dynamic", scrapeDynamic);
// router.get("/", scrapeBooks);
// router.get("/export", exportBooks);
// router.post("/email", emailBooks);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { scrapeDynamic, getScrapedData, emailScrapedData } = require("../controllers/scrapeController");

router.post("/dynamic", scrapeDynamic); // URL se scrape
router.get("/dynamic", getScrapedData); // DB se fetch
router.post("/dynamic/email", emailScrapedData); // Email latest scrape data

module.exports = router;

