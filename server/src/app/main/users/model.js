const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    passwordHash: {
      type: DataTypes.STRING,
      field: 'password_hash'
    }
  }, {
    hooks: {
      beforeSave: async user => {
        if (user.password) {
          user.passwordHash = await bcrypt.hash(user.password, 8)
        }
      }
    }
  })

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash)
  }

  User.prototype.generateToken = async function () {
    return jwt.sign({
      id: this.id,
      name: this.name,
      email: this.email,
    }, process.env.APP_SECRET)
  }

  return User
}