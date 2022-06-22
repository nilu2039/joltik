import "reflect-metadata"
import express from "express"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import { UrlsResolver } from "./resolvers/Urls"
import { buildSchema } from "type-graphql"
import mongoose from "mongoose"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

import urlRoutes from "./routes/url"

const main = async () => {
  const app = express()

  const schema = await buildSchema({
    resolvers: [UrlsResolver],
    validate: false,
  })

  await mongoose.connect(process.env.MONGO_URL)

  app.use("/", urlRoutes)

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  })

  app.listen(5000, () => console.log("server running"))
}

main()
