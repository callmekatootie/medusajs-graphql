const { GraphQLYogaError } = require('@graphql-yoga/node')
const { store } = require('../common/axios')

module.exports = {
  Cart: {
    context: (parent, args, ctx, info) => {
      if (parent.context) {
        return JSON.stringify(parent.context)
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

  CartType: {
    CLAIM: 'claim',
    DEFAULT: 'default',
    DRAFTORDER: 'draft_order',
    PAYMENTLINK: 'payment_link',
    SWAP: 'swap'
  },

  CompleteCartType: {
    CART: 'cart',
    ORDER: 'order',
    SWAP: 'swap'
  },

  Mutation: {
    async addLineItem (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      const res = await store.post(`/carts/${id}/line-items`, { ...others }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async addShippingMethod (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      const res = await store.post(`/carts/${id}/shipping-methods`, { ...others }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async calculateCartTaxes (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { id } = args

      const res = await store.post(`/carts/${id}/taxes`, {}, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async completeCart (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { id } = args

      const res = await store.post(`/carts/${id}/complete`, {}, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return { type: res.data.type, data: JSON.stringify(res.data.data) }
    },

    async createCart (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')

      const { input } = args

      if (input.context) {
        try {
          input.context = JSON.parse(input.context)
        } catch (error) {
          throw new GraphQLYogaError('context is not a valid string representation of an object')
        }
      }

      const res = await store.post('/carts', { ...input }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async createPaymentSessions (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id } } = args

      const res = await store.post(`/carts/${id}/payment-sessions`, {}, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async deleteLineItem (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      const res = await store.delete(`/carts/${id}/line-items/${others.line_id}`, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async deletePaymentSession (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      const res = await store.delete(`/carts/${id}/payment-sessions/${others.provider_id}/refresh`, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async refreshPaymentSession (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      const res = await store.post(`/carts/${id}/payment-sessions/${others.provider_id}/refresh`, {}, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async removeDiscount (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      const res = await store.delete(`/carts/${id}/discounts/${others.code}`, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async selectPaymentSession (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      const res = await store.post(`/carts/${id}/payment-session`, { ...others }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async updateCart (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      if (others.context) {
        try {
          others.context = JSON.parse(others.context)
        } catch (err) {
          throw new GraphQLYogaError('context is not a valid string representation of an object')
        }
      }

      if (others.billing_address?.metadata) {
        try {
          others.billing_address.metadata = JSON.parse(others.billing_address.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata in billing address is not a valid string representation of an object')
        }
      }

      if (others.shipping_address?.metadata) {
        try {
          others.shipping_address.metadata = JSON.parse(others.shipping_address.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata in shipping address is not a valid string representation of an object')
        }
      }

      const res = await store.post(`/carts/${id}`, { ...others }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async updateLineItem (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      const res = await store.post(`/carts/${id}/line-items/${others.line_id}`, { quantity: others.quantity }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    },

    async updatePaymentSession (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      try {
        others.data = JSON.parse(others.data)
      } catch (err) {
        throw new GraphQLYogaError('data is not a valid string representation of an object')
      }

      const res = await store.post(`/carts/${id}/payment-sessions/${others.provider_id}`, { data: { ...others.data } }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    }
  },

  Query: {
    async getCart (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { id } = args

      const res = await store.get(`/carts/${id}`, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.cart
    }
  }
}
