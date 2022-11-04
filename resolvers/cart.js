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
    DRAFT_ORDER: 'draft_order',
    PAYMENT_LINK: 'payment_link',
    SWAP: 'swap'
  },

  Mutation: {
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
