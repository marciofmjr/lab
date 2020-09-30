'use strict'
const table = 'exams'

const data = [
  {
    id: '92fe9d9c-1347-4f81-87fe-52cd26fc617e',
    name: 'Ecocardiograma',
    price: 35,
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: '320bf967-3977-46bf-84c9-9844cd821096',
    name: 'Eletrocardiograma',
    price: 32.59,
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  }
]

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(table, data)
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete(table, null, {})
  }
}
