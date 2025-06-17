import { Service } from "typedi";
import { IUserRepository } from "../Models/User";

type Props = {
  userRepository: IUserRepository
}

@Service()
export class UserService {
  private readonly userRepository: IUserRepository

  constructor({
    userRepository
  }: Props) {
    this.userRepository = userRepository
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id)

    return user
  }

  async findByIds(ids: readonly string[]) {
    const users = await this.userRepository.findByIds(ids)

    return users
  }
}