'use strict'
const table = 'collect_points'

const data = [
  {
    id: 'dd7de3ab-9d01-4a47-885d-d9d3522ffabe',
    name: 'UBS Santo Antonio',
    zipcode: '15047162',
    street: 'R. Ida Tagliavini Polachini',
    number: '580',
    complement: '',
    neighborhood: 'Jardim Santo Antônio',
    state: 'SP',
    city: 'São José do Rio Preto',
    address: 'R. Ida Tagliavini Polachini, 580 - Jardim Santo Antônio, São José do Rio Preto - SP, 15047-162',
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
