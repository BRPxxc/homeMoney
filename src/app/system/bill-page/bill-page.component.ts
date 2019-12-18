import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from "../shared/services/bill.service";
import { forkJoin, Observable, observable, Subscription } from "rxjs";
import { combineLatest, delay } from "rxjs/operators";
import { Bill } from "../shared/models/bill.model";

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  sub1: Subscription;
  sub2: Subscription;
  currency: any;
  bill: Bill;

  isLoaded = false;

  constructor(private billservice: BillService) {
  }

  ngOnInit() {
    this.sub1 = forkJoin(this.billservice.getBill(), this.billservice.getCurrency())
      .subscribe(([bill, currency]) => {
        this.bill = bill;
        this.currency = currency;
        this.isLoaded = true;
      }
    );

    // this subscription = combineLatest(
    //   this.billservice.getBill(),
    //   this.billservice.getCurrency()
    // ).subscribe((data: [Bill, any]) => {
    //   console.log(data);})
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billservice.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        setTimeout(() => {
          return this.isLoaded = true;
        }, 500)
      })

  }
}
