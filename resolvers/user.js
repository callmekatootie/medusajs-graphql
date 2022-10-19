const { GraphQLYogaError } = require('@graphql-yoga/node')
const { admin } = require('../common/axios')

module.exports = {
  UserRole: {
    ADMIN: 'admin',
    MEMBER: 'member',
    DEVELOPER: 'developer'
  },

  Query: {
    async getUser (parent, args, context, info) {
      const { id } = args

      const res = await admin.get(`/users/${id}`)

      let metadata

      if (res.data.user.metadata) {
        metadata = JSON.stringify(res.data.user.metadata)
      }

      return { ...res.data.user, metadata }
    },

    async listUsers (parent, args, context, info) {
      const res = await admin.get('/users')

      res.data.users.forEach(r => {
        if (r.metadata) {
          r.metadata = JSON.stringify(r.metadata)
        }
      })

      return res.data.users
    }
  },

  Mutation: {
    async createUser (parent, args, context, info) {
      const { input } = args

      const res = await admin.post('/users', { ...input })

      let metadata

      if (res.data.user.metadata) {
        metadata = JSON.stringify(res.data.user.metadata)
      }

      return { ...res.data.user, metadata }
    },

    async updateUser (parent, args, context, info) {
      const { input: { id, ...others } } = args

      if (others.metadata) {
        try {
          others.metadata = JSON.parse(others.metadata)
        } catch (err) {
          throw new GraphQLYogaError('metadata is not a valid string representation of an object')
        }
      }

      const res = await admin.post(`/users/${id}`, { ...others })

      let metadata

      if (res.data.user.metadata) {
        metadata = JSON.stringify(res.data.user.metadata)
      }

      return { ...res.data.user, metadata }
    },

    async deleteUser (parent, args, context, info) {
      const { input } = args

      const res = await admin.delete(`/users/${input.id}`)

      return res.data
    },

    async resetPassword (parent, args, context, info) {
      const { input } = args

      const res = await admin.post('/users/password-token', { ...input })

      let metadata

      if (res.data.user.metadata) {
        metadata = JSON.stringify(res.data.user.metadata)
      }

      return { ...res.data.user, metadata }
    },

    async requestPasswordReset (parent, args, context, info) {
      const { input } = args

      await admin.post('/users/password-token', { ...input })

      return { success: true }
    }
  }
}
