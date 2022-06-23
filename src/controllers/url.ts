import { NextFunction, Request, Response } from "express"
import path from "path"
import { UrlModel } from "../schema/url.schemm"

export const urlRedirect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("slug", req.params.slug)

  if (req.params.slug !== "graphql") {
    const url = await UrlModel.findOne({
      slug: req.params.slug,
    })

    if (url) {
      // console.log(url.url)
      res.redirect(url.url)
    } else {
      res.sendFile(path.join(__dirname, "..", "..", "404.html"))
    }
  }
  next()
}
