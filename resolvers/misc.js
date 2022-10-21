const { store } = require('../common/axios')

module.exports = {
  Query: {
    async doesEmailExist (parent, args, context, info) {
      const { email } = args

      const res = await store.get(`/auth/${email}`)

      return res.data
    }
  }
}
