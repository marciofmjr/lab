const CustomerController = require('./../app/main/customers/controller')

module.exports = routes => {
  routes.get('/customers', CustomerController.list)
}