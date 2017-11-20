import { DefaultCrudRepository, DataSourceType } from '@loopback/repository';
import { User } from '../models';
import { inject } from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(@inject('datasource') protected datasource: DataSourceType) {
    super(User, datasource);
  }
}
