'use strict';

import express from 'express';
const hostname = 'localhost';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    cat_id: 12,
    name: 'Fluffy',
    birthdate: '2018-01-01',
    weight: 5.2,
    owner: 'Jafar',
    image: 'localhost:3000/public/cat.png',
  };
  res.json(cat);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use('/public', express.static('public'));
