const { GraphQLYogaError } = require('@graphql-yoga/node')
const { store } = require('../common/axios')

module.exports = {
  Query: {
    async getRegion (parent, args, context, info) {
      const { id } = args

      const res = await store.get(`/regions/${id}`)

      let metadata

      if (res.data.region.metadata) {
        metadata = JSON.stringify(res.data.store.metadata)
      }

      return { ...res.data.region, metadata }
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

      res.data.regions.forEach(r => {
        if (r.metadata) {
          r.metadata = JSON.stringify(r.metadata)
        }
      })

      return res.data.regions
    }
  }
}
