

// request repository
import { Irequest } from "../../../utils";
import { AbstractRepository } from "../../abstract.repository";
import Request from "./request.model";
export class RequestRepository extends AbstractRepository<Irequest> {
    constructor() {
        super(Request);
    }
}