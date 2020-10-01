const request = require('supertest')
const app = require('./../../../src/app')
const factory = require('./../../utils/factories')
const truncate = require('./../../utils/truncate')

describe('Success', () => {
  let TOKEN = ''
  const CUSTOMERS = []
  const DOCTORS = []
  const COLLECTPOINTS = []

  beforeAll(async () => {
    await truncate()
    const ADMIN = await factory.create('User')
    TOKEN = await ADMIN.generateToken()
    CUSTOMERS[0] = await factory.create('Customer')
    DOCTORS[0] = await factory.create('Doctor')
    COLLECTPOINTS[0] = await factory.create('CollectPoint')
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
        collectPointId: COLLECTPOINTS[0].id
      })

    expect(response.status).toBe(200)
    expect(response.error).toBe(false)

    expect(response.body.data).toHaveProperty('id')
    expect(response.body.data).toHaveProperty('createdAt')
    expect(response.body.data).toHaveProperty('updatedAt')

    delete response.body.data.id
    delete response.body.data.createdAt
    delete response.body.data.updatedAt

    expect(response.body.data).toEqual({
      date: '2020-09-29T21:00:00.000Z',
      healthInsurance: 'Unimed',
      customerId: CUSTOMERS[0].id,
      doctorId: DOCTORS[0].id,
      collectPointId: COLLECTPOINTS[0].id
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
    }])
  })
})