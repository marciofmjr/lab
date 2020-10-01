module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    date: DataTypes.DATE,
    healthInsurance: {
      type: DataTypes.STRING,
      field: 'health_insurance'
    }
  })

  Order.associate = models => {
    Order.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer'})
    Order.belongsTo(models.Doctor, { foreignKey: 'doctorId', as: 'doctor'})
    Order.belongsTo(models.CollectPoint, { foreignKey: 'collectPointId', as: 'collectPoint'})
    Order.belongsToMany(models.Exam, {
      through: 'order_exams',
      foreignKey: 'orderId',
      as: 'exams'
    })
  }

  return Order
}