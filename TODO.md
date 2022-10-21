## Store

## Checklist

- [ ] Ensure attributes are alphabetical
- [ ] Ensure types are alphabetical
- [ ] Ensure resolvers are alphabetical
- [ ] Ensure that required fields come first, alphabetically, followed by optional fields, alphabetically
- [ ] Ensure naming convention is followed in queries and mutations, namely:
  - get and list in queries
  - create, update, delete in mutations

### Auth

- [ ] Customer Login | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/6)
- [ ] Customer Log out | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/6)
- [x] Get Current Customer
- [x] Check if email exists

### Cart

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

- [ ] Get Gift Card by Code | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/7) | This has still been implemented but needs a second eye on if its been implemented right. I suspect there could be some admin only stuff here that may not have reflected completely when accessed through store

### Order

### Order Edit

### Product

### Product Variant

### Region

- [x] Get a Region
- [x] List Regions

### Return

### Return Reason










### Filters

- [ ] Currencies | Support `order` filter | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/2)
- [ ] Regions | Support `created_at` and `updated_at` filters | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/1)

### Mutations

- [ ] Currencies | Update a Currency currently fails | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/3)
- [ ] Store | Delete a Currency Code does not work | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/4)
- [ ] Auth | Login and logout | 

### Others

- [ ] Product Collections | List product collections does not return metadata though their schema indicates it should | [Relevant Issue](https://github.com/callmekatootie/medusajs-graphql/issues/5)
