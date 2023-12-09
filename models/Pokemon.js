const mongoose = require('mongoose')

const Pokemon = mongoose.model('Pokemon', {
  types: [String],
  name: String,
  legendary: Boolean,
  hp: Number,
  attack: Number,
  defense: Number,
  speed: Number,
  generation: Number
})

module.exports = Pokemon
