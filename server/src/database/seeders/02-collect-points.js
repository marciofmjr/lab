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
  },
  {
    id: '1cf63872-07fe-4f4a-8632-f1ad6ca40b04',
    name: 'UBS Solo Sagrado',
    zipcode: '15044265',
    street: 'R. Beatriz da Conceição',
    number: '406',
    complement: '',
    neighborhood: 'Solo Sagrado',
    state: 'SP',
    city: 'São José do Rio Preto',
    address: 'R. Beatriz da Conceição, 406 - Solo Sagrado, São José do Rio Preto - SP, 15044-265',
    created_at: '2020-09-29T21:00:00.000Z',
    updated_at: '2020-09-29T21:00:00.000Z',
  },
  {
    id: '5e5ad8e0-d845-4a6f-a52e-a55b95a310e6',
    name: 'UBS Eldorado',
    zipcode: '15043430',
    street: 'Av. Nova Granada',
    number: '3320',
    complement: '',
    neighborhood: 'Eldorado',
    state: 'SP',
    city: 'São José do Rio Preto',
    address: 'Av. Nova Granada, 3320 - Eldorado, São José do Rio Preto - SP, 15043-430',
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
