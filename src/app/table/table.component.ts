import {Component, Input, OnInit} from '@angular/core';
import {QnaType} from '../types/qna-type.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() list: any;
  qnaTypes = QnaType;
  settings = {
    'IC01': {
      'reservation-title': {
        'icon': 'icon sm fight2'
      }
    },
    'IC02': {
      'reservation-title': {
        'icon': 'icon sm hotel4'
      }
    },
    'IC03': {
      'reservation-title': {
        'icon': 'icon sm rentcar3'
      }
    },
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
