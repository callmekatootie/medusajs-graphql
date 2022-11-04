module.exports = {
  PaymentSession: {
    data: (parent, args, ctx, info) => {
      if (parent.data) {
        return JSON.stringify(parent.data)
      }

      return null
    }
  },

  PaymentSessionStatus: {
    AUTHORIZED: 'authorized',
    CANCELED: 'canceled',
    ERROR: 'error',
    PENDING: 'pending',
    REQUIRESMORE: 'requires_more'
  }
}
