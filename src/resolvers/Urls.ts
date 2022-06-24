import { Url, UrlModel } from "../schema/url.schemm"
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql"
import { nanoid } from "nanoid"
import { MyContext } from "src/utils/types"


@ObjectType()
class UrlFieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ObjectType()
class UrlResponse {
  @Field(() => Url, { nullable: true })
  url?: Url

  @Field(() => [UrlFieldError], { nullable: true })
  errors?: UrlFieldError[]
}

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

  @Mutation(() => UrlResponse)
  async createShortUrl(
    @Ctx() { req }: MyContext,
    @Arg("url") url: string): Promise<UrlResponse | null> {
    const slug = nanoid()

    if (!req.session.userId) {
      return {
        errors: [{
          field: "user",
          message: "user not logged in"
        }]
      }
    }

    try {
      const short_url = await UrlModel.create({
        url,
        slug,
        userId: req.session.userId
      })
      // console.log(short_url)
      return { url: short_url }
    } catch (error) {
      console.log(error)
      // console.log("errorrs", error.errors.kind, error.errors.path, error.errors.userId.kind)
      return null
    }

  }
}
