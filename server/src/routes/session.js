const SessionController = require('./../app/main/sessions/controller')

module.exports = routes => {
  routes.post('/sessions', SessionController.create)
}