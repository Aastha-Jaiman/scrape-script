const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const URL = process.env.DB_URL
    const DB = await mongoose.connect(URL);


    console.log(`DataBase Connected: ${DB.connection.host}`);
  } catch (err) {
    console.log(`DataBase occur error {\n${err}\n}`);
  }
};

module.exports = connectDB;