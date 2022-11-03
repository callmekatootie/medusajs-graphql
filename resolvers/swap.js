module.exports = {
  Mutation: {
    async createSwap (parent, args, ctx, info) {
      
    }
  },

  Swap: {
    metadata: (parent, args, context, info) => {
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
  }
}
