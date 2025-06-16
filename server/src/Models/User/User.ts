import { Field, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from 'uuid'

interface UserType {
  id: string
  name: string
  email: string
}

type Args = {
  name: string
  email: string
}

@ObjectType({ description: 'ユーザー情報' })
export class User implements UserType {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  constructor(args: Args) {
    this.id = uuidv4()
    this.name = args.name
    this.email = args.email
  }
}