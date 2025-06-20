import { Service } from "typedi";
import { UserRepository } from "../Repositories/UserRepository";

@Service()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async findById(id: string) {
    const user = await this.userRepository.findById(id)
    return user
  }

  async findByIds(ids: readonly string[]) {
    const users = await this.userRepository.findByIds(ids)
    return users
  }
}