const inspector = require('schema-inspector')
const sanitization = {
  type: 'object',
  strict: true,
  properties: {
    date: {
      type: 'string'
    },
    healthInsurance: {
      type: 'string'
    },
    customerId: {
      type: 'string'
    },
    doctorId: {
      type: 'string'
    },
    collectPointId: {
      type: 'string'
    }
  }
}
module.exports = (model) => {
  return inspector.sanitize(sanitization, model).data
}
