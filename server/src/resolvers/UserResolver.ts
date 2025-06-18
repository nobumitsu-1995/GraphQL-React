import { Arg, Ctx, ID, Resolver } from "type-graphql";
import { User } from "../Models/User";
import { UserService } from "../Services/UserService";
import { MyContext } from "../context";

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService){}

  async user(
    @Arg("id", type => ID) id: string,
    @Ctx() {dataloaders}: MyContext
  ): Promise<User> {
    return dataloaders.userByIdLoader.load(id)
  }
}