import { Field } from "type-graphql"
import { User } from "../User"
import { v4 as uuidv4 } from 'uuid'

interface CategoryType {
  id: string
  name: string
  isDefault: boolean
  user? :User
}

type Args = {
  name: string
  isDefault: boolean
  user?: User
}

export class Category implements CategoryType {
  @Field()
  id: string
  
  @Field()
  name: string
  
  @Field()
  isDefault: boolean
  
  @Field(() => User)
  user?: User

  constructor(args: Args) {
    this.id = uuidv4()
    this.name = args.name
    this.isDefault = !!args.isDefault
    this.user = args.isDefault ? undefined : args.user
  }
}