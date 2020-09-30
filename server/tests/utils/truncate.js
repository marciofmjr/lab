const {
  User,
  CollectPoint,
  Doctor,
  Exam,
  Customer
} = require('../../src/app/main/models')

module.exports = async () => {
  await User.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await CollectPoint.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await Doctor.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await Exam.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await Customer.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
}