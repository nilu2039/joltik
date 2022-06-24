import { getModelForClass, prop } from "@typegoose/typegoose"
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { Field, ObjectType } from "type-graphql"
import mongoose from "mongoose"

@ObjectType()
export class Url extends TimeStamps {
  @Field(() => String)
  public _id: mongoose.Types.ObjectId

  @Field()
  @prop()
  public url: string

  @Field()
  @prop()
  public slug: string


  @Field()
  @prop({ required: true })
  public userId: string

  @Field()
  @prop({ default: Date.now() })
  public createdAt: Date

  @Field()
  @prop({ default: () => Date.now() })
  public updatedAt: Date
}

export const UrlModel = getModelForClass(Url)
