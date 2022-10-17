const { admin } = require('../common/axios')
const { GraphQLYogaError } = require('@graphql-yoga/node')

module.exports = {
  Query: {
    async listCurrencies (parent, args, context, info) {
      const {
        code,
        includes_tax: includesTax,
        order,
        offset,
        limit
      } = args

      if (order) {
        throw new GraphQLYogaError('order filter property is not yet supported')
      }

      const params = {}

      if (code) {
        params.code = code
      }

      if (includesTax) {
        params.includes_tax = includesTax
      }

      if (offset) {
        params.offset = offset
      }

      if (limit) {
        params.limit = limit
      }

      const res = await admin.get('/currencies', { params })

      return res.data.currencies
    }
  },
  Mutation: {
    async updateCurrency (parent, args, context, info) {
      throw new GraphQLYogaError('updateCurrency mutation is not yet supported')

      // const { input: { code, includes_tax: includesTax } } = args

      // const res = await admin.post(`/currencies/${code}`, { includes_tax: includesTax })

      // return res.data.currency
    }
  }
}
