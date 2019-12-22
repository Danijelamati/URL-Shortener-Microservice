const mongoose= require("mongoose");

const Schema = mongoose.Schema;
      
const shortenerSchema = new Schema({
  name: Number,
  location: String
});
      
const Shortener = mongoose.model("Shortener", shortenerSchema);

module.exports = Shortener;

