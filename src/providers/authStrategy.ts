import { inject, Provider, ValueOrPromise } from "@loopback/context";
import {
  AuthenticationBindings,
  AuthenticationMetadata
} from "@loopback/authentication";
import { Strategy } from "passport";
import { BasicStrategy } from "passport-http";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { UserRepository } from "../repositories";
import { repository } from "@loopback/repository";

export class authStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @repository("user") protected userRepo: UserRepository,
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata
  ) {}

  value(): ValueOrPromise<Strategy | undefined> {
    if (!this.metadata) {
      return Promise.resolve(undefined);
    }

    const authStrategy = this.metadata.strategy;
    if (authStrategy === "BasicStrategy") {
      return new BasicStrategy(this.loginBasic.bind(this));
    } else if (
      authStrategy === "Session" ||
      authStrategy === "BearerStrategy" ||
      authStrategy === ""
    ) {
      return new BearerStrategy(this.verifySession.bind(this));
    } else {
      return Promise.reject(`The strategy ${authStrategy} is not available.`);
    }
  }

  loginBasic(username: string, password: string, cb: Function) {
    this.userRepo.find({ where: { username, password } });
    // find user by name & password
    // call cb(null, false) when user not found
    // when user is authenticated
    cb(null, {});
  }

  async verifySession(token: string, cb: Function) {
    try {
      const users = await this.userRepo.find();
      console.log(users);
      // find user by name & password
      // call cb(null, false) when user not found
      // when user is authenticated
      cb(null, {});
    } catch (err) {
      cb(err);
    }
  }
}
