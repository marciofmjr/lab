module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    name: DataTypes.STRING,
    specialty: DataTypes.STRING
  })

  Doctor.associate = models => {
    Doctor.hasMany(models.Order, { foreignKey: 'id', as: 'orders'})
  }

  return Doctor
}