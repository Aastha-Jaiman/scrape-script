const express = require("express");
const { scrapeBooks, exportBooks, emailBooks } = require("../controllers/scrapeController");

const router = express.Router();

router.get("/", scrapeBooks);
router.get("/export", exportBooks);
router.post("/email", emailBooks);

module.exports = router;


