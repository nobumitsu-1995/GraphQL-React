import Container from "typedi"
import { createUserByIdLoader } from "./dataloaders/userDataloader"
import { UserService } from "./Services/UserService"
import { createTodoByIdLoader } from "./dataloaders/todoDataloader"
import { TodoService } from "./Services/TodoService"

export interface MyContext {
  req: Request
  res: Response
  dataloaders: {
    userByIdLoader: ReturnType<typeof createUserByIdLoader>
    todoByIdLoader: ReturnType<typeof createTodoByIdLoader>
  }
}

export const createContext = ({ req, res }: { req: Request, res: Response }): MyContext => {
  const userService = Container.get(UserService)
  const todoService = Container.get(TodoService)

  return {
    req,
    res,
    dataloaders: {
      userByIdLoader: createUserByIdLoader(userService),
      todoByIdLoader: createTodoByIdLoader(todoService)
    }
  }
}