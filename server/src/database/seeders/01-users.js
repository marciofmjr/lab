'use strict'

const data = [
  {
    id: 'bd5e4770-01ea-413a-9b8e-f7319dffa6e4',
    name: 'Marcio Junior',
    email: 'marcio@laboratorio.com',
    password_hash: '$2a$08$qtAsVfukqxjnfkyx0HYlOuM9YeKbGv5XXwoBOeu0B.q2NsEA.d7Pm', // admin123
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  }
]

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', data)
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
