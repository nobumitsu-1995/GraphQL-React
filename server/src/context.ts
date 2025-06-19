import Container from "typedi"
import { createUserByIdLoader } from "./dataloaders/userDataloader"
import { UserService } from "./Services/UserService"
import { UserRepository } from "./Repositories/UserRepository"

export interface MyContext {
  req: Request
  res: Response
  dataloaders: {
    userByIdLoader: ReturnType<typeof createUserByIdLoader>
  }
}

export const createContext = ({ req, res }: { req: Request, res: Response }): MyContext => {
  Container.set("userRepository", new UserRepository())
  const userService = Container.get(UserService)

  return {
    req,
    res,
    dataloaders: {
      userByIdLoader: createUserByIdLoader(userService)
    }
  }
}