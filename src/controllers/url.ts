import { Request, Response } from "express"
import { UrlModel } from "../schema/url.schemm"

export const urlRedirect = async (req: Request, res: Response) => {
  console.log(req.params.slug)

  const url = await UrlModel.findOne({
    slug: req.params.slug,
  })

  if (url) {
    console.log(url.url)
    res.redirect(url.url)
  }
}
