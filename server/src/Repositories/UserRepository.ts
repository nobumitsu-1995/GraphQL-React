import { User, type IUserRepository } from "../Models/User"

const createUser = (id: string) => {
  const user = new User({
    id,
    name: `hoge-${id}`,
    email: `example-${id}@example.com`
  })

  return user
}

export class UserRepository implements IUserRepository {
  async findById(id: string) {
    return createUser(id)
  }

  async findByIds(ids: string[]) {
    return ids.map(id => createUser(id))
  }
}