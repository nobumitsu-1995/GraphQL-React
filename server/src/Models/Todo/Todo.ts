import { Field } from "type-graphql"
import { TodoStatus } from "./TodoStatus"
import { v4 as uuidv4 } from 'uuid'

interface TodoType {
  id: string
  content: string
  status: TodoStatus
}

type Args = {
  id?: string
  content: string
  status: TodoStatus
}

export class Todo implements TodoType {
  @Field()
  id: string

  @Field()
  content: string

  @Field(() => TodoStatus)
  status: TodoStatus

  constructor(args: Args) {
    this.id = args.id ?? uuidv4()
    this.content = args.content
    this.status = args.status
  }
}