import { Field, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from 'uuid'
import { Category } from "../Category";

interface UserType {
  id: string
  name: string
  email: string
  categories: Category[]
}

type Args = {
  id?: string
  name: string
  email: string
  categories: Category[]
}

@ObjectType({ description: 'ユーザー情報' })
export class User implements UserType {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  categories: Category[]

  constructor(args: Args) {
    this.id = args.id ?? uuidv4()
    this.name = args.name
    this.email = args.email
    this.categories = args.categories
  }
}