const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ drinks: ['coffee', 'orange juice', 'milk', 'beer', 'cider', 'wine'] });
});

app.get('/beers', (req, res) => {
  res.send(['ipa', 'amber', 'stout', 'pale ale', 'porter', 'saison']);
});

app.post('/beers', (req, res) => {
  res.send(req.body);
});

app.put('/beers', (req, res) => {
  res.send(req.body);
});

app.delete('/beers', (req, res) => {
  res.send(req.body + 'deleted');
});
