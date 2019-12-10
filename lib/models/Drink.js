const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isLiquid: {
    type: Boolean,
    required: true
  },
  isAlcoholic: {
    type: Boolean,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  bestEnjoyedWhen: {
    type: String,
    enum: ['morning', 'afternoon', 'evening'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Drink', schema);
