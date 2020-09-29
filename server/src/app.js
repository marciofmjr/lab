require('./config/dotenv')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')

class AppController {
  constructor() {
    this.express = express()
    this.express.use(cors())
    this.express.use(helmet())
    this.express.use(express.json())
    this.express.use(routes)
  }
}

module.exports = new AppController().express