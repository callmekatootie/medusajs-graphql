### Authentication

For store related api(s), you will need follow the Authentication instructions located in the [Store REST api documentation](https://docs.medusajs.com/api/store/#section/Authentication). Once you obtain the `{sid}` bit (the string _after_ `connect.sid=`), you will invoke the graphql api with the following header:

```js
{
  "x-api-key": "{sid}"
}
```

Using an example from the Store REST api documentation, your final header would be:

```js
{
  "x-api-key": "s%3A2Bu8BkaP9JUfHu9rG59G16Ma0QZf6Gj1.WT549XqX37PN8n0OecqnMCq798eLjZC5IT7yiDCBHPM"
}
```

### Points to note

- `metadata` is an object in the source api. Graphql converts it to a string (`JSON.stringify()`) when it retrieves the value. When you are passing a value for this field in a mutation, pass the `JSON.strigify()`'ed version of it 

### Implemented Endpoints

#### Admin

- Collection
- Currency
- Return Reason
- Sales Channel
- Store
- User

#### Store

- Region
