const DoctorController = require('./../app/main/doctors/controller')

module.exports = routes => {
  routes.get('/doctors', DoctorController.list)
}