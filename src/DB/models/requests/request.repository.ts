

// request repository
import { ObjectId } from "mongoose";
import { Irequest } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import Request from "./request.model";
export class RequestRepository extends AbstractRepository<Irequest> {
    constructor() {
        super(Request);
    }
      async getUserRequests(userId: string | ObjectId) {
    return await this.model.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });
  }
}