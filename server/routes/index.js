const apiRouter = require('express').Router();
const router = require('express').Router();
const bookRouter = require('./book.routes');
// const authorRouter = require('./author.routes');
const catchAll = require('./catch-all.routes');

apiRouter
  // .use('/authors', authorRouter)
  // .use('/reviews', reviewRouter)
  .use('/books', bookRouter);

// /api/books/aksdjafhkajsdfh
module.exports = router.use('/api', apiRouter).use(catchAll);
