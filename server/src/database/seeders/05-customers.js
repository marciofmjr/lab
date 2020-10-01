'use strict'
const table = 'customers'

const data = [
  {
    id: 'eb844938-94f4-4a9a-ac4a-e2ce69930078',
    name: 'Marcio Junior',
    birthday: '1994-10-05T12:00:00.000Z',
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
  },
  {
    id: '9454bb49-869b-4e36-903d-94c1636bbefd',
    name: 'Livia Maria',
    birthday: '1997-04-19T12:00:00.000Z',
    gender: 'F',
    zipcode: '15041585',
    street: 'R. Antonio Carlos de Oliveira Bottas',
    number: '1820',
    complement: 'Casa C19',
    neighborhood: 'Parque Res. Universo',
    state: 'SP',
    city: 'São José do Rio Preto',
    address: 'R. Antonio Carlos de Oliveira Bottas, 1820 - Parque Res. Universo, São José do Rio Preto - SP, 15041-585',
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
