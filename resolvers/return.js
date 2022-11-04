const { store } = require('../common/axios')

module.exports = {
  Mutation: {
    async createReturn (parent, args, ctx, info) {
      const auth = ctx.request.headers.get('x-api-key')
      const { input } = args

      const res = await store.post('/returns', { ...input }, {
        headers: {
          Cookie: `connect.sid=${auth}`
        }
      })

      return res.data.return
    }
  },

  Return: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    },

    shipping_data: (parent, args, ctx, info) => {
      if (parent.shipping_data) {
        return JSON.stringify(parent.shipping_data)
      }

      return null
    }
  }
}
