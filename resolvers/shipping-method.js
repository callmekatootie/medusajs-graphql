module.exports = {
  ShippingMethod: {
    data: (parent, args, ctx, info) => {
      if (parent.data) {
        return JSON.stringify(parent.data)
      }

      return null
    }
  }
}
