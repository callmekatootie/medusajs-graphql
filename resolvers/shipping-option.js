module.exports = {
  ShippingOption: {
    data: (parent, args, ctx, info) => {
      if (parent.data) {
        return JSON.stringify(parent.data)
      }

      return null
    },

    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  ShippingOptionPriceType: {
    FLATRATE: 'flat_rate',
    CALCULATED: 'calculated'
  }
}
