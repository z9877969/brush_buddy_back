const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { promocodesRouter } = require('./routes/api/promocodesRouter');
const { usersRouter } = require('./routes/api/usersRouter');
const { ordersRouter } = require('./routes/api/ordersRouter');
const { productsRouter } = require('./routes/api/productsRouter');
const { variantsRouter } = require('./routes/api/variantsRouter');
const { filtersRouter } = require('./routes/api/filtersRouter');
const { blogsRouter } = require('./routes/api/blogsRouter');
const { contentRouter } = require('./routes/api/contentRouter');

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/promos', promocodesRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', productsRouter);
app.use('/api/variants', variantsRouter);
app.use('/api/filters', filtersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/content', contentRouter);

app.use((_, res, __) => {
  res.status(404).json({ message: 'Invalid route' });
});

app.use((err, _, res, __) => {
  const { message, status = 500 } = err;

  res.status(status).json(message);
});

module.exports = app;
