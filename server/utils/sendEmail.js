const nodemailer = require("nodemailer");
const path = require("path");

const sendEmail = async (recipients, filePath) => {
  try {
    // Transporter (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Book Scraper" <${process.env.EMAIL_USER}>`,
      to: recipients,
      subject: "Scraped Books Data",
      text: "Please find attached the latest books data in Excel format.",
      attachments: [
        {
          filename: "books.xlsx",
          path: filePath,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.response);
    return true;
  } catch (err) {
    console.error(" Email sending failed:", err);
    return false;
  }
};

module.exports = sendEmail;
