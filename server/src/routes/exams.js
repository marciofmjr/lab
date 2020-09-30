const ExamController = require('./../app/main/exams/controller')

module.exports = routes => {
  routes.get('/exams', ExamController.list)
}