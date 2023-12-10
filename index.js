// config inicial
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

// forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

//rotas da api
const pokemonRoutes = require('./routes/pokemonRoutes')

app.use('/pokemon', pokemonRoutes)
app.use(express.static(path.join(__dirname, 'templates')))

app.get('/pokemons', (req, res) => {
  const pokemonsPath = path.join(__dirname, 'templates', 'pokemons.html')
  res.sendFile(pokemonsPath)
})

app.get('/newpokemon', (req, res) => {
  const newPokemonPath = path.join(__dirname, 'templates', 'newPokemon.html')
  res.sendFile(newPokemonPath)
})

app.get('/editpokemon', (req, res) => {
  const editPokemonPath = path.join(__dirname, 'templates', 'editPokemon.html')
  res.sendFile(editPokemonPath)
})

app.get('/deletepokemon', (req, res) => {
  const deletePokemonPath = path.join(
    __dirname,
    'templates',
    'deletePokemon.html'
  )
  res.sendFile(deletePokemonPath)
})

// rota inicial / endpoint
app.get('/', (req, res) => {
  // mostrar req
  const indexPath = path.join(__dirname, 'templates', 'index.html')
  res.sendFile(indexPath)
  //res.json({ message: 'Oi Express!' })
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.lvjji6c.mongodb.net/bdapicluster?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
  })
  .catch(err => console.log(err))
