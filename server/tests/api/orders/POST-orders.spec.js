const request = require('supertest')
const app = require('./../../../src/app')
const factory = require('./../../utils/factories')
const truncate = require('./../../utils/truncate')

describe('Success', () => {
  let TOKEN = ''
  const CUSTOMERS = []
  const DOCTORS = []
  const COLLECTPOINTS = []
  const EXAMS = []

  beforeAll(async () => {
    await truncate()
    const ADMIN = await factory.create('User')
    TOKEN = await ADMIN.generateToken()
    CUSTOMERS[0] = await factory.create('Customer')
    DOCTORS[0] = await factory.create('Doctor')
    COLLECTPOINTS[0] = await factory.create('CollectPoint')
    EXAMS[0] = await factory.create('Exam', { name: 'Eletro' })
    EXAMS[1] = await factory.create('Exam', { name: 'Eco' })
  })

  it('POST to /orders with valid payload, should create order', async () => {
    const response = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({
        date: '2020-09-29T21:00:00.000Z',
        healthInsurance: 'Unimed',
        customerId: CUSTOMERS[0].id,
        doctorId: DOCTORS[0].id,
        collectPointId: COLLECTPOINTS[0].id,
        exams: [
          { id: EXAMS[0].id, price: 25 },
          { id: EXAMS[1].id, price: 50 }
        ]
      })

    expect(response.status).toBe(200)
    expect(response.error).toBe(false)

    expect(response.body.data).toHaveProperty('id')
    expect(response.body.data).toHaveProperty('createdAt')
    expect(response.body.data).toHaveProperty('updatedAt')

    delete response.body.data.id
    delete response.body.data.createdAt
    delete response.body.data.updatedAt

    for (var exam of response.body.data.exams) {
      expect(exam).toHaveProperty('id')
      delete exam.id
    }

    expect(response.body.data).toEqual({
      date: '2020-09-29T21:00:00.000Z',
      healthInsurance: 'Unimed',
      customerId: CUSTOMERS[0].id,
      doctorId: DOCTORS[0].id,
      collectPointId: COLLECTPOINTS[0].id,
      exams: [
        { name: EXAMS[0].name, price: 25 },
        { name: EXAMS[1].name, price: 50 }
      ]
    })
  })
})

describe('Errors', () => {
  let TOKEN = ''
  beforeAll(async () => {
    await truncate()
    const ADMIN = await factory.create('User')
    TOKEN = await ADMIN.generateToken()
  })

  beforeEach(async () => await truncate())

  it('POST to /orders without payload, should not create order', async () => {
    const response = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({})

    expect(response.status).toBe(422)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toEqual([{
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
      property: '@.exams',
    }])
  })
})