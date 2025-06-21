import { ITodoRepository, Todo, TodoStatus } from "../Models/Todo";

const createTodo = (id: string) => {
  const todo = new Todo({
    id,
    content: `${id}のコンテンツ内容`,
    status: TodoStatus.PENDING
  })

  return todo
}

export class TodoRepository implements ITodoRepository {
  async findById(id: string) {
    return createTodo(id)
  }

  async findByIds(ids: string[]) {
    return ids.map(id => createTodo(id))
  }
}