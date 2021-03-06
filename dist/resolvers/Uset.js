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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = exports.Url = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = require("mongoose");
let Url = class Url extends defaultClasses_1.TimeStamps {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Url.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Url.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Url.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    (0, typegoose_1.prop)({ type: () => [String], default: [] }),
    __metadata("design:type", mongoose_1.Types.Array)
], Url.prototype, "urls", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ default: Date.now() }),
    __metadata("design:type", Date)
], Url.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ default: () => Date.now() }),
    __metadata("design:type", Date)
], Url.prototype, "updatedAt", void 0);
Url = __decorate([
    (0, type_graphql_1.ObjectType)()
], Url);
exports.Url = Url;
exports.UrlModel = (0, typegoose_1.getModelForClass)(Url);
//# sourceMappingURL=Uset.js.map