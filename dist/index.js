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
const url_1 = __importDefault(require("./routes/url"));
const main = async () => {
    const app = (0, express_1.default)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [Urls_1.UrlsResolver],
        validate: false,
    });
    await mongoose_1.default.connect(process.env.MONGO_URL);
    app.use("/", url_1.default);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        csrfPrevention: true,
        plugins: [apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground],
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