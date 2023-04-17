const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017"); // mongodb://localhost:27017
  } catch (error) {
    console.log({ error });
  }
};
