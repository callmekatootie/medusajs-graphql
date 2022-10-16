const path = require('node:path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { createServer } = require('@graphql-yoga/node')

const typeDefFiles = loadFilesSync(path.join(__dirname, 'types'))
const typeDefs = mergeTypeDefs(typeDefFiles)

const resolverFiles = loadFilesSync(path.join(__dirname, 'resolvers'))
const resolvers = mergeResolvers(resolverFiles)

const server = createServer({
  schema: makeExecutableSchema({ typeDefs, resolvers })
})

server.start()
