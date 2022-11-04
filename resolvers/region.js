const { GraphQLYogaError } = require('@graphql-yoga/node')
const { store, admin } = require('../common/axios')

module.exports = {
  Query: {
    async getRegion (parent, args, ctx, info) {
      const { id } = args

      const res = await store.get(`/regions/${id}`)

      return res.data.region
    },

    async listRegions (parent, args, ctx, info) {
      if (args.createdAt || args.updatedAt) {
        throw new GraphQLYogaError('created_at or updated_at filter properties are not yet supported')
      }

      const params = {}

      const fields = [
        'offset',
        'limit'
      ]

      fields.forEach(f => {
        if (args[f]) {
          params[f] = args[f]
        }
      })

      const res = await store.get('/regions', { params })

      res.data.regions.forEach(r => {
        if (r.metadata) {
          r.metadata = JSON.stringify(r.metadata)
        }
      })

      return res.data.regions
    }
  },

  Region: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  Mutation: {
    async addCountry (parent, args, ctx, info) {
      const { input: { id, ...others } } = args

      const res = await admin.post(`/regions/${id}/countries`, { ...others })

      let metadata

      if (res.data.region.metadata) {
        metadata = JSON.stringify(res.data.region.metadata)
      }

      return { ...res.data.region, metadata }
    }
  }
}
