const { User } = require('./../models')
const RESPONSE = require('./../../services/responses')
const mapper = require('./mapper')

class SessionController {
  async create(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({
        where: { email }
      })

      if (!user) {
        return RESPONSE.with401(res, 'user not found')
      }

      if (!(await user.checkPassword(password))) {
        return RESPONSE.with401(res, 'incorrect password')
      }

      return RESPONSE.with200(res, {
        user: mapper.toModel(user),
        token: await user.generateToken()
      })
    } catch (error) {
      return RESPONSE.with500(res, error)
    }
  }
}

module.exports = new SessionController()