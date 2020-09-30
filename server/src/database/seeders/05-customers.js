'use strict'
const table = 'customers'

const data = [
  {
    id: 'eb844938-94f4-4a9a-ac4a-e2ce69930078',
    name: 'Marcio Junior',
    birthday: '1994-10-05',
    gender: 'm',
    zipcode: '15040420',
    street: 'R. Elza Foelkel Bergamo',
    number: '425',
    complement: '',
    neighborhood: 'Macedo Telles',
    state: 'SP',
    city: 'São José do Rio Preto',
    address: 'R. Elza Foelkel Bergamo, 425 - Macedo Telles, São José do Rio Preto - SP, 15040-420',
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
