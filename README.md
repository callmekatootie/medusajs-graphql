### Points to note

- `metadata` is an object in the source api. Graphql converts it to a string (`JSON.stringify()`) when it retrieves the value. When you are passing a value for this field in a mutation, pass the `JSON.strigify()`'ed version of it 
