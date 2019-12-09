import { Component, OnInit } from '@angular/core';
import {BillService} from "../shared/services/bill.service";
import {Observable, observable, Subscription} from "rxjs";
import {combineLatest} from "rxjs/operators";
import {Bill} from "../shared/models/bill.model";
import {$} from "protractor";

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  currency: any;
  bill: Bill;

  isLoaded = false;
  constructor(private billservice: BillService) {}

  ngOnInit() {
   this.sub1 = this.billservice.getBill().subscribe((data: Bill) => this.bill = data);
    this.sub2 = this.billservice.getCurrency().subscribe((data: any) => {
      setTimeout(() => this.isLoaded = true, 500);
      return this.currency = data;

    })

    // this subscription = combineLatest(
    //   this.billservice.getBill(),
    //   this.billservice.getCurrency()
    // ).subscribe((data: [Bill, any]) => {
    //   console.log(data);})
  }
  onRefresh() {
    this.isLoaded = false;
   this.sub3 = this.billservice.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      })

  }
  onDestroy() {

    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
