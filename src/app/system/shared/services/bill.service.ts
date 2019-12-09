import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Bill } from "../models/bill.model";
import { BaseApi } from "../core/base-api";
import { WFMEvent } from "../models/event.model";

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http)
  }

  // getBill(): Observable<any> {
  //   return this.http.get('http://localhost:3000/bill')
  //     .pipe(map((response: Response) => response))
  // }
  getBill(): Observable<Bill> {
    return this.get('bill')
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill)
  }

  getCurrency(): Observable<any> {
    return this.http.get('http://data.fixer.io/api/latest?access_key=5475b0f23e440776b0e013d664e790d7')
      .pipe(map((response: Response) => response))
  }
}
