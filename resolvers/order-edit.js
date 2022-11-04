const { store } = require('../common/axios')

module.exports = {
  Mutation: {
    async completeOrderEdit (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input } = args

      const res = await store.get(`/order-edits/${input.id}/complete`, {}, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.order_edit
    },

    async declineOrderEdit (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input } = args

      const res = await store.get(`/order-edits/${input.id}/decline`, { declined_reason: input.declines_reason }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.order_edit
    }
  },

  OrderEditStatus: {
    CANCELED: 'canceled',
    CONFIRMED: 'confirmed',
    CREATED: 'created',
    DECLINED: 'declined',
    REQUESTED: 'requested'
  },

  Query: {
    async getOrderEdit (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')

      const res = await store.get(`/order-edits/${args.id}`, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.order_edit
    }
  }
}
