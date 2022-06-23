import { User, UserModel } from "../schema/user.schema"
import { Arg, Mutation, Resolver } from "type-graphql"

@Resolver()
export class UserResolver {
  @Mutation(() => User, { nullable: true })
  register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const user = UserModel.create({
      email,
      password,
      // urls: [{ url: email, slug: password }],
    })
    return user
  }
}
