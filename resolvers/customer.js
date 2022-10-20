const { GraphQLYogaError } = require('@graphql-yoga/node')
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
  }
}
