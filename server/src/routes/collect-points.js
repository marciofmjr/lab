const CollectPointController = require('./../app/main/collect_points/controller')

module.exports = routes => {
  routes.get('/collect-points', CollectPointController.list)
}