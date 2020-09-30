// 422 = Unprocessable Entity
module.exports = (res, message = null) => {
  const body = { error: true }

  if (message) {
    body.message = message
  }

  return res.status(422).json(body)
}