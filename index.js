// config inicial
const express = require('express')
const mongoose = require('mongoose')
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

// rota inicial / endpoint
app.get('/', (req, res) => {
  // mostrar req
  res.json({ message: 'Oi Express!' })
})

// entregar uma porta
const DB_USER = 'leo040604'
const DB_PASSWORD = encodeURIComponent('lyAQZFWa6mdbHAWo')

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.lvjji6c.mongodb.net/bdapicluster?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
  })
  .catch(err => console.log(err))
