import { Arg, Ctx, ID, Query, Resolver } from "type-graphql";
import { User } from "../Models/User";
import { UserService } from "../Services/UserService";
import { MyContext } from "../context";
import { Service } from "typedi";

@Service()
@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService){}

  @Query(returns => User)
  async user(
    @Arg("id", type => ID) id: string,
    @Ctx() {dataloaders}: MyContext
  ): Promise<User> {
    return dataloaders.userByIdLoader.load(id)
  }

  @Query(returns => [User])
  async users(
    @Arg("ids", type => [ID]) ids: string[],
    @Ctx() { dataloaders }: MyContext
  ): Promise<(User | Error)[]> {
    return dataloaders.userByIdLoader.loadMany(ids)
  }
}