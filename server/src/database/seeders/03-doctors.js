'use strict'
const table = 'doctors'

const data = [
  {
    id: '8e007ded-2b0d-4f65-8762-f16085cd47ad',
    name: 'Dr Carlos Antônio Júnior',
    specialty: 'Cardiologista',
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: 'e01b7d6b-1b82-4493-91a6-4ea797c6c896',
    name: 'Dra Roberta Martins',
    specialty: 'Pediatra',
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
