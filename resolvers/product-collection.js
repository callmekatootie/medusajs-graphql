const { GraphQLYogaError } = require('@graphql-yoga/node')
const { admin } = require('../common/axios')

module.exports = {
  Mutation: {
    async createProductCollection (parent, args, ctx, info) {
      const { input } = args

      if (input.metadata) {
        try {
          input.metadata = JSON.parse(input.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await admin.post('/collections', { ...input })

      return res.data.collection
    },

    async deleteProductCollection (parent, args, ctx, info) {
      const { input } = args

      const res = await admin.delete(`/collections/${input.id}`)

      return res.data
    },

    async updateProductCollection (parent, args, ctx, info) {
      const { input: { id, ...others } } = args

      if (others.metadata) {
        try {
          others.metadata = JSON.parse(others.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await admin.post(`/collections/${id}`, { ...others })

      return res.data.collection
    }
  },

  ProductCollection: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  Query: {
    async getProductCollection (parent, args, ctx, info) {
      const { id } = args

      const res = await admin.get(`/collections/${id}`)

      return res.data.collection
    },

    async listProductCollections (parent, args, ctx, info) {
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

      return res.data.collections
    }
  }
}
