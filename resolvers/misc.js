const { store } = require('../common/axios')

module.exports = {
  Query: {
    async doesEmailExist (parent, args, ctx, info) {
      const { email } = args

      const res = await store.get(`/auth/${email}`)

      return res.data
    }
  }
}
