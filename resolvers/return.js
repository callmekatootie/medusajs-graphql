module.exports = {
  Return: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    },

    shipping_data: (parent, args, ctx, info) => {
      if (parent.shipping_data) {
        return JSON.stringify(parent.shipping_data)
      }

      return null
    }
  }
}
