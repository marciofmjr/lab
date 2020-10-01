'use strict'
const table = 'orders'

const data = [
  {
    id: 'f8b54458-f114-4dd8-a444-d57ccea10fa4',
    date: '2020-09-29T21:00:00.000Z',
    health_insurance: 'Unimed',
    customer_id: 'eb844938-94f4-4a9a-ac4a-e2ce69930078', // Marcio Junior
    doctor_id: '8e007ded-2b0d-4f65-8762-f16085cd47ad', // Cardiologista
    collect_point_id: 'dd7de3ab-9d01-4a47-885d-d9d3522ffabe', // UBS Santo Antonio
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
