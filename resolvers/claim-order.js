module.exports = {
  ClaimFulfillmentStatus: {
    NOTFULFILLED: 'not_fulfilled',
    PARTIALLYFULFILLED: 'partially_fulfilled',
    FULFILLED: 'fulfilled',
    PARTIALLYSHIPPED: 'partially_shipped',
    SHIPPED: 'shipped',
    PARTIALLYRETURNED: 'partially_returned',
    RETURNED: 'returned',
    CANCELED: 'canceled',
    REQUIRESACTION: 'requires_action'
  },

  ClaimOrder: {
    metadata: (parent, args, context, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  ClaimPaymentStatus: {
    NA: 'na',
    NOTREFUNDED: 'not_refunded',
    REFUNDED: 'refunded'
  },

  ClaimType: {
    REFUND: 'refund',
    REPLACE: 'replace'
  }
}
