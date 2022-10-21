const { store } = require('../common/axios')

module.exports = {
  Mutation: {
    async createCustomer (parent, args, context, info) {
      const { input } = args

      const res = await store.post('/customers', { ...input })

      if (res.data.metadata) {
        res.data.metadata = JSON.stringify(res.data.metadata)
      }

      return res.data.customer
    }
  },

  Query: {
    async doesEmailExist (parent, args, context, info) {
      const { email } = args

      const res = await store.get(`/auth/${email}`)

      return res.data
    },

    async getCurrentCustomer (parent, args, context, info) {
      const auth = context.request.headers.get('x-api-key')

      const res = await store.get('/auth', {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      let metadata

      if (res.data.customer.metadata) {
        metadata = JSON.stringify(res.data.customer.metadata)
      }

      return { ...res.data.customer, metadata }
    }
  }
}
