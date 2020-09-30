require('./dotenv')

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}