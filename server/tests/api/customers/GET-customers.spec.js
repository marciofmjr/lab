const request = require('supertest')
const app = require('./../../../src/app')
const factory = require('./../../utils/factories')
const truncate = require('./../../utils/truncate')

describe('Success', () => {
  let TOKEN = ''

  beforeAll(async () => {
    await truncate()
    const USER = await factory.create('User')
    TOKEN = await USER.generateToken()

    await factory.create('Customer', {
      name: 'Marcio Junior',
      gender: 'M',
      birthday: '1994-10-05',
      zipcode: '15040420',
      street: 'R. Elza Foelkel Bergamo',
      number: '425',
      complement: '',
      neighborhood: 'Macedo Telles',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Elza Foelkel Bergamo, 425 - Macedo Telles, São José do Rio Preto - SP, 15044-265',
    })

    await factory.create('Customer', {
      name: 'Livia Maria',
      gender: 'F',
      birthday: '1997-04-21',
      zipcode: '15041585',
      street: 'R. Antonio Carlos de Oliveira Bottas',
      number: '1820',
      complement: 'Casa C19',
      neighborhood: 'Parque Res. Universo',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Antonio Carlos de Oliveira Bottas, 1820 - Parque Res. Universo, São José do Rio Preto - SP, 15041-585',
    })
  })

  it('GET to /customers, should return customers as expected', async () => {
    const response = await request(app)
      .get('/customers/')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const customers = response.body.data
    customers.forEach((customer) => {
      expect(customer).toHaveProperty('id')
      expect(customer).toHaveProperty('createdAt')
      expect(customer).toHaveProperty('updatedAt')

      delete customer.id
      delete customer.createdAt
      delete customer.updatedAt
    })

    expect(customers).toEqual([{
      name: 'Marcio Junior',
      birthday: '1994-10-05T00:00:00.000Z',
      gender: 'M',
      zipcode: '15040420',
      street: 'R. Elza Foelkel Bergamo',
      number: '425',
      complement: '',
      neighborhood: 'Macedo Telles',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Elza Foelkel Bergamo, 425 - Macedo Telles, São José do Rio Preto - SP, 15044-265'
    }, {
      name: 'Livia Maria',
      birthday: '1997-04-21T00:00:00.000Z',
      gender: 'F',
      zipcode: '15041585',
      street: 'R. Antonio Carlos de Oliveira Bottas',
      number: '1820',
      complement: 'Casa C19',
      neighborhood: 'Parque Res. Universo',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Antonio Carlos de Oliveira Bottas, 1820 - Parque Res. Universo, São José do Rio Preto - SP, 15041-585'
    }])
  })

  it('GET to /customers?limit=1&order=name, should return customers as expected', async () => {
    const response = await request(app)
      .get('/customers?limit=1&order=name')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const customers = response.body.data
    customers.forEach((customer) => {
      expect(customer).toHaveProperty('id')
      expect(customer).toHaveProperty('createdAt')
      expect(customer).toHaveProperty('updatedAt')

      delete customer.id
      delete customer.createdAt
      delete customer.updatedAt
    })

    expect(customers).toEqual([{
      name: 'Livia Maria',
      birthday: '1997-04-21T00:00:00.000Z',
      gender: 'F',
      zipcode: '15041585',
      street: 'R. Antonio Carlos de Oliveira Bottas',
      number: '1820',
      complement: 'Casa C19',
      neighborhood: 'Parque Res. Universo',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Antonio Carlos de Oliveira Bottas, 1820 - Parque Res. Universo, São José do Rio Preto - SP, 15041-585'
    }])
  })
})