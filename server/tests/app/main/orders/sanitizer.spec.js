const sanitizer = require('./../../../../src/app/main/orders/sanitizer')

describe('Success', () => {
  it('Given a dirty payload, it should be sanitized', () => {
    const sanitized = sanitizer({
      id: 2,
      archived: false,
      date: '2020-09-29T21:00:00.000Z',
      healthInsurance: 'Unimed',
      name: 'NOME DO CLIENTE',
      code: '000 - 1231323213',
      customerId: '78b42265-ebbc-43b8-b275-722e19b780e1',
      doctorId: 'e68c3cc5-e914-4ef4-a0a8-aaae970c90b4',
      collectPointId: '5fb260b6-8805-49e9-8963-447bbf235166'
    })
    expect(sanitized).toEqual({
      date: '2020-09-29T21:00:00.000Z',
      healthInsurance: 'Unimed',
      customerId: '78b42265-ebbc-43b8-b275-722e19b780e1',
      doctorId: 'e68c3cc5-e914-4ef4-a0a8-aaae970c90b4',
      collectPointId: '5fb260b6-8805-49e9-8963-447bbf235166'
    })
  })
})