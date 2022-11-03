module.exports = {
  Fulfillment: {
    data: (parent, args, context, info) => {
      if (parent.data) {
        return JSON.stringify(parent.data)
      }

      return null
    },

    metadata: (parent, args, context, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  }
}
