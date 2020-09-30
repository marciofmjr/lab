const { CollectPoint } = require('./../models')
const RESPONSE = require('./../../services/responses')
const mapper = require('./mapper')
const querify = require('./../../services/querify')

class CollectPointController {
  async list(req, res) {
    try {
      const q = querify(req.query, ['name'])
      if (q.error) {
        return RESPONSE.with422(res, q.message)
      }
      const collectPoints = await CollectPoint.findAll(q.query)
      return RESPONSE.with200(res, mapper.toModels(collectPoints), 'collect points listed successfully')
    } catch (error) {
      return RESPONSE.with500(res, error)
    }
  }
}

module.exports = new CollectPointController()