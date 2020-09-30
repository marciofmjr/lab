const clone = require('clone')

class SessionMapper {
  toRow (model) {
    model = JSON.parse(JSON.stringify(model))
    const row = clone(model)

    delete row.passwordHash
    delete row.password_hash

    return row
  }

  toModel (row) {
    row = JSON.parse(JSON.stringify(row))
    const model = clone(row)

    delete model.passwordHash
    delete model.password_hash

    return model
  }

  toRows (models) {
    const self = this
    const rows = (Array.from(models).map((model) => self.toRow(model)))
    return rows
  }

  toModels (rows) {
    const self = this
    const models = (Array.from(rows).map((row) => self.toModel(row)))
    return models
  }
}

module.exports = new SessionMapper()