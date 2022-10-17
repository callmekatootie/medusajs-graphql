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
      const { offset, limit, created_at: createdAt, updated_at: updatedAt } = args

      const params = {}

      if (offset) {
        params.offset = offset
      }

      if (limit) {
        params.limit = limit
      }

      if (createdAt || updatedAt) {
        throw new GraphQLYogaError('created_at or updated_at filter properties are not yet supported')
      }

      const res = await store.get('/regions', { params })

      return res.data.regions
    }
  }
}
