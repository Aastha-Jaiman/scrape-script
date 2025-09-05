const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

const exportToExcel = async (books) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Books");

  // Columns
  worksheet.columns = [
    { header: "Title", key: "title", width: 40 },
    { header: "Price", key: "price", width: 15 },
    { header: "Availability", key: "availability", width: 20 },
    { header: "Rating", key: "rating", width: 10 },
    { header: "URL", key: "url", width: 60 },
  ];

  // Rows
  books.forEach((book) => {
    worksheet.addRow(book);
  });

  // Ensure exports folder exists
  const exportDir = path.join(__dirname, "../exports");
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }

  const filePath = path.join(exportDir, "books.xlsx");
  await workbook.xlsx.writeFile(filePath);

  return filePath; 
};

module.exports = exportToExcel;
