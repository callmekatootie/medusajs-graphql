let axios = require('axios').default

// https://github.com/axios/axios/issues/5044
if (!axios) {
  axios = require('axios')
}

const store = axios.create({
  baseURL: `${process.env.MEDUSA_SERVER}/store`,
  headers: {
    Cookie: `connect.sid=${process.env.STORE_API_TOKEN}`
  }
})

const admin = axios.create({
  baseURL: `${process.env.MEDUSA_SERVER}/admin`,
  headers: {
    Authorization: `Bearer ${process.env.ADMIN_API_TOKEN}`
  }
})

module.exports = { store, admin }
