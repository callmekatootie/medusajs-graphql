module.exports = {
  ShippingMethod: {
    data: (parent, args, context, info) => {
      if (parent.data) {
        return JSON.stringify(parent.data)
      }

      return null
    }
  }
}
