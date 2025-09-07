"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
//generic class
class AbstractRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    //generic methods  
    create(item) {
        const doc = new this.model(item);
        return doc.save();
    }
    getOne() { }
    update() { }
    delete() { }
}
exports.AbstractRepository = AbstractRepository;
