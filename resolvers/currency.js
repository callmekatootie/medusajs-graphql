const { GraphQLYogaError } = require('@graphql-yoga/node')
const { admin } = require('../common/axios')

module.exports = {
  Query: {
    async listCurrencies (parent, args, context, info) {
      if (args.order) {
        throw new GraphQLYogaError('order filter property is not yet supported')
      }

      const params = {}

      const fields = [
        'code',
        'includes_tax',
        'offset',
        'limit'
      ]

      fields.forEach(f => {
        if (args[f]) {
          params[f] = args[f]
        }
      })

      const res = await admin.get('/currencies', { params })

      return res.data.currencies
    }
  }
}
