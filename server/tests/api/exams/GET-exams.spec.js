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

    await factory.create('Exam', {
      name: 'Holter',
      price: 25.98
    })
    await factory.create('Exam', {
      name: 'Eletrocardiograma',
      price: 31
    })
    await factory.create('Exam', {
      name: 'Ecocardiograma',
      price: 120.21
    })
  })

  it('GET to /exams, should return exams as expected', async () => {
    const response = await request(app)
      .get('/exams/')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const exams = response.body.data
    exams.forEach((exam) => {
      expect(exam).toHaveProperty('id')
      expect(exam).toHaveProperty('createdAt')
      expect(exam).toHaveProperty('updatedAt')

      delete exam.id
      delete exam.createdAt
      delete exam.updatedAt
    })

    expect(exams).toEqual([{
      name: 'Holter',
      price: 25.98
    }, {
      name: 'Eletrocardiograma',
      price: 31
    }, {
      name: 'Ecocardiograma',
      price: 120.21
    }])
  })

  it('GET to /exams?limit=1&order=name, should return exams as expected', async () => {
    const response = await request(app)
      .get('/exams?limit=1&order=name')
      .set('Authorization', `Bearer ${TOKEN}`)

    expect(response.status).toBe(200)
    expect(response.body.error).toBe(false)

    const exams = response.body.data
    exams.forEach((exam) => {
      expect(exam).toHaveProperty('id')
      expect(exam).toHaveProperty('createdAt')
      expect(exam).toHaveProperty('updatedAt')

      delete exam.id
      delete exam.createdAt
      delete exam.updatedAt
    })

    expect(exams).toEqual([{
      name: 'Ecocardiograma',
      price: 120.21
    }])
  })
})