const querify = require('../../../src/app/services/querify')
const { Op } = require('sequelize')

it('Given: q=name:marcio, should return as expected', async () => {
  const q = querify({ q: 'name:marcio' })
  expect(q.query.where).toEqual({
    name: 'marcio'
  })
  expect(q.error).toEqual(false)
})

it('Given: q=name:marcio,email:marcio@laboratorio.com, should return as expected', async () => {
  const q = querify({ q: 'name:marcio,email:marcio@laboratorio.com'})
  expect(q.query.where).toEqual({
    name: 'marcio',
    email: 'marcio@laboratorio.com'
  })
  expect(q.error).toEqual(false)
})

it('Given: q=name:*via*, should return as expected', async () => {
  const q = querify({ q: 'name:*via*'})
  expect(q.query.where).toEqual({
    name: {
      [Op.iLike]: '%via%'
    }
  })
  expect(q.error).toEqual(false)
})

it('Given: q=name:*via, should return as expected', async () => {
  const q = querify({ q: 'name:*via'})
  expect(q.query.where).toEqual({
    name: {
      [Op.iLike]: '%via'
    }
  })
  expect(q.error).toEqual(false)
})

it('Given: q=name:via*, should return as expected', async () => {
  const q = querify({ q: 'name:via*'})
  expect(q.query.where).toEqual({
    name: {
      [Op.iLike]: 'via%'
    }
  })
  expect(q.error).toEqual(false)
})

it('Given: q=name:via*,email:@laboratorio, should return as expected', async () => {
  const q = querify({ q: 'name:via*,email:@laboratorio'})
  expect(q.query.where).toEqual({
    name: {
      [Op.iLike]: 'via%'
    },
    email: '@laboratorio'
  })
  expect(q.error).toEqual(false)
})

it('Given: q=name:Livia,email:*livia*, should return as expected', async () => {
  const q = querify({ q: 'name:Livia,email:*livia*'})
  expect(q.query.where).toEqual({
    name: 'Livia',
    email: {
      [Op.iLike]: '%livia%'
    }
  })
  expect(q.error).toEqual(false)
})

it('Given: q=password:12345678,email:*livia*, should return as expected', async () => {
  const q = querify({ q: 'password:12345678,email:*livia*'}, ['email'])
  expect(q.query).toEqual({})
  expect(q.error).toEqual(true)
  expect(q.message).toEqual('invalid query params: password')
})

it('Given: q=email:*livia*,password:12345678, should return as expected', async () => {
  const q = querify({ q: 'email:*livia*,password:12345678'}, ['email'])
  expect(q.query).toEqual({})
  expect(q.error).toEqual(true)
  expect(q.message).toEqual('invalid query params: password')
})

it('Given: q=password:12345678,email:*livia*, should return as expected', async () => {
  const q = querify({ q: 'password:12345678,email:*livia*'}, ['name'])
  expect(q.query).toEqual({})
  expect(q.error).toEqual(true)
  expect(q.message).toEqual('invalid query params: password, email')
})

it('Given: q=, should return offset, limit and order as expected', async () => {
  const q = querify({ q: '' })
  expect(q.query).toEqual({
    offset: 0,
    limit: 50,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 0,
    limit: 50,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio&limit=5&page=2&order=name, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '5', page: '2', order: 'name' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 5,
    limit: 5,
    order: ['name']
  })
})

it('Given: q=name:marcio&limit=5, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '5' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 0,
    limit: 5,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio&limit=5&page=1, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '5', page: '1' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 0,
    limit: 5,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio&limit=2&page=2, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '2', page: '2' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 2,
    limit: 2,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio&limit=2&page=3, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '2', page: '3' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 4,
    limit: 2,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio&limit=2&page=4, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '2', page: '4' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 6,
    limit: 2,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio&limit=50&page=1, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '50', page: '1' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 0,
    limit: 50,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio&limit=50&page=2, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '50', page: '2' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 50,
    limit: 50,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio&limit=50&page=3, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '50', page: '3' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 100,
    limit: 50,
    order: ['createdAt']
  })
})

it('Given: q=name:marcio&limit=50&page=3&include=group, should return offset and limit as expected', async () => {
  const q = querify({ q: 'name:marcio', limit: '50', page: '3', include: 'group' })
  expect(q.query).toEqual({
    where: {
      name: 'marcio'
    },
    offset: 100,
    limit: 50,
    order: ['createdAt'],
    include: ['group']
  })
})

it('Given: include=users,groups, should return includes as expected', async () => {
  const q = querify({ include: 'group' })
  expect(q.query).toEqual({
    offset: 0,
    limit: 50,
    order: ['createdAt'],
    include: ['group']
  })
})

// npx jest tests/app/services --watch