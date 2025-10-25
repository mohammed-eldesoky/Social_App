"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
//generic class
class AbstractRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    //_________________________________________________________
    //generic methods
    create(item) {
        const doc = new this.model(item);
        return doc.save();
    }
    //_________________________________________________________
    async getOne(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    //________________________________________________________
    async getAll(filter, projection, options) {
        return await this.model.find(filter, projection, options);
    }
    //________________________________________________________
    async exist(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    //________________________________________________________
    async update(filter, update, option) {
        await this.model.updateOne(filter, update, option);
    }
    //________________________________________________________
    async delete(filter) {
        await this.model.deleteOne(filter);
    }
}
exports.AbstractRepository = AbstractRepository;
