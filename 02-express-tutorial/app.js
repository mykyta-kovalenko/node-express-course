console.log('Express Tutorial');

import express from 'express';
import data from './data.js';
import peopleRouter from './routes/people-router.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('./public'));

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(method, url);
  next();
};

app.use(logger);

app.use('/api/v1/people', peopleRouter);

app.get('/', (req, res) => {
  res.status(200).send('Home Page');
});

app.get('/api/v1/test', (req, res) => {
  res.status(200).json({ message: 'It worked' });
});

app.get('/api/v1/products', (req, res) => {
  res.status(200).json(data.products);
});

app.get('/api/v1/query', (req, res) => {
  const { search, limit, maxPrice } = req.query;

  let filteredData = data.products;

  filteredData = data.products.filter((product) => {
    return product.name.startsWith(search);
  });

  if (limit && !isNaN(limit)) {
    filteredData = filteredData.slice(0, parseInt(limit));
  }

  if (maxPrice && !isNaN(maxPrice)) {
    filteredData = filteredData.filter(
      (product) => product.price <= parseInt(maxPrice)
    );
  }

  res.status(200).json(filteredData);
});

app.get('/api/v1/products/:productID', (req, res) => {
  const targetId = parseInt(req.params.productID);
  const product = data.products.find((product) => product.id === targetId);

  if (!product) {
    return res.status(404).json({ message: 'That product was not found.' });
  }

  res.status(200).json(product);
});

app.all('*', (req, res) => {
  res.status(404).send('Resource not found');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000....');
});
