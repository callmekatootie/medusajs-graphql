module.exports = {
  ClaimItem: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  ClaimReason: {
    MISSINGITEM: 'missing_item',
    WRONGITEM: 'wrong_item',
    PRODUCTIONFAILURE: 'production_failure',
    OTHER: 'other'
  }
}
