import { Todo } from "./Todo";

export interface ITodoRepository {
  findById: (id: string) => Promise<Todo | null>
  findByIds: (ids: string[]) => Promise<Todo[]>
}