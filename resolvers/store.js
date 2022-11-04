const { GraphQLYogaError } = require('@graphql-yoga/node')
const { admin } = require('../common/axios')

module.exports = {
  Query: {
    async getStore (parent, args, ctx, info) {
      const res = await admin.get('/store')

      let metadata

      if (res.data.store.metadata) {
        metadata = JSON.stringify(res.data.store.metadata)
      }

      return { ...res.data.store, metadata }
    },

    async listPaymentProviders (parent, args, ctx, info) {
      const res = await admin.get('/store/payment-providers')

      return res.data.payment_providers
    },

    async listTaxProviders (parent, args, ctx, info) {
      const res = await admin.get('/store/tax-providers')

      return res.data.tax_providers
    }
  },
  Mutation: {
    async updateStore (parent, args, ctx, info) {
      const { input } = args

      if (input.metadata) {
        try {
          input.metadata = JSON.parse(input.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await admin.post('/store', { ...input })

      let metadata

      if (res.data.store.metadata) {
        metadata = JSON.stringify(res.data.store.metadata)
      }

      return { ...res.data.store, metadata }
    },

    async addCurrencyCode (parent, args, ctx, info) {
      const { input } = args

      const res = await admin.post(`/store/currencies/${input.code}`)

      let metadata

      if (res.data.store.metadata) {
        metadata = JSON.stringify(res.data.store.metadata)
      }

      return { ...res.data.store, metadata }
    },

    async deleteCurrencyCode (parent, args, ctx, info) {
      const { input } = args

      const res = await admin.delete(`/store/currencies/${input.code}`)

      let metadata

      if (res.data.store.metadata) {
        metadata = JSON.stringify(res.data.store.metadata)
      }

      return { ...res.data.store, metadata }
    }
  }
}
