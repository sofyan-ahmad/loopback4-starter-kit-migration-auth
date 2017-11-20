import {
  UserProfile,
  authenticate,
  AuthenticationBindings
} from "@loopback/authentication";
import { inject } from "@loopback/core";
import { get } from "@loopback/rest";
// import {TodoSchema, Todo} from '../models';
import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/index";

export class UserController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER) private user: UserProfile,
    @repository("user") protected userRepo: UserRepository
  ) {}

  @get("/login")
  login() {
    try {
      // Todo: create new session
      return this.user.id;
    } catch (err) {
      return err;
    }
  }

  @authenticate("Session")
  @get("/whoAmI")
  whoAmI() {
    try {
      return this.user.id;
    } catch (err) {
      return err;
    }
  }
}
