import { Component, Input, OnInit } from '@angular/core';
import { Data } from "@angular/router";

@Component({
  selector: 'wfm-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})

export class HistoryChartComponent {

  @Input() data;

}
