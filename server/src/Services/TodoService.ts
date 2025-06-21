import { Service } from "typedi";
import { TodoRepository } from "../Repositories/TodoRepository";

@Service()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  async findById(id: string) {
    const todo = await this.todoRepository.findById(id)
    return todo
  }

  async findByIds(ids: readonly string[]) {
    const todos = await this.todoRepository.findByIds(ids)
    return todos
  }
}