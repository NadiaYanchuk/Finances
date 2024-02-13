import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Bill } from "../models/bill.model";
import { BaseApi } from "../../../shared/core/base-api";

@Injectable()
export class BillService extends BaseApi {
    constructor(public override http: HttpClient) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }
}
