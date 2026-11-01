const mongoose = require("mongoose");
const cfg = require("./env");
module.exports = async () => { mongoose.set("strictQuery", true); await mongoose.connect(cfg.mongo); console.log("MongoDB connected"); };
