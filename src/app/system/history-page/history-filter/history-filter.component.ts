import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from "../../shared/models/category.model";
import { el } from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'wfm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    {type: 'd', label: 'day'},
    {type: 'w', label: 'week'},
    {type: 'M', label: 'month'}
  ];

  types = [
    {type: 'income', label: 'income'},
    {type: 'outcome', label: 'outcome'}
  ];


  closeFilter() {
    this.selectedTypes = [];
    this.selectedPeriod = 'd';
    this.selectedCategories = [];

    this.onFilterCancel.emit()
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {

    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value)
    }
  }

  handleChangeType({checked, value}) {

    this.calculateInputParams('selectedTypes', checked, value)
  }

  handleChangeCategory({checked, value}) {

    this.calculateInputParams('selectedCategories', checked, value)
  }

  filterApply() {

    this.onFilterApply.emit({

      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    })
  }
}
