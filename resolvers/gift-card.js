const { store } = require('../common/axios')

module.exports = {
  GiftCard: {
    metadata: (parent, args, context, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    },

    region: async (parent, args, context, info) => {
      if (parent.region_id) {
        const res = await store.get(`/regions/${parent.region_id}`)

        return res.data.region
      }

      return null
    }
  },

  Query: {
    async getGitCardByCode (parent, args, context, info) {
      const { code } = args

      const res = await store.get(`/gift-cards/${code}`)

      return res.data.gift_card
    }
  }
}
