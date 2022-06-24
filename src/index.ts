import "reflect-metadata"
import express from "express"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import { UrlsResolver } from "./resolvers/Urls"
import { buildSchema } from "type-graphql"
import mongoose from "mongoose"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import Redis from "ioredis"
import session from "express-session"
import connectRedis from "connect-redis"

import urlRoutes from "./routes/url"
import path from "path"
import { UserResolver } from "./resolvers/User"
import { MyContext } from "./utils/types"



const main = async () => {
  const app = express()

  const schema = await buildSchema({
    resolvers: [UrlsResolver, UserResolver],
    validate: false,
  })

  let redis = new Redis()

  let RedisStore = connectRedis(session)

  await mongoose.connect(process.env.MONGO_URL)

  app.use(express.static(path.join(__dirname, "..", "public")))


  app.use("/", urlRoutes)

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redis }),
      saveUninitialized: false,
      secret: "wwidbhiwdbiwdwiugwiudwdb",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 60 * 24 * 20,
        httpOnly: true,
        sameSite: 'lax',
        secure: false
      }
    })
  )

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    context: ({ req, res }): MyContext => ({ req, res, redis })
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  })

  app.listen(5000, () => console.log("server running"))
}

main()
