'use strict'

const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../config/database')
const db = {}
const glob = require('glob')

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const files = glob.sync('src/app/main/**/model.js')
files.forEach((file) => {
  file = file.split('src/app/main/')
  file = file[1]
  const modelPath = path.join(__dirname, file)
  const model = require(modelPath)(sequelize, Sequelize.DataTypes)
  db[model.name] = model
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
