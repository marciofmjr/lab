// 401 = Unauthorized
module.exports = (res, message = null) => {
  const body = { error: true }

  if (message) {
    body.message = message
  }

  return res.status(401).json(body)
}