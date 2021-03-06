module.exports = (sequelize, DataTypes) => {
  const CollectPoint = sequelize.define('CollectPoint', {
    name: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    complement: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
  })

  CollectPoint.associate = models => {
    CollectPoint.hasMany(models.Order, { foreignKey: 'id', as: 'orders'})
  }

  return CollectPoint
}