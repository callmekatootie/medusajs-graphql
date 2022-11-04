module.exports = {
  ShippingProfile: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  ShippingProfileType: {
    CUSTOM: 'custom',
    DEFAULT: 'default',
    GIFTCARD: 'gift_card'
  }
}
