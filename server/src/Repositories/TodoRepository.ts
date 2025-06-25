import { Service } from "typedi";
import { type ITodoRepository, Todo, TodoStatus } from "../Models/Todo";
import { Prisma, PrismaClient } from "@prisma/client";
import { Category } from "../Models/Category";

@Service()
export class TodoRepository implements ITodoRepository {
  private prisma = new PrismaClient()

  async findById(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
      include: { category: true }
    })

    return todo ? new Todo({
      id: todo.id,
      content: todo.content,
      status: this.isTodoStatus(todo.status) ? todo.status : TodoStatus.PENDING,
      category: new Category({
        name: todo.category.name,
        isDefault: todo.category.isDefault,
      })
    }) : null
  }

  async findByIds(ids: readonly string[]) {
    const todos = await this.prisma.todo.findMany({
      where: { id: { in: ids as string[] } },
      include: { category: true }
    })
    return todos.map(todo => new Todo({
      id: todo.id,
      content: todo.content,
      status: this.isTodoStatus(todo.status) ? todo.status : TodoStatus.PENDING,
      category: new Category({
        name: todo.category.name,
        isDefault: todo.category.isDefault,
      })
    }))
  }

  private isTodoStatus(status: string): status is TodoStatus  {
    return Object.values(TodoStatus).includes(status as TodoStatus)
  }
}