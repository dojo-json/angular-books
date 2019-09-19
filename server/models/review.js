const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'a review must be for a book']
  },
  name: {
    type: String,
    required: [true, 'You must provide a reviewer name!'],
  },
  comment: {
    type: String,
    required: [true, 'please provide a review'],
    minlength: [10, 'more characters ']
  }
}, {
  timestamps: true
});

module.exports = {
  ReviewSchema,
  Review: mongoose.model('Review', ReviewSchema),
};


