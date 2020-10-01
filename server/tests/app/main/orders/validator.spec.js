const validator = require('./../../../../src/app/main/orders/validator')

describe('Success', () => {
  it('Given a valid payload, it should not return errors', () => {
    const validate = validator({
      date: '2020-09-29T21:00:00.000Z',
      healthInsurance: 'Unimed',
      customerId: '78b42265-ebbc-43b8-b275-722e19b780e1',
      doctorId: 'e68c3cc5-e914-4ef4-a0a8-aaae970c90b4',
      collectPointId: '5fb260b6-8805-49e9-8963-447bbf235166',
      exams: [
        { id: 'eac7707c-5bb6-47e0-82d7-51dedd4d1c00', price: 25 }
      ]
    })
    expect(validate.valid).toBe(true)
    expect(validate.error).toEqual([])
  })
})

describe('Errors', () => {
  it('Given a empty payload, it should return errors', () => {
    const validate = validator({})
    expect(validate.valid).toBe(false)
    expect(validate.error).toEqual([{
      code: null,
      reason: 'optional',
      message: 'is missing and not optional',
      property: '@.date'
    }, {
      code: null,
      reason: 'optional',
      message: 'is missing and not optional',
      property: '@.healthInsurance'
    }, {
      code: null,
      reason: 'optional',
      message: 'is missing and not optional',
      property: '@.customerId'
    }, {
      code: null,
      reason: 'optional',
      message: 'is missing and not optional',
      property: '@.doctorId'
    }, {
      code: null,
      reason: 'optional',
      message: 'is missing and not optional',
      property: '@.collectPointId'
    }, {
      code: null,
      reason: 'optional',
      message: 'is missing and not optional',
      property: '@.exams'
    }])
  })
})