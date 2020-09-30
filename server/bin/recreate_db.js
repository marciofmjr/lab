const config = require('../src/config/database')
const { Client } = require('pg')

const createDB = async () => {
  try {
    const client = new Client({
      user: config.username,
      host: config.host,
      password: config.password,
      port: 5432,
    })

    await client.connect()

    const query1 = await client.query(`DROP DATABASE IF EXISTS ${config.database}`)
    if (query1.rows && query1.rows[0] && query1.rows[0].message) { console.log( query1.rows[0].message)}

    const query2 = await client.query(`CREATE DATABASE ${config.database} LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0;`)
    if (query2.rows && query2.rows[0] && query2.rows[0].message) { console.log( query2.rows[0].message)}

    console.log('=== DATABASE CREATE SUCCESSFULLY  ===')

    await client.end()
    process.exit(0)
  } catch (error) {
    console.log('CATCH', error)
    process.exit(1)
  }
}

createDB()