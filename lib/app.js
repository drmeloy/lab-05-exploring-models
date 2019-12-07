require('dotenv').config();
require('./utils/connect')();
const Drink = require('./models/Drink');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ drinks: ['coffee', 'orange juice', 'milk', 'beer', 'cider', 'wine'] });
});

app.get('/drinks', (req, res) => {
  Drink.find()
    .then(response => {
      res.send(response);
    });
});

app.post('/drinks', (req, res) => {
  Drink.create(req.body)
    .then(drink => {
      res.send(drink);
    });
});

app.put('/drinks/:id', (req, res) => {
  Drink.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedItem => {
      res.send(updatedItem);
    });
});

app.delete('/drinks/:id', (req, res) => {
  Drink.findByIdAndDelete(req.params.id)
    .then(deletedItem => {
      res.send(deletedItem);
    });
});

app.delete('/drinks', (req, res) => {
  return mongoose.connection.dropDatabase()
    .then(() => {
      res.send('All drinks deleted');
    });
});

module.exports = app;
