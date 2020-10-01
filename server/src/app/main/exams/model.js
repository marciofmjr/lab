module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('Exam', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE
  })

  Exam.associate = models => {
    Exam.belongsToMany(models.Order, {
      through: 'order_exams',
      foreignKey: 'examId',
      as: 'orders'
    })
  }

  return Exam
}