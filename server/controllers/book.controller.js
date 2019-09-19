const Book = require('mongoose').model('Book');
const { Http } = require('@status/codes');
// const Author = require('mongoose').model('Book');


module.exports = {
  // get all resource
  index(_request, response) {
    Book.find({})
      .then(books => response.json(books))
      .catch(error => response.status(Http.PayloadTooLarge).json(error));
  },
  // create resource
  create(request, response) {
    Book.create(request.body)
      .then(book => response.status(Http.Created).json(book))
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);

        response.status(Http.Unauthorized).json(errors);
      })
  },
  // get one resource
  show(request, response) {
    const { book_id: bookId } = request.params;

    Book.findById(bookId)
      .then(book => {
        if (!book) {
          throw new Error('Not Found!');
        }

        response.json(book);
      })
      .catch(error => response.status(Http.Conflict).json(error));
  },
  // update resource
  update(request, response) {
    const { book_id: bookId } = request.params;
    console.log('updating book', bookId, request.body);
    Book.findByIdAndUpdate(bookId, request.body, { new: true, runValidators: true })
      .then(book => response.json(book))
      .catch(error => {
        // this assumes validation failures which may not be the case.
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);

        response.status(Http.Unauthorized).json(errors);
      })
  },
  // destroy resource
  destroy(request, response) {
    const { book_id: bookId } = request.params;

    Book.findByIdAndRemove(bookId)
      .then(book => response.json(book))
      .catch(error => response.status(Http.Forbidden).json(error));
  },
};
