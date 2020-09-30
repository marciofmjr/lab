const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const RESPONSE = require('./../../services/responses')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return RESPONSE.with401(res, 'token not provided')
  }

  const [, token] = authHeader.split(' ')

  try {
    const authenticatedUser = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    req.authenticatedUser = authenticatedUser
    return next()
  } catch (err) {
    return RESPONSE.with401(res, 'invalid token')
  }
}