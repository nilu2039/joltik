"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const apollo_server_express_1 = require("apollo-server-express");
const Urls_1 = require("./resolvers/Urls");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_core_1 = require("apollo-server-core");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const url_1 = __importDefault(require("./routes/url"));
const path_1 = __importDefault(require("path"));
const User_1 = require("./resolvers/User");
const main = async () => {
    const app = (0, express_1.default)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [Urls_1.UrlsResolver, User_1.UserResolver],
        validate: false,
    });
    let redis = new ioredis_1.default();
    let RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    await mongoose_1.default.connect(process.env.MONGO_URL);
    app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
    app.use("/", url_1.default);
    app.use((0, express_session_1.default)({
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
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        csrfPrevention: true,
        plugins: [apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground],
        context: ({ req, res }) => ({ req, res, redis })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path: "/graphql",
    });
    app.listen(5000, () => console.log("server running"));
};
main();
//# sourceMappingURL=index.js.map