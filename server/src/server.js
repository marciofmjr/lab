const app = require('./app')
const port = process.env.PORT || 8888
const server = app.listen(port, () => {
  console.log('🚀 Server ready')
  console.log('Address:', server.address().address)
  console.log('Port:', server.address().port)
})