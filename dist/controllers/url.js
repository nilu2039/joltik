"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRedirect = void 0;
const url_schemm_1 = require("../schema/url.schemm");
const urlRedirect = async (req, res) => {
    console.log(req.params.slug);
    const url = await url_schemm_1.UrlModel.findOne({
        slug: req.params.slug,
    });
    if (url) {
        console.log(url.url);
        res.redirect(url.url);
    }
};
exports.urlRedirect = urlRedirect;
//# sourceMappingURL=url.js.map