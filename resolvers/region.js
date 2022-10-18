const { store } = require('../common/axios')
const { GraphQLYogaError } = require('@graphql-yoga/node')

module.exports = {
  Query: {
    async getRegion (parent, args, context, info) {
      const { id } = args

      const res = await store.get(`/regions/${id}`)

      return res.data.region
      // TODO - Handle 404 if id not found
    },

    async listRegions (parent, args, context, info) {
      if (args.createdAt || args.updatedAt) {
        throw new GraphQLYogaError('created_at or updated_at filter properties are not yet supported')
      }

      const params = {}

      const fields = [
        'offset',
        'limit'
      ]

      fields.forEach(f => {
        if (args[f]) {
          params[f] = args[f]
        }
      })

      const res = await store.get('/regions', { params })

      return res.data.regions
    }
  }
}
