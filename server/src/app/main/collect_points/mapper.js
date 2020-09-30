const clone = require('clone')

class CollectPointMapper {
  toRow (model) {
    model = JSON.parse(JSON.stringify(model))
    const row = clone(model)
    return row
  }

  toModel (row) {
    row = JSON.parse(JSON.stringify(row))
    const model = clone(row)
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

module.exports = new CollectPointMapper()