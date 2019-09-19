const router = require('express').Router();
const { BookController } = require('../controllers');
// const BookController = require('../controllers').BookController;
// const BookController = require('../controllers/book.controller');

// /books/lakdsjfhksadjf

module.exports = router
  .get('/', BookController.index)
  .post('/', BookController.create)
  .get('/:book_id', BookController.show)
  .put('/:book_id', BookController.update)
  .delete('/:book_id', BookController.destroy);
