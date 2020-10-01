const request = require('supertest')
const app = require('./../../../src/app')
const factory = require('./../../utils/factories')
const truncate = require('./../../utils/truncate')

describe('Success', () => {
  let TOKEN = ''
  const CUSTOMERS = []
  const DOCTORS = []
  const COLLECTPOINTS = []
  const ORDERS = []

  beforeAll(async () => {
    await truncate()
    const USER = await factory.create('User')
    TOKEN = await USER.generateToken()

    CUSTOMERS[0] = await factory.create('Customer')
    DOCTORS[0] = await factory.create('Doctor')
    COLLECTPOINTS[0] = await factory.create('CollectPoint')
    ORDERS[0] = await factory.create('Order', {
      date: '2020-05-05T19:06:29.829Z',
      healthInsurance: 'Unimed',
      customerId: CUSTOMERS[0].id,
      doctorId: DOCTORS[0].id,
      collectPointId: COLLECTPOINTS[0].id
    })

    CUSTOMERS[1] = await factory.create('Customer')
    DOCTORS[1] = await factory.create('Doctor')
    COLLECTPOINTS[1] = await factory.create('CollectPoint')
    ORDERS[1] = await factory.create('Order', {
      date: '2020-10-05T19:06:29.829Z',
      healthInsurance: 'Austa',
      customerId: CUSTOMERS[1].id,
      doctorId: DOCTORS[1].id,
      collectPointId: COLLECTPOINTS[1].id
    })
  })

  it('GET to /orders?limit=2&order=date, should return orders as expected', async () => {
    const response = await request(app)
      .get('/orders?limit=2&order=date')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const orders = response.body.data
    orders.forEach((order) => {
      expect(order).toHaveProperty('id')
      expect(order).toHaveProperty('createdAt')
      expect(order).toHaveProperty('updatedAt')

      delete order.id
      delete order.createdAt
      delete order.updatedAt
    })

    expect(orders).toEqual([{
      date: '2020-05-05T19:06:29.829Z',
      healthInsurance: 'Unimed',
      customerId: CUSTOMERS[0].id,
      doctorId: DOCTORS[0].id,
      collectPointId: COLLECTPOINTS[0].id
    }, {
      date: '2020-10-05T19:06:29.829Z',
      healthInsurance: 'Austa',
      customerId: CUSTOMERS[1].id,
      doctorId: DOCTORS[1].id,
      collectPointId: COLLECTPOINTS[1].id
    }])
  })

  it('GET to /orders?limit=1&order=date&include=customer, should return orders as expected', async () => {
    const response = await request(app)
      .get('/orders?limit=1&order=date&include=customer,doctor,collectPoint')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const orders = response.body.data
    orders.forEach((order) => {
      expect(order).toHaveProperty('id')
      expect(order).toHaveProperty('createdAt')
      expect(order).toHaveProperty('updatedAt')
      delete order.id
      delete order.createdAt
      delete order.updatedAt

      expect(order.collectPoint).toHaveProperty('id')
      expect(order.collectPoint).toHaveProperty('createdAt')
      expect(order.collectPoint).toHaveProperty('updatedAt')
      delete order.collectPoint.id
      delete order.collectPoint.createdAt
      delete order.collectPoint.updatedAt

      expect(order.customer).toHaveProperty('id')
      expect(order.customer).toHaveProperty('birthday')
      expect(order.customer).toHaveProperty('createdAt')
      expect(order.customer).toHaveProperty('updatedAt')
      delete order.customer.id
      delete order.customer.birthday
      delete order.customer.createdAt
      delete order.customer.updatedAt

      expect(order.doctor).toHaveProperty('id')
      expect(order.doctor).toHaveProperty('createdAt')
      expect(order.doctor).toHaveProperty('updatedAt')
      delete order.doctor.id
      delete order.doctor.createdAt
      delete order.doctor.updatedAt
    })

    expect(orders).toEqual([{
      date: '2020-05-05T19:06:29.829Z',
      healthInsurance: 'Unimed',
      customerId: CUSTOMERS[0].id,
      doctorId: DOCTORS[0].id,
      collectPointId: COLLECTPOINTS[0].id,
      customer: {
        name: CUSTOMERS[0].name,
        gender: CUSTOMERS[0].gender,
        zipcode: CUSTOMERS[0].zipcode,
        street: CUSTOMERS[0].street,
        number: CUSTOMERS[0].number,
        complement: '',
        neighborhood: CUSTOMERS[0].neighborhood,
        state: CUSTOMERS[0].state,
        city: CUSTOMERS[0].city,
        address: CUSTOMERS[0].address
      },
      doctor: {
        name: DOCTORS[0].name,
        specialty: DOCTORS[0].specialty
      },
      collectPoint: {
        name: COLLECTPOINTS[0].name,
        zipcode: COLLECTPOINTS[0].zipcode,
        street: COLLECTPOINTS[0].street,
        number: COLLECTPOINTS[0].number,
        complement: COLLECTPOINTS[0].complement,
        neighborhood: COLLECTPOINTS[0].neighborhood,
        state: COLLECTPOINTS[0].state,
        city: COLLECTPOINTS[0].city,
        address: COLLECTPOINTS[0].address,
      }
    }])
  })
})