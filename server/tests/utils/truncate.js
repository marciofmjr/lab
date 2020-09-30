const {
  User,
  CollectPoint,
  Doctor
} = require('../../src/app/main/models')

module.exports = async () => {
  await User.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await CollectPoint.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
  await Doctor.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
}