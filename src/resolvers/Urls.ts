import { Url, UrlModel } from "../schema/url.schemm"
import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { nanoid } from "nanoid"

@Resolver()
export class UrlsResolver {
  @Query(() => String)
  hello(): string {
    return "hello world"
  }

  @Query(() => [Url])
  async getUrls() {
    const urls = await UrlModel.find()
    console.log(urls)
    return urls
  }

  @Mutation(() => Url)
  async createShortUrl(@Arg("url") url: string): Promise<Url> {
    const slug = nanoid()

    const data = await UrlModel.create({
      url,
      slug,
    })
    console.log(data)
    return data
  }
}
