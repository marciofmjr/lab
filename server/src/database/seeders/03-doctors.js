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
    specialty: 'Dermatologista',
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: 'fd52e1fd-29d9-48fd-abfc-19cd17c076d1',
    name: 'Dr Sebastião Filho',
    specialty: 'Endocrinologista',
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: '8dae2fbc-eb8d-4851-ad3d-c80917aad7de',
    name: 'Dra Andressa Mendes',
    specialty: 'Neurologista',
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: '7625a676-ab0e-436e-beb3-fd8700c900e5',
    name: 'Dra Helena da Rocha',
    specialty: 'Oftalmologista',
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
