import { getModelForClass, prop } from "@typegoose/typegoose"
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { Field, ObjectType } from "type-graphql"
import { Types } from "mongoose"

@ObjectType()
class UserUrl {
  @prop({ _id: false })
  _id: string

  @Field()
  @prop()
  public url: string

  @Field()
  @prop()
  public slug: string
}

@ObjectType()
export class User extends TimeStamps {
  @Field(() => String)
  public _id: Types.ObjectId

  @Field()
  @prop()
  public email: string

  @Field()
  @prop()
  public password: string

  @Field(() => [UserUrl])
  @prop({ type: () => [UserUrl], default: [] })
  public urls: UserUrl[]

  @Field()
  @prop({ default: Date.now() })
  public createdAt: Date

  @Field()
  @prop({ default: () => Date.now() })
  public updatedAt: Date
}

export const UserModel = getModelForClass(User)
