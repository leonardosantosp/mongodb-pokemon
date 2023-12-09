const router = require('express').Router()

const Pokemon = require('../models/Pokemon')

// Create - criação de dados
router.post('/', async (req, res) => {
  //req.body
  const { types, name, legendary, hp, attack, defense, speed, generation } =
    req.body

  if (!types) {
    res.status(422).json({ error: 'O nome é obrigatório!' })
  }

  const pokemon = {
    types,
    name,
    legendary,
    hp,
    attack,
    defense,
    speed,
    generation
  }

  // create
  try {
    // criando dados
    await Pokemon.create(pokemon)

    res
      .status(201)
      .json({ message: 'Pokemon inserido no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
