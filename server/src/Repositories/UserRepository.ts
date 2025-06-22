import { Service } from "typedi"
import { User, type IUserRepository } from "../Models/User"
import { PrismaClient } from "@prisma/client"

@Service()
export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient()

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    return user ? new User({
      id: user.id,
      name: user.name,
      email: user.email
    }) : null
  }

  async findByIds(ids: readonly string[]) {
    const users = await this.prisma.user.findMany({
      where: { id: { in: ids as string[] } }
    })
    return users.map(user => new User({
      id: user.id,
      name: user.name,
      email: user.email
    }))
  }
}