import DataLoader from "dataloader";
import { Todo } from "../Models/Todo";
import { TodoService } from "../Services/TodoService";

const batchTodosByIds = async (
  ids: readonly string[],
  todoService: TodoService
): Promise<(Todo | Error)[]> => {
  const todos: Todo[] = await todoService.findByIds(ids)
  const todoMap = new Map<string, Todo>()

  todos.forEach(todo => todoMap.set(todo.id, todo))

  return ids.map(id => {
    const todo = todoMap.get(id)
    return todo ? todo : new Error(`Todo with id: ${id} not found`)
  })
}

export const createTodoByIdLoader = (todoService: TodoService) =>
  new DataLoader<string, Todo>(keys => batchTodosByIds(keys, todoService))