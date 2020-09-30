const { Op } = require('sequelize')

module.exports = (query, allowedProps = '*') => {
  const querify = {}
  const invalidParams = []
  const queryFormatted = []

  if (query && query.q) {
    const props = query.q.split(',')
    props.forEach((prop) => {
      const data = prop.split(':')
      const name = data[0]
      const value = data[1]
      queryFormatted.push({
        name,
        value
      })
    })
  }

  if (queryFormatted && queryFormatted.length) {
    querify.where = {}

    queryFormatted.forEach((prop) => {
      const name = prop.name
      const value = prop.value

      if (allowedProps !== '*' && !allowedProps.includes(name)) {
        invalidParams.push(name)
      } else {

        // Like *marcio*
        if (value.substring(1, 0) === '*' && value.slice(-1) === '*') {
          let newValue = value.replace('*', '%')
          newValue = newValue.replace('*', '%')
          querify.where[name] = {
            [Op.iLike]: newValue
          }
        }

        // Like *marcio
        else if (value.substring(1, 0) === '*') {
          let newValue = value.replace('*', '%')
          querify.where[name] = {
            [Op.iLike]: newValue
          }
        }

        // Like marcio*
        else if (value.slice(-1) === '*') {
          let newValue = value.replace('*', '%')
          querify.where[name] = {
            [Op.iLike]: newValue
          }
        }

        else {
          querify.where[name] = value
        }
      }
    })
  }

  querify.limit = query && query.limit ? parseInt(query.limit) : 50

  if (query && query.page && parseInt(query.page) !== 1) {
    const index = parseInt(query.page) - 1
    let offset = 0

    for (let i = 1; i <= index; i++) {
      offset += querify.limit
    }

    querify.offset = offset
  } else {
    querify.offset = 0
  }

  if (query && query.order) {
    querify.order = [query.order]
  } else {
    querify.order = ['createdAt']
  }

  if (query && query.include) {
    const includes = []
    const tables = query.include.split(',')
    tables.forEach((table) => {
      includes.push(table)
    })
    querify.include = includes
  }

  if (invalidParams.length) {
    return {
      error: true,
      query: {},
      message: `invalid query params: ${invalidParams.join(', ')}`
    }
  } else {
    return {
      error: false,
      query: querify,
      message: 'success'
    }
  }
}