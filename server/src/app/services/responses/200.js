module.exports = (res, data, message = null) => {
  const body = {
    error: false,
    data
  }

  if (message) {
    body.message = message
  }

  return res.status(200).json(body)
}