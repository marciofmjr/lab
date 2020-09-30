const routes = require('express').Router()
const fs = require('fs')
const path = require('path')

routes.get('/', (req, res) => {
  res.send('this is the Lab server api')
})

require('./routes/session')(routes)
routes.use(require('./app/main/_middleware/auth'))

fs.readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
  if (file !== 'session.js') {
    require('./routes/' + file)(routes)
  }
})

module.exports = routes