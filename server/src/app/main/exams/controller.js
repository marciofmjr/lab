const { Exam } = require('./../models')
const RESPONSE = require('./../../services/responses')
const mapper = require('./mapper')
const querify = require('./../../services/querify')

class ExamController {
  async list(req, res) {
    try {
      const q = querify(req.query, ['name'])
      if (q.error) {
        return RESPONSE.with422(res, q.message)
      }
      const exams = await Exam.findAll(q.query)
      return RESPONSE.with200(res, mapper.toModels(exams), 'exams listed successfully')
    } catch (error) {
      return RESPONSE.with500(res, error)
    }
  }
}

module.exports = new ExamController()