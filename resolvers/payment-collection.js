module.exports = {
  PaymentCollection: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  PaymentCollectionStatus: {
    AUTHORIZED: 'authorized',
    AWAITING: 'awaiting',
    CANCELED: 'canceled',
    CAPTURED: 'captured',
    NOTPAID: 'not_paid',
    PARTIALLYAUTHORIZED: 'partially_authorized',
    PARTIALLYCAPTURED: 'partially_captured',
    PARTIALLYREFUNDED: 'partially_refunded',
    REFUNDED: 'refunded',
    REQUIRESACTION: 'requires_action'
  },

  PaymentCollectionType: {
    ORDEREDIT: 'order_edit'
  }
}
