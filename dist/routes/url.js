"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_1 = require("../controllers/url");
const router = (0, express_1.Router)();
router.get("/:slug", url_1.urlRedirect);
exports.default = router;
//# sourceMappingURL=url.js.map