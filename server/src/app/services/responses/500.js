module.exports = (res, error, message = null) => {
  console.log('@@@@ ERROR @@@@', error)

  const body = { error: true }

  if (message) {
    body.message = message
    console.log('@@@@ MESSAGE @@@@', message)
  }

  body.detail = error

  return res.status(500).json(body)
}