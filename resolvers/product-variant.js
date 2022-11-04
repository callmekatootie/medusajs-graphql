const { store } = require('../common/axios')

module.exports = {
  ProductVariant: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  Query: {
    async getProductVariant (parent, args, ctx, info) {
      const { id, ...others } = args

      const res = await store.get(`/variants/${id}`, { params: { ...others } })

      return res.data.variant
    },

    async listProductVariants (parent, args, ctx, info) {
      const res = await store.get('/variants', { params: { ...args } })

      const variants = JSON.stringify(res.data.variants)

      return variants
    }
  }
}
