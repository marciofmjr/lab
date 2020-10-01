module.exports = (sequelize, DataTypes) => {
  const OrderExam = sequelize.define('OrderExam', {
    orderId: {
      type: DataTypes.UUID,
      field: 'order_id'
    },
    examId: {
      type: DataTypes.UUID,
      field: 'exam_id'
    },
    price: DataTypes.DOUBLE
  })

  OrderExam.associate = models => {
    OrderExam.belongsTo(models.Exam, {
      through: OrderExam,
      foreignKey: 'examId'
    })
    OrderExam.belongsTo(models.Order, {
      through: OrderExam,
      foreignKey: 'orderId'
    })
  }

  return OrderExam
}