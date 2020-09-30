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

    await factory.create('CollectPoint', {
      name: 'UBS Solo Sagrado',
      zipcode: '15044265',
      street: 'R. Beatriz da Conceição',
      number: '406',
      complement: '',
      neighborhood: 'Solo Sagrado',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Beatriz da Conceição, 406 - Solo Sagrado, São José do Rio Preto - SP, 15044-265',
    })

    await factory.create('CollectPoint', {
      name: 'UBS Santo Antonio',
      zipcode: '15047162',
      street: 'R. Ida Tagliavini Polachini',
      number: '580',
      complement: '',
      neighborhood: 'Jardim Santo Antônio',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Ida Tagliavini Polachini, 580 - Jardim Santo Antônio, São José do Rio Preto - SP, 15047-162',
    })
  })

  it('GET to /collect-points, should return collect-points as expected', async () => {
    const response = await request(app)
      .get('/collect-points/')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const collectPoints = response.body.data
    collectPoints.forEach((collectPoint) => {
      expect(collectPoint).toHaveProperty('id')
      expect(collectPoint).toHaveProperty('createdAt')
      expect(collectPoint).toHaveProperty('updatedAt')

      delete collectPoint.id
      delete collectPoint.createdAt
      delete collectPoint.updatedAt
    })

    expect(collectPoints).toEqual([{
      name: 'UBS Solo Sagrado',
      zipcode: '15044265',
      street: 'R. Beatriz da Conceição',
      number: '406',
      complement: '',
      neighborhood: 'Solo Sagrado',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Beatriz da Conceição, 406 - Solo Sagrado, São José do Rio Preto - SP, 15044-265'
    }, {
      name: 'UBS Santo Antonio',
      zipcode: '15047162',
      street: 'R. Ida Tagliavini Polachini',
      number: '580',
      complement: '',
      neighborhood: 'Jardim Santo Antônio',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Ida Tagliavini Polachini, 580 - Jardim Santo Antônio, São José do Rio Preto - SP, 15047-162'
    }])
  })

  it('GET to /collect-points?limit=1&order=name, should return collect-points as expected', async () => {
    const response = await request(app)
      .get('/collect-points?limit=1&order=name')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const collectPoints = response.body.data
    collectPoints.forEach((collectPoint) => {
      expect(collectPoint).toHaveProperty('id')
      expect(collectPoint).toHaveProperty('createdAt')
      expect(collectPoint).toHaveProperty('updatedAt')

      delete collectPoint.id
      delete collectPoint.createdAt
      delete collectPoint.updatedAt
    })

    expect(collectPoints).toEqual([{
      name: 'UBS Santo Antonio',
      zipcode: '15047162',
      street: 'R. Ida Tagliavini Polachini',
      number: '580',
      complement: '',
      neighborhood: 'Jardim Santo Antônio',
      state: 'SP',
      city: 'São José do Rio Preto',
      address: 'R. Ida Tagliavini Polachini, 580 - Jardim Santo Antônio, São José do Rio Preto - SP, 15047-162'
    }])
  })
})