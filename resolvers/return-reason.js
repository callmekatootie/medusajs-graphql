const { GraphQLYogaError } = require('@graphql-yoga/node')
const { admin } = require('../common/axios')

async function _getReturnReason (id) {
  const res = await admin.get(`/return-reasons/${id}`)

  let metadata

  if (res.data.return_reason.metadata) {
    metadata = JSON.stringify(res.data.return_reason.metadata)
  }

  res.data.return_reason.return_reason_children.forEach(r => {
    if (r.metadata) {
      r.metadata = JSON.stringify(r.metadata)
    }
  })

  return { ...res.data.return_reason, metadata }
}

module.exports = {
  Query: {
    async getReturnReason (parent, args, context, info) {
      const { id } = args

      return _getReturnReason(id)
    },

    async listReturnReasons (parent, args, context, info) {
      const res = await admin.get('/return-reasons')

      res.data.return_reasons.forEach(r => {
        if (r.metadata) {
          r.metadata = JSON.stringify(r.metadata)
        }
      })

      return res.data.return_reasons
    }
  },

  Mutation: {
    async createReturnReason (parent, args, context, info) {
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

    async updateReturnReason (parent, args, context, info) {
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

    async deleteReturnReason (parent, args, context, info) {
      const { input } = args

      const res = await admin.delete(`/return-reasons/${input.id}`)

      return res.data
    }
  },

  ReturnReason: {
    async parent_return_reason (parent, args, context, info) {
      const { parent_return_reason_id: id } = parent

      if (id) {
        return _getReturnReason(id)
      }

      return null
    }
  }
}
