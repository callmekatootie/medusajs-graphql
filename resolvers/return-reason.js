const { GraphQLYogaError } = require('@graphql-yoga/node')
const { admin } = require('../common/axios')

async function _getReturnReason (id) {
  const res = await admin.get(`/return-reasons/${id}`)

  return res.data.return_reason
}

module.exports = {
  Query: {
    async getReturnReason (parent, args, ctx, info) {
      const { id } = args

      return _getReturnReason(id)
    },

    async listReturnReasons (parent, args, ctx, info) {
      const res = await admin.get('/return-reasons')

      return res.data.return_reasons
    }
  },

  ReturnReason: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    },

    async parent_return_reason (parent, args, ctx, info) {
      const { parent_return_reason_id: id } = parent

      if (id) {
        return _getReturnReason(id)
      }

      return null
    }
  },

  Mutation: {
    async createReturnReason (parent, args, ctx, info) {
      const { input } = args

      if (input.metadata) {
        try {
          input.metadata = JSON.parse(input.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await admin.post('/return-reasons', { ...input })

      return res.data.return_reason
    },

    async updateReturnReason (parent, args, ctx, info) {
      const { input: { id, ...others } } = args

      if (others.metadata) {
        try {
          others.metadata = JSON.parse(others.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await admin.post(`/return-reasons/${id}`, { ...others })

      return res.data.return_reason
    },

    async deleteReturnReason (parent, args, ctx, info) {
      const { input } = args

      const res = await admin.delete(`/return-reasons/${input.id}`)

      return res.data
    }
  }
}
