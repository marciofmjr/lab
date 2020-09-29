const routes = require('express').Router()

routes.get('/', (req, res) => {
  res.send('this is the Lab server api')
})

module.exports = routes