## Store

### Auth

- [ ] Customer Login | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/6)
- [ ] Customer Log out | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/6)
- [x] Get Current Customer
- [x] Check if email exists

### Cart

- [ ] Add a Shipping Method
- [x] Calculate Cart Taxes
- [ ] Complete a Cart
- [x] Create a Cart
- [ ] Add a Line Item
- [ ] Create Payment Sessions
- [ ] Remove Discount
- [ ] Delete a Line Item
- [ ] Update a Line Item
- [ ] Delete a Payment Session
- [ ] Update a Payment Session
- [x] Get a Cart
- [ ] Update a Cart
- [ ] Refresh a Payment Session
- [ ] Select a Payment Session

### Collection

- [x] Get a Collection
- [x] List Collections

### Customer

- [x] Add a Shipping Address
- [x] Create a Customer
- [x] Delete and Address
- [x] Update a Shipping Address
- [x] Get a Customer
- [x] Update Customer
- [x] Get Payment Methods
- [ ] List Orders // TODO
- [x] Request Password Reset
- [x] Reset Password

### Gift Card

- [ ] Get Gift Card by Code | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/7) | This has been implemented but needs a second eye on if its been implemented right. I suspect there could be some admin only stuff here that may not have reflected completely when accessed through store

### Order

- [x] Get by Cart ID
- [x] Get an Order
- [x] Look Up and Order

### Order Edit

Schema implemented. However, a data generation issue remains | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/8)

- [ ] Completes an OrderEdit
- [ ] Decline an OrderEdit
- [ ] Retrieve an OrderEdit

### Product

- [x] Get a Product
- [x] List Products
- [x] Search Products

### Product Variant

- [x] Get a Product Variant
- [x] Get Product Variants

### Region

- [x] Get a Region
- [x] List Regions

### Return

- [ ] Create Return

### Return Reason

- [x] Get a Return Reason
- [x] List Return Reasons

### Shipping Option

- [ ] Get Shipping Options
- [ ] List for Cart

### Swap

- [x] Create a Swap
- [x] Get by Cart Id

## Admin

All admin related endpoints are still being implemented

## Misc

### Filters

- [ ] Currencies | Support `order` filter | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/2)
- [ ] Regions | Support `created_at` and `updated_at` filters | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/1)

### Mutations

- [ ] Currencies | Update a Currency currently fails | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/3)
- [ ] Store | Delete a Currency Code does not work | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/4)

### Others

- [ ] Product Collections | List product collections does not return metadata though their schema indicates it should | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/5)
