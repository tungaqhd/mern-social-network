const moongse = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await moongse.connect(db, {
      useNewUrlParser: true,
    });
    console.log("Mongodb connected");
  } catch (e) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
