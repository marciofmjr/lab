const {
  User
} = require('../../src/app/main/models')

module.exports = async () => {
  await User.destroy({ truncate: { cascade: true }, force: true, restartIdentity: true })
}