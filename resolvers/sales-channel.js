const { GraphQLYogaError } = require('@graphql-yoga/node')
const { admin } = require('../common/axios')

module.exports = {
  Query: {
    async listSalesChannels (parent, args, ctx, info) {
      if (args.order) {
        throw new GraphQLYogaError('order filter property is not yet supported')
      }

      if (args.created_at || args.updated_at || args.deleted_at) {
        throw new GraphQLYogaError('created_at or updated_at or deleted_at property is not yet supported')
      }

      const params = {}

      const fields = [
        'id',
        'name',
        'description',
        'q',
        'offset',
        'limit',
        'expand',
        'fields'
      ]

      fields.forEach(f => {
        if (args[f]) {
          params[f] = args[f]
        }
      })

      const res = await admin.get('/sales-channels', { params })

      return res.data.sales_channels
    },

    async getSalesChannel (parent, args, ctx, info) {
      const { id } = args

      const res = await admin.get(`/sales-channels/${id}`)

      return res.data.sales_channel
    }
  },

  Mutation: {
    async createSalesChannel (parent, args, ctx, info) {
      const { input } = args

      const res = await admin.post('/sales-channels', { ...input })

      return res.data.sales_channel
    },

    async updateSalesChannel (parent, args, ctx, info) {
      const { input: { id, ...others } } = args

      const res = await admin.post(`/sales-channels/${id}`, { ...others })

      return res.data.sales_channel
    },

    async deleteSalesChannel (parent, args, ctx, info) {
      const { input } = args

      const res = await admin.delete(`/sales-channels/${input.id}`)

      return res.data
    }
  }
}
