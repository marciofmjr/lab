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

    await factory.create('Doctor', {
      name: 'Natal Alameda',
      specialty: 'Otorrinolaringologista'
    })
    await factory.create('Doctor', {
      name: 'Tatiani Avenida',
      specialty: 'Oftalmologista'
    })
    await factory.create('Doctor', {
      name: 'Iarali Rodovia',
      specialty: 'Endocrinologista'
    })
    await factory.create('Doctor', {
      name: 'Srta. Anailza Albuquerque',
      specialty: 'Neurologista'
    })
    await factory.create('Doctor', {
      name: 'Afonso Silva',
      specialty: 'Nutricionista'
    })
  })

  it('GET to /doctors, should return doctors as expected', async () => {
    const response = await request(app)
      .get('/doctors/')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const doctors = response.body.data
    doctors.forEach((doctor) => {
      expect(doctor).toHaveProperty('id')
      expect(doctor).toHaveProperty('createdAt')
      expect(doctor).toHaveProperty('updatedAt')

      delete doctor.id
      delete doctor.createdAt
      delete doctor.updatedAt
    })

    expect(doctors).toEqual([{
      name: 'Natal Alameda',
      specialty: 'Otorrinolaringologista'
    }, {
      name: 'Tatiani Avenida',
      specialty: 'Oftalmologista'
    }, {
      name: 'Iarali Rodovia',
      specialty: 'Endocrinologista'
    }, {
      name: 'Srta. Anailza Albuquerque',
      specialty: 'Neurologista'
    }, {
      name: 'Afonso Silva',
      specialty: 'Nutricionista'
    }])
  })

  it('GET to /doctors?limit=2&order=name, should return doctors as expected', async () => {
    const response = await request(app)
      .get('/doctors?limit=2&order=name')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const doctors = response.body.data
    doctors.forEach((doctor) => {
      expect(doctor).toHaveProperty('id')
      expect(doctor).toHaveProperty('createdAt')
      expect(doctor).toHaveProperty('updatedAt')

      delete doctor.id
      delete doctor.createdAt
      delete doctor.updatedAt
    })

    expect(doctors).toEqual([{
      name: 'Afonso Silva',
      specialty: 'Nutricionista'
    }, {
      name: 'Iarali Rodovia',
      specialty: 'Endocrinologista'
    }])
  })
})