import express from 'express';

const app = express();

app.use(express.json());

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(method, url);
  next();
};

app.use(logger);

app.get('/', (req, res) => {
  res.send('Home');
});
app.get('/about', (req, res) => {
  res.send('About');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000....');
});
