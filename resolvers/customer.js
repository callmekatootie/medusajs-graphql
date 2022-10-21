const { GraphQLYogaError } = require('@graphql-yoga/node')
const { store } = require('../common/axios')

module.exports = {
  Customer: {
    metadata: (parent, args, context, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  Mutation: {
    async createCustomer (parent, args, context, info) {
      const { input } = args

      const res = await store.post('/customers', { ...input })

      return res.data.customer
    },

    async createShippingAddress (parent, args, context, info) {
      const auth = context.request.headers.get('x-api-key')
      const { input } = args

      if (input.metadata) {
        try {
          input.metadata = JSON.parse(input.metadata)
        } catch (error) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await store.post('/customers/me/addresses', { address: { ...input } }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.customer
    },

    async deleteShippingAddress (parent, args, context, info) {
      const auth = context.request.headers.get('x-api-key')
      const { input } = args

      const res = await store.delete(`/customers/me/addresses/${input.id}`, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return (await res).data.customer
    },

    async storeResetPassword (parent, args, context, info) {
      const { input } = args

      const res = await store.post('/customers/password-reset', { ...input })

      return res.data.customer
    },

    async storeResetPasswordToken (parent, args, context, info) {
      const { input } = args

      await store.post('/customers/password-token', { ...input })

      return { success: true }
    },

    async updateCustomer (parent, args, context, info) {
      const auth = context.request.headers.get('x-api-key')
      const { input } = args

      if (input.metadata) {
        try {
          input.metadata = JSON.parse(input.metadata)
        } catch (error) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await store.post('/customers/me', { ...input }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.customer
    },

    async updateShippingAddress (parent, args, context, info) {
      const auth = context.request.headers.get('x-api-key')
      const { input: { id, ...others } } = args

      if (others.metadata) {
        try {
          others.metadata = JSON.parse(others.metadata)
        } catch (error) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await store.post(`/customers/me/addresses/${id}`, { ...others }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.customer
    }
  },

  PaymentMethodsResponse: {
    data: (parent, args, context, info) => {
      if (parent.data) {
        return JSON.stringify(parent.data)
      }

      return null
    }
  },

  Query: {
    async getCurrentCustomer (parent, args, context, info) {
      const auth = context.request.headers.get('x-api-key')

      const res = await store.get('/auth', {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.customer
    },

    async getPaymentMethods (parent, args, context, info) {
      const auth = context.request.headers.get('x-api-key')

      const res = await store.get('/customers/me/payment-methods', {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.payment_methods
    }
  }
}
