import { User } from "./User"

export interface IUserRepository {
  findById: (id: string) => Promise<User>
  findByIds: (ids: string[]) => Promise<User[]>
}