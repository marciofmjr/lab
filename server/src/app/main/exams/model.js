module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('Exam', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE
  })

  return Exam
}