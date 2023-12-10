const router = require('express').Router()

const Pokemon = require('../models/Pokemon')

// Create - criação de dados
router.post('/', async (req, res) => {
  //req.body
  const { types, name, legendary, hp, attack, defense, speed, generation } =
    req.body

  if (!types) {
    res.status(422).json({ error: 'O tipo é obrigatório!' })
    return
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

// Read - leitura de dados
router.get('/', async (rec, res) => {
  try {
    const pokemons = await Pokemon.find()

    res.status(200).json(pokemons)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  // extrair o dado da requisição pela url = req.params
  const id = req.params.id

  try {
    const pokemon = await Pokemon.findOne({ _id: id })

    if (!pokemon) {
      res.status(422).json({ message: 'o pokémon não foi encontrado!' })
      return
    }

    res.status(200).json(pokemon)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { types, name, legendary, hp, attack, defense, speed, generation } =
    req.body

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

  try {
    const updatedPokemon = await Pokemon.updateOne({ _id: id }, pokemon)

    if (updatedPokemon.matchedCount == 0) {
      res.status(422).json({ message: 'o pokémon não foi encontrado!' })
      return
    }

    res.status(200).json(pokemon)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// Delete - deletar dados
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const pokemon = await Pokemon.findOne({ _id: id })

  if (!pokemon) {
    res.status(422).json({ message: 'o pokémon não foi encontrado!' })
    return
  }

  try {
    await Pokemon.deleteOne({ _id: id })

    res.status(200).json({ message: 'Pokémon removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
