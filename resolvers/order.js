const { store } = require('../common/axios')

module.exports = {
  FulfillmentStatus: {
    CANCELED: 'canceled',
    FULFILLED: 'fulfilled',
    NOTFULFILLED: 'not_fulfilled',
    PARTIALLYFULFILLED: 'partially_fulfilled',
    PARTIALLYRETURNED: 'partially_returned',
    PARTIALLYSHIPPED: 'partially_shipped',
    RETURNED: 'returned',
    REQUIRESACTION: 'requires_action',
    SHIPPED: 'shipped'
  },

  Order: {
    metadata: (parent, args, context, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  OrderStatus: {
    ARCHIVED: 'archived',
    CANCELED: 'canceled',
    COMPLETED: 'completed',
    PENDING: 'pending',
    REQUIRES_ACTION: 'requires_action'
  },

  PaymentStatus: {
    AWAITING: 'awaiting',
    CANCELED: 'canceled',
    CAPTURED: 'captured',
    NOTPAID: 'not_paid',
    PARTIALLYREFUNDED: 'partially_refunded',
    REFUNDED: 'refunded',
    REQUIRESACTION: 'requires_action'
  },

  Query: {
    async getOrder (parent, args, context, info) {
      const { id } = args

      const res = await store.get(`/orders/${id}`)

      return res.data.order
    },

    async getOrderByCartId (parent, args, context, info) {
      const { cart_id: id } = args

      const res = await store.get(`/orders/cart/${id}`)

      return res.data.order
    },

    async getOrderByLookup (parent, args, context, info) {
      const res = await store.get('/orders', { params: { ...args } })

      return res.data.order
    }
  }
}
