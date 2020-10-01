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
  },
  {
    id: '57d71c9b-22ae-4128-93fd-1b7d9c9c0226',
    name: 'Hemograma',
    price: 20,
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: '2a99dfd4-22bf-4a31-ae83-86994ff7062c',
    name: 'Glicemia em jejum',
    price: 10.5,
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: 'c977750c-3cbf-4cb5-b9f6-96d53591ca8e',
    name: 'Colesterol e triglicerídeos',
    price: 12.99,
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
