const { GraphQLYogaError } = require('@graphql-yoga/node')
const { store } = require('../common/axios')

module.exports = {
  Product: {
    metadata: (parent, args, context, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  ProductStatus: {
    DRAFT: 'draft',
    PROPOSED: 'proposed',
    PUBLISHED: 'published',
    REJECTED: 'rejected'
  },

  Query: {
    async getProduct (parent, args, context, info) {
      const { id, ...others } = args

      const res = await store.get(`/products/${id}`, { params: { ...others } })

      return res.data.product
    },

    async listProducts (parent, args, context, info) {
      if (args.created_at || args.updated_at) {
        throw new GraphQLYogaError('created_at or updated_at or deleted_at property is not yet supported')
      }

      const params = {}

      const fields = [
        'collection_id',
        'description',
        'handle',
        'id',
        'is_giftcard',
        'q',
        'tags',
        'title',
        'type'
      ]

      fields.forEach(f => {
        if (args[f]) {
          params[f] = args[f]
        }
      })

      const res = await store.get('/products', { ...params })

      return res.data
    },

    async searchProducts (parent, args, context, info) {
      const res = await store.post('/products/search', {}, { params: { ...args } })

      const hits = JSON.stringify(res.data.hits)

      return { hits }
    }
  }
}
