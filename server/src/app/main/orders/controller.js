const { Order } = require('./../models')
const RESPONSE = require('./../../services/responses')
const sanitizer = require('./sanitizer')
const validator = require('./validator')
const mapper = require('./mapper')
const querify = require('./../../services/querify')

class OrderController {
  async create(req, res) {
    try {
      const sanitizedPayload = sanitizer(req.body)
      const validate = validator(sanitizedPayload)

      if (!validate.valid) {
        return RESPONSE.with422(res, validate.error)
      }

      const order = await Order.create(sanitizedPayload)

      return RESPONSE.with200(res, mapper.toModel(order), 'user created successfully')
    } catch (error) {
      return RESPONSE.with500(res, error)
    }
  }

  async list(req, res) {
    try {
      const q = querify(req.query, ['date'])
      if (q.error) {
        return RESPONSE.with422(res, q.message)
      }
      const orders = await Order.findAll(q.query)
      return RESPONSE.with200(res, mapper.toModels(orders), 'orders listed successfully')
    } catch (error) {
      return RESPONSE.with500(res, error)
    }
  }
}

module.exports = new OrderController()