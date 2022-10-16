let axios = require('axios').default
const { GraphQLYogaError } = require('@graphql-yoga/node')

// https://github.com/axios/axios/issues/5044
if (!axios) {
  axios = require('axios')
}

module.exports = {
  Query: {
    async getRegion (parent, args, context, info) {
      const { id } = args

      const res = await axios.get(`http://localhost:9000/store/regions/${id}`)

      return res.data.region
    },

    async listRegions (parent, args, context, info) {
      const { offset, limit, created_at: createdAt, updated_at: updatedAt } = args

      const params = {}

      if (offset) {
        params.offset = offset
      }

      if (limit) {
        params.limit = limit
      }

      if (createdAt || updatedAt) {
        throw new GraphQLYogaError('created_at or updated_at filter properties are not yet supported')
      }

      const res = await axios.get('http://localhost:9000/store/regions', { params })

      return res.data.regions
    }
  }
}
