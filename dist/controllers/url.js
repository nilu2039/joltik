"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRedirect = void 0;
const path_1 = __importDefault(require("path"));
const url_schemm_1 = require("../schema/url.schemm");
const urlRedirect = async (req, res, next) => {
    if (req.params.slug !== "graphql") {
        const url = await url_schemm_1.UrlModel.findOne({
            slug: req.params.slug,
        });
        if (url) {
            res.redirect(url.url);
        }
        else {
            res.sendFile(path_1.default.join(__dirname, "..", "..", "404.html"));
        }
    }
    next();
};
exports.urlRedirect = urlRedirect;
//# sourceMappingURL=url.js.map