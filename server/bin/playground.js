async function run () {
  const moment = require('moment-timezone')
  const factory = require('../tests/utils/factories')
  const truncate = require('../tests/utils/truncate')
  const { Op } = require('sequelize')
  const faker = require('faker-br')
  await truncate()

  const {
    User,
    CollectPoint,
    Doctor,
    Exam,
    Customer,
    Order,
    OrderExam
  } = require('../src/app/main/models')

  // const newGroup = await factory.create('Group')

  const exam1 = await factory.create('Exam', {
    name: 'Eletro'
  })
  const exam2 = await factory.create('Exam', {
    name: 'Eco'
  })
  const customer = await factory.create('Customer')
  const doctor = await factory.create('Doctor')
  const collectPoint = await factory.create('CollectPoint')

  // const orders = await Order.findAll({ include: 'exams' })
  // const ordersFormatted = JSON.parse(JSON.stringify(orders))
  // console.log(ordersFormatted[0].exams)

  const order = await factory.create('Order', {
    healthInsurance: 'UBS',
    customerId: customer.id,
    doctorId: doctor.id,
    collectPointId: collectPoint.id
  })

  // const a = await order.setExams(exam1, { price: 2 })
  const a = await OrderExam.create({
    orderId: order.id,
    examId: exam1.id,
    price: 12312
  })
  // console.log(a)
  console.log(JSON.parse(JSON.stringify(a)))


  // const groups = await Group.findAll({
  //   // include: ['permissions']
  //   include: [{
  //     model: Permission,
  //     as: 'permissions',
  //     required: false,
  //     attributes: ['id', 'name'],
  //     through: {
  //       model: GroupPermission,
  //       as: 'groupPermissions',
  //       attributes: []
  //     }
  //   }]
  // })
  // groups.forEach((group) => {
  //   const data = JSON.parse(JSON.stringify(group))
  //   console.log(data)
  // })

  // const groupPermissions = await GroupPermission.findAll()
  // groupPermissions.forEach((groupPermission) => {
  //   const data = JSON.parse(JSON.stringify(groupPermission))
  //   console.log(`GROUP PERMISSION ID: ${data.id}, NAME: ${data.name}`)
  // })

  // const groups = await Group.findAll()
  // groups.forEach((group) => {
  //   const data = JSON.parse(JSON.stringify(group))
  //   console.log(`GROUP ID: ${data.id}, NAME: ${data.name}`)
  // })

  // const permissions = await Permission.findAll()
  // permissions.forEach((group) => {
  //   const data = JSON.parse(JSON.stringify(group))
  //   console.log(`GROUP ID: ${data.id}, NAME: ${data.name}`)
  // })
}

run()