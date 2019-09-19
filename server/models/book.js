const mongoose = require('mongoose');

const { ReviewSchema } = require('./review');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Give me a title'],
    minlength: [2, 'More chaars'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'give an author'],
  },
  publisher: String,
  year: Number,
  pages: {
    type: Number,
    min: [1, 'moar pages!!!!']
  },
  reviews: [ReviewSchema]
}, {
  timestamps: true
});

// books
module.exports = mongoose.model('Book', BookSchema);
