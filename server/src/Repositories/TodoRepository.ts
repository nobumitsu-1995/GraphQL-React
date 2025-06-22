import { Service } from "typedi";
import { type ITodoRepository, Todo, TodoStatus } from "../Models/Todo";
import { PrismaClient } from "@prisma/client";

const createTodo = (id: string) => {
  const todo = new Todo({
    id,
    content: `${id}のコンテンツ内容`,
    status: TodoStatus.PENDING
  })

  return todo
}

@Service()
export class TodoRepository implements ITodoRepository {
  private prisma = new PrismaClient()

  async findById(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id }
    })

    return todo ? new Todo({
      id: todo.id,
      content: todo.content,
      status: this.isTodoStatus(todo.status) ? todo.status : TodoStatus.PENDING
    }) : null
  }

  async findByIds(ids: readonly string[]) {
    const todos = await this.prisma.todo.findMany({
      where: { id: { in: ids as string[] } }
    })
    return todos.map(todo => new Todo({
      id: todo.id,
      content: todo.content,
      status: this.isTodoStatus(todo.status) ? todo.status : TodoStatus.PENDING
    }))
  }

  private isTodoStatus(status: string): status is TodoStatus  {
    return Object.values(TodoStatus).includes(status as TodoStatus)
  }
}