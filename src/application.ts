import { Application, ApplicationConfig } from "@loopback/core";
import {
  AuthenticationComponent,
  AuthenticationBindings
} from "@loopback/authentication";
import { RestComponent, RestServer } from "@loopback/rest";
import { UserController, TodoController } from "./controllers";
import { UserRepository, TodoRepository } from "./repositories";
import { db } from "./datasources/db.datasource";
import { DataSourceConstructor } from "@loopback/repository";
import { authStrategyProvider } from "./providers/authStrategy";
import { MySequence } from "./sequence";

export class MyApplication extends Application {
  constructor(options?: ApplicationConfig) {
    // Allow options to replace the defined components array, if desired.
    options = Object.assign(
      {},
      {
        components: [AuthenticationComponent, RestComponent],
        rest: {
          sequence: MySequence
        }
      },
      options
    );

    super(options);
    this.setupRepositories();
    this.setupControllers();
  }

  // Helper functions (just to keep things organized)
  setupRepositories() {
    let datasource =
      this.options && this.options.datasource
        ? new DataSourceConstructor(this.options.datasource)
        : db;
    this.bind("datasource").to(datasource);

    this.bind("repositories.todo").toClass(TodoRepository);
    this.bind("repositories.user").toClass(UserRepository);
  }

  setupControllers() {
    this.controller(UserController);
    this.controller(TodoController);
  }

  // extend default start
  async start() {
    const server = await this.getServer(RestServer);

    server
      .bind(AuthenticationBindings.STRATEGY)
      .toProvider(authStrategyProvider);

    await super.start();
  }
}
