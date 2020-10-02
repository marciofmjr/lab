const { Order, Exam, OrderExam } = require('./../models')
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
      const orderExams = []

      for (const exam of sanitizedPayload.exams) {
        const orderExamRow = await OrderExam.create({
          orderId: order.id,
          examId: exam.id,
          price: exam.price
        })
        const orderExam = JSON.parse(JSON.stringify(orderExamRow))
        const fullExam = await Exam.findOne({ where: { id: exam.id } })
        orderExams.push({
          id: orderExam.id,
          name: fullExam.name,
          price: orderExam.price
        })
      }

      const orderMapped = mapper.toModel(order)
      orderMapped.exams = orderExams
      return RESPONSE.with200(res, orderMapped, 'user created successfully')
    } catch (error) {
      return RESPONSE.with500(res, error)
    }
  }

  async list(req, res) {
    try {
      const q = querify(req.query, ['date', 'id'])
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