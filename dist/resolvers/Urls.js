"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlsResolver = void 0;
const url_schemm_1 = require("../schema/url.schemm");
const type_graphql_1 = require("type-graphql");
const nanoid_1 = require("nanoid");
let UrlFieldError = class UrlFieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UrlFieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UrlFieldError.prototype, "message", void 0);
UrlFieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], UrlFieldError);
let UrlResponse = class UrlResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => url_schemm_1.Url, { nullable: true }),
    __metadata("design:type", url_schemm_1.Url)
], UrlResponse.prototype, "url", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [UrlFieldError], { nullable: true }),
    __metadata("design:type", Array)
], UrlResponse.prototype, "errors", void 0);
UrlResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UrlResponse);
let UrlsResolver = class UrlsResolver {
    hello() {
        return "hello world";
    }
    async getUrls() {
        const urls = await url_schemm_1.UrlModel.find();
        console.log(urls);
        return urls;
    }
    async createShortUrl({ req }, url) {
        const slug = (0, nanoid_1.nanoid)();
        if (!req.session.userId) {
            return {
                errors: [{
                        field: "user",
                        message: "user not logged in"
                    }]
            };
        }
        try {
            const short_url = await url_schemm_1.UrlModel.create({
                url,
                slug,
                userId: req.session.userId
            });
            return { url: short_url };
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UrlsResolver.prototype, "hello", null);
__decorate([
    (0, type_graphql_1.Query)(() => [url_schemm_1.Url]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrlsResolver.prototype, "getUrls", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UrlResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("url")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UrlsResolver.prototype, "createShortUrl", null);
UrlsResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UrlsResolver);
exports.UrlsResolver = UrlsResolver;
//# sourceMappingURL=Urls.js.map