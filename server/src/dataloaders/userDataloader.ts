import DataLoader from "dataloader";
import { User } from "../Models/User";
import { UserService } from "../Services/UserService";

const batchUsersByIds = async (
  ids: readonly string[],
  userService: UserService
):Promise<(User | Error)[]> => {
  const users: User[] = await userService.findByIds(ids)
  const userMap = new Map<string, User>()

  users.forEach(user => userMap.set(user.id, user))

  return ids.map(id => {
    const user = userMap.get(id)
    return user ? user : new Error(`User with id: ${id} not found`)
  })
}

export const createUserByIdLoader = (userService: UserService) =>
  new DataLoader<string, User>(keys => batchUsersByIds(keys, userService))