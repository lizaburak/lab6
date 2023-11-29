const mongoose = require('mongoose');
const { Schema, model } = mongoose;

require('dotenv').config();

mongoose.connect(process.env.MONGODB_KEY, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch(() => {
    console.log("Connection error");
    process.exit()
  });

  const Article = new Schema({
    title:String,
    content: String,
    author:String,
    category:String,
    numberOfImages:Number,
  });
  
  const ArticleModel = model('Article', Article);
  
  module.exports = {
    ArticleModel
  }