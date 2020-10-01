'use strict'
const table = 'order_exams'

const data = [
  {
    id: 'ec0f7ce0-e46f-44be-b208-ce4905c72d67',
    order_id: 'f8b54458-f114-4dd8-a444-d57ccea10fa4',
    exam_id: '92fe9d9c-1347-4f81-87fe-52cd26fc617e',
    price: 35,
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: '58694ca2-5925-4f33-bfd0-efb01ef8d86c',
    order_id: 'f8b54458-f114-4dd8-a444-d57ccea10fa4',
    exam_id: '320bf967-3977-46bf-84c9-9844cd821096',
    price: 32.59,
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: '77f9820c-bca4-4e2c-9a54-fa5ac9da5abb',
    order_id: 'e8e13577-6d59-4468-90f4-c722beeed245',
    exam_id: '57d71c9b-22ae-4128-93fd-1b7d9c9c0226', // Hemograma
    price: 50.25,
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
