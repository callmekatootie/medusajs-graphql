module.exports = {
  Return: {
    metadata: (parent, args, context, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    },

    shipping_data: (parent, args, context, info) => {
      if (parent.shipping_data) {
        return JSON.stringify(parent.shipping_data)
      }

      return null
    }
  }
}
