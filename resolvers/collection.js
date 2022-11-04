const { GraphQLYogaError } = require('@graphql-yoga/node')
const { store } = require('../common/axios')

module.exports = {
  Collection: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  Query: {
    async getCollection (parent, args, ctx, info) {
      const { id } = args

      const res = await store.get(`/collections/${id}`)

      return res.data.collection
    },

    async listCollections (parent, args, ctx, info) {
      if (args.created_at || args.updated_at) {
        throw new GraphQLYogaError('created_at and updated_at are not yet supported')
      }

      const res = await store.get('/collections', { params: { ...args } })

      return res.data
    }
  }
}
