import { Inject, Service } from "typedi";
import { IUserRepository } from "../Models/User";

@Service()
export class UserService {
  constructor(
    @Inject("userRepository") private readonly userRepository: IUserRepository
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