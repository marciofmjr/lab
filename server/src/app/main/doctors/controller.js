const { Doctor } = require('./../models')
const RESPONSE = require('./../../services/responses')
const mapper = require('./mapper')
const querify = require('./../../services/querify')

class DoctorController {
  async list(req, res) {
    try {
      const q = querify(req.query, ['name'])
      if (q.error) {
        return RESPONSE.with422(res, q.message)
      }
      const doctors = await Doctor.findAll(q.query)
      return RESPONSE.with200(res, mapper.toModels(doctors), 'doctors listed successfully')
    } catch (error) {
      return RESPONSE.with500(res, error)
    }
  }
}

module.exports = new DoctorController()