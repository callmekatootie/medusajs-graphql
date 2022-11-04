const { store } = require('../common/axios')

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
  },

  Query: {
    async listShippingOptions (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')

      const res = await store.get('/shipping-options', {
        params: { ...args },
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.shipping_options
    },

    async listShippingOptionsForCart (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')

      const res = await store.get(`/shipping-options/${args.cart_id}`, {
        params: { ...args },
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.shipping_options
    }
  }
}
