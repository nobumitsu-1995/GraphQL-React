import { Arg, Ctx, ID, Query, Resolver } from "type-graphql";
import { TodoService } from "../Services/TodoService";
import { MyContext } from "../context";
import { Todo } from "../Models/Todo";
import { Service } from "typedi";

@Service()
@Resolver(Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(returns => Todo)
  async todo(
    @Arg("id", type => ID) id: string,
    @Ctx() {dataloaders}: MyContext
  ): Promise<Todo> {
    return dataloaders.todoByIdLoader.load(id)
  }
}