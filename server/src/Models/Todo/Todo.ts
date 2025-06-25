import { Field, ObjectType } from "type-graphql"
import { TodoStatus } from "./TodoStatus"
import { v4 as uuidv4 } from 'uuid'
import { Category } from "../Category"

interface TodoType {
  id: string
  content: string
  status: TodoStatus
}

type Args = {
  id?: string
  content: string
  status: TodoStatus
  category: Category
}

@ObjectType({ description: 'todo情報' })
export class Todo implements TodoType {
  @Field()
  id: string

  @Field()
  content: string

  @Field(() => TodoStatus)
  status: TodoStatus

  @Field(() => Category)
  category: Category

  constructor(args: Args) {
    this.id = args.id ?? uuidv4()
    this.content = args.content
    this.status = args.status
    this.category = args.category
  }
}