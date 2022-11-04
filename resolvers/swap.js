const { store } = require('../common/axios')

module.exports = {
  Mutation: {
    async createSwap (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input } = args

      const res = await store.post('/swaps', { ...input }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.swap
    }
  },

  Swap: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  SwapFulfillmentStatus: {
    CANCELED: 'canceled',
    FULFILLED: 'fulfilled',
    NOTFULFILLED: 'not_fulfilled',
    PARTIALLYSHIPPED: 'partially_shipped',
    REQUIRESACTION: 'requires_action',
    SHIPPED: 'shipped'
  },

  SwapPaymentStatus: {
    AWAITING: 'awaiting',
    CANCELED: 'canceled',
    CAPTURED: 'captured',
    CONFIRMED: 'confirmed',
    DIFFERENCEREFUNDED: 'difference_refunded',
    NOTPAID: 'not_paid',
    PARTIALLYREFUNDED: 'partially_refunded',
    REFUNDED: 'refunded',
    REQUIRESACTION: 'requires_action'
  },

  Query: {
    async getByCartId (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input } = args

      const res = await store.get(`/swaps/${input.cart_id}`, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.swap
    }
  }
}
