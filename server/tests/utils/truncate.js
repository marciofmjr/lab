const {
  User,
  CollectPoint,
  Doctor,
  Exam,
  Customer,
  Order,
  OrderExam
} = require('../../src/app/main/models')

module.exports = async () => {
  await OrderExam.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await Order.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await User.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await CollectPoint.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await Doctor.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await Exam.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await Customer.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
}