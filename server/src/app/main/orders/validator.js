const inspector = require('schema-inspector')
const validation = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      optional: false
    },
    healthInsurance: {
      type: 'string',
      optional: false
    },
    customerId: {
      type: 'uuid',
      optional: false
    },
    doctorId: {
      type: 'uuid',
      optional: false
    },
    collectPointId: {
      type: 'uuid',
      optional: false
    }
  }
}
module.exports = (model) => {
  return inspector.validate(validation, model)
}
