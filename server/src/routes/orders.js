const OrderController = require('./../app/main/orders/controller')

module.exports = routes => {
  routes.get('/orders', OrderController.list)
  routes.post('/orders', OrderController.create)
}