import {
  Model,
  MongooseUpdateQueryOptions,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
  UpdateQuery,
} from "mongoose";

//generic class
export abstract class AbstractRepository<T> {
  constructor(protected model: Model<T>) {}
  //_________________________________________________________
  //generic methods
  create(item: Partial<T>) {
    const doc = new this.model(item);
    return doc.save();
  }
  //_________________________________________________________
  async getOne(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ) {
    return await this.model.findOne(filter, projection, options);
  }
  //________________________________________________________
    async exist(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>
  ) {
    return await this.model.findOne(filter, projection, options);
  }
  //________________________________________________________
 async update(
    filter: RootFilterQuery<T>,
    update: UpdateQuery<T>,
    option?: MongooseUpdateQueryOptions<T>
  ) {
   await this.model.updateOne(filter, update, option);
  }
  //________________________________________________________
  async delete(filter: RootFilterQuery<T>) {
  await this.model.deleteOne(filter);
  }
}
