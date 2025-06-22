import { User } from "./User"

export interface IUserRepository {
  findById: (id: string) => Promise<User | null>
  findByIds: (ids: readonly string[]) => Promise<User[]>
}