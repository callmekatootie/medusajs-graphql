const { GraphQLYogaError } = require('@graphql-yoga/node')
const { admin } = require('../common/axios')

module.exports = {
  Query: {
    async getProductCollection (parent, args, context, info) {
      const { id } = args

      const res = await admin.get(`/collections/${id}`)

      let metadata

      if (res.data.collection.metadata) {
        metadata = JSON.stringify(res.data.collection.metadata)
      }

      return { ...res.data.collection, metadata }
    },

    async listProductCollections (parent, args, context, info) {
      if (args.createdAt || args.updatedAt || args.deletedAt) {
        throw new GraphQLYogaError('created_at or updated_at or deleted_at property is not yet supported')
      }

      const params = {}

      const fields = [
        'handle',
        'limit',
        'offset',
        'title',
        'q'
      ]

      fields.forEach(f => {
        if (args[f]) {
          params[f] = args[f]
        }
      })

      const res = await admin.get('/collections', { params })

      res.data.collections.forEach(r => {
        if (r.metadata) {
          r.metadata = JSON.stringify(r.metadata)
        }
      })

      return res.data.collections
    }
  },
  Mutation: {
    async updateProductCollection (parent, args, context, info) {
      const { input: { id, ...others } } = args

      if (others.metadata) {
        try {
          others.metadata = JSON.parse(others.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await admin.post(`/collections/${id}`, { ...others })

      let metadata

      if (res.data.collection.metadata) {
        metadata = JSON.stringify(res.data.collection.metadata)
      }

      return { ...res.data.collection, metadata }
    },

    async createProductCollection (parent, args, context, info) {
      const { input } = args

      if (input.metadata) {
        try {
          input.metadata = JSON.parse(input.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await admin.post('/collections', { ...input })

      let metadata

      if (res.data.collection.metadata) {
        metadata = JSON.stringify(res.data.collection.metadata)
      }

      return { ...res.data.collection, metadata }
    },

    async deleteProductCollection (parent, args, context, info) {
      const { input } = args

      const res = await admin.delete(`/collections/${input.id}`)

      return res.data
    }
  }
}
