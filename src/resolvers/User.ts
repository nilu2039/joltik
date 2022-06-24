import { User, UserModel } from "../schema/user.schema"
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql"
import { hash, verify } from "argon2"
import { MyContext } from "src/utils/types"

declare module "express-session" {
  interface Session {
    userId: string
  }
}

@ObjectType()
class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User | null
}
@Resolver()
export class UserResolver {

  @Mutation(() => UserResponse, {nullable: true})
  async login (
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse | null> {
    

    const user = await UserModel.findOne({email})
    if(!user) {
      return {
        errors: [{
          field: "email",
          message: "email doesn't exist"
        }]
      }
    }


      const verifyPassword = await verify(user.password, password)

      if(!verifyPassword) {
        return {
          errors: [{
            field: "password",
            message: "invalid password"
          }]
        }
      }


    req.session.userId = user._id

    return {user}


  }

  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse | null> {
    if (password === "") {
      return {
        errors: [
          {
            field: "hi",
            message: "hello",
          },
        ],
      }
    }


    const hashedPassword = await hash(password)


    try {

      const user = await UserModel.create({
        email,
        password: hashedPassword,
        // urls: [{ url: email, slug: password }],
      })
      req.session.userId = user._id
      return { user }
    } catch (error) {

      console.log(error)

      if (error.code === 11000) {

        return {
          errors: [{
            field: "email",
            message: "email already exists"
          }]
        }
      }

    }

    return null
  }
}
