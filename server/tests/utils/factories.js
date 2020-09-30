const { factory } = require('factory-girl')
const faker = require('faker-br')

const {
  User,
  CollectPoint,
  Doctor
} = require('../../src/app/main/models')

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

const cpName = faker.address.streetName()
const cpZipcode = faker.address.zipCode()
const cpStreet = faker.address.streetAddress()
const cpNumber = Math.floor(Math.random() * (1000 - 100) + 100)
const cpNeighborhood = faker.address.streetAddress()
const cpState = faker.address.stateAbbr()
const cpCity = faker.address.city()
const cpAddress = `${cpStreet}, ${cpNumber} - ${cpNeighborhood}, ${cpCity} - ${cpState}, ${cpZipcode}`

factory.define('CollectPoint', CollectPoint, {
  name: cpName,
  zipcode: cpZipcode.replace('-', ''),
  street: cpStreet,
  number: cpNumber,
  complement: '',
  neighborhood: cpNeighborhood,
  state: cpState,
  city: cpCity,
  address: cpAddress,
})

const specialities = ['Cardiologista', 'Dermatologista', 'Endocrinologista', 'Neurologista', 'Nutricionista', 'Oftalmologista', 'Ortopedista', 'Otorrinolaringologista', 'Pneumologista']
const specialtyIndex = Math.floor(Math.random() * ((specialities.length - 1) - 0) + 0)

factory.define('Doctor', Doctor, {
  name: faker.name.findName(),
  specialty: specialities[specialtyIndex],
})

module.exports = factory