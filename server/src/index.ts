import "reflect-metadata"
import express from 'express'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { ApolloServer } from 'apollo-server-express'
import { createContext } from './context'
import { UserResolver } from './resolvers/UserResolver'
import { TodoResolver } from "./resolvers/TodoResolver"

const PORT = 80

const main = async () => {
  const app = express()

  const schema = await buildSchema({
    resolvers: [UserResolver, TodoResolver],
    container: Container,
    emitSchemaFile: true,
  })

  const server = new ApolloServer({
    schema,
    context: createContext,
  })

  await server.start()
  server.applyMiddleware({ app })

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`)
  })
}

main().catch(e => {
  console.error(e)
})