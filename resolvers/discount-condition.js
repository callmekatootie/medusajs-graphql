module.exports = {
  DiscountCondition: {
    metadata: (parent, args, ctx, info) => {
      if (parent.metadata) {
        return JSON.stringify(parent.metadata)
      }

      return null
    }
  },

  DiscountConditionOperator: {
    IN: 'in',
    NOTIN: 'not_in'
  },

  DiscountConditionType: {
    CUSTOMERGROUPS: 'customer_groups',
    PRODUCTCOLLECTIONS: 'product_collections',
    PRODUCTS: 'products',
    PRODUCTTAGS: 'product_tags',
    PRODUCTTYPES: 'product_types'
  }
}
