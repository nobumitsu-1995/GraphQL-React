import { Todo } from "./Todo";

export interface ITodoRepository {
  findById: (id: string) => Promise<Todo>
  findByIds: (ids: string[]) => Promise<Todo[]>
}