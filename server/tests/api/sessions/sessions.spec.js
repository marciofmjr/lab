const request = require('supertest')
const app = require('../../../src/app')

const factory = require('../../utils/factories')
const truncate = require('../../utils/truncate')

describe('Success', () => {
  beforeEach(async () => await truncate())

  it('Given a valid user email and password, should authenticate and return 200', async () => {
    await factory.create('User', {
      email: 'admin@laboratorio.com',
      password: '@abc123#!'
    })
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@laboratorio.com',
        password: '@abc123#!'
      })

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)
  })

  it('Given a valid user credentials, should authenticate and return user and JWT token', async () => {
    await factory.create('User', {
      email: 'stevejobs@hotmail.com',
      password: 'au17ah@13al9#$'
    })
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'stevejobs@hotmail.com',
        password: 'au17ah@13al9#$'
      })

    expect(response.body.error).toBe(false)
    expect(response.body.data).toHaveProperty('user')
    expect(response.body.data).toHaveProperty('token')

    expect(response.body.data.user).toHaveProperty('id')
    delete response.body.data.user.id

    expect(response.body.data.user).toHaveProperty('name')
    delete response.body.data.user.name

    expect(response.body.data.user).toHaveProperty('email')
    delete response.body.data.user.email

    expect(response.body.data.user).toHaveProperty('createdAt')
    delete response.body.data.user.createdAt

    expect(response.body.data.user).toHaveProperty('updatedAt')
    delete response.body.data.user.updatedAt
  })

})

describe('Errors', () => {
  beforeEach(async () => await truncate())

  it('Given a non-existent user email and password, should return 401', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'whareever@gmail.com',
        password: 'xxxxx'
      })

    expect(response.status).toBe(401)
    expect(response.body.error).toBe(true)
    expect(response.body.message).toEqual('user not found')
  })

})