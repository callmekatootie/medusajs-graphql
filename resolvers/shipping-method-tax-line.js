module.exports = {
  ShippingMethodTaxLine: {
    metadata: (parent, args, context, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  }
}
