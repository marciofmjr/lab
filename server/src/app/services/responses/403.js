// 403 = Forbidden
module.exports = (res, message = null) => {
  const body = { error: true }

  if (message) {
    body.message = message
  }

  return res.status(403).json(body)
}