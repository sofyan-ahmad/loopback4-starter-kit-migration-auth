import { post, param, get, put, patch, del, HttpErrors } from "@loopback/rest";
import { UserSchema, User } from "../models";
import { repository } from "@loopback/repository";
import { TodoRepository } from "../repositories";

export class TodoController {
  constructor(@repository("todo") protected todoRepo: TodoRepository) {}

  @post("/todo")
  @param.body("todo", UserSchema)
  async createTodo(todo: User) {
    if (!todo.title) {
      return Promise.reject(new HttpErrors.BadRequest("title is required"));
    }
    const result = await this.todoRepo.create(todo);
    return result;
  }

  @get("/todo/{id}")
  @param.path.number("id")
  @param.query.boolean("items")
  async findTodoById(id: number, items?: boolean): Promise<User> {
    return await this.todoRepo.findById(id);
  }

  @get("/todo")
  async findTodos(): Promise<User[]> {
    return await this.todoRepo.find();
  }

  @put("/todo/{id}")
  @param.path.number("id")
  @param.body("todo", UserSchema)
  async replaceTodo(id: number, todo: User): Promise<boolean> {
    return await this.todoRepo.replaceById(id, todo);
  }

  @patch("/todo/{id}")
  @param.path.number("id")
  @param.body("todo", UserSchema)
  async updateTodo(id: number, todo: User): Promise<boolean> {
    return await this.todoRepo.updateById(id, todo);
  }

  @del("/todo/{id}")
  @param.path.number("id")
  async deleteTodo(id: number): Promise<boolean> {
    return await this.todoRepo.deleteById(id);
  }
}
