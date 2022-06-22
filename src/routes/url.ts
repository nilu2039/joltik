import { Router } from "express"
import { urlRedirect } from "../controllers/url"

const router = Router()

router.get("/:slug", urlRedirect)

export default router
