import { User } from "./User"

export interface IUserRepository {
  findById: (id: string) => Promise<User>
  findByIds: (ids: readonly string[]) => Promise<User[]>
}