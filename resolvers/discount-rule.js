module.exports = {
  AllocationType: {
    ITEM: 'item',
    TOTAL: 'total'
  },

  DiscountRule: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  DiscountRuleType: {
    FIXED: 'fixed',
    FREESHIPPING: 'free_shipping',
    PERCENTAGE: 'percentage'
  }
}
