import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomError} from '../../errors/custom-error';
import {QnaType} from '../../types/qna-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false
  };

  qnaTypes = QnaType;
  buttonTypes = {
    'ALL': '전체',
    'IC01': '항공사',
    'IC02': '호텔',
    'IC03': '렌터카',
  };
  mainForm: FormGroup; // 생성된 폼 저장

  focus;
  focus1;

  constructor(private fb: FormBuilder) {
  }

  public sampleList: any;
  public convertedList: any;
  public viewList: any;

  ngOnInit(): void {
    this.mainForm = this.fb.group({
      selectQna: new FormControl({value: '', disabled: false}, Validators.required),
      selectNumber: new FormControl({value: ''}, Validators.required),
    });

    this.sampleList = [
      {
        'consultingCategoryCode': 'IC01',
        'questionTitle': 'aaaa',
        'travelFromDate': 'aaaa',
        'boardMasterSeq': 'aaaa',
        'questionDetail': 'aaaa',
        'requestDatetime': 'aaaa'
      },
      {
        'consultingCategoryCode': 'IC02',
        'questionTitle': 'bbbb',
        'travelFromDate': 'bbbb',
        'boardMasterSeq': 'bbbb',
        'questionDetail': 'bbbb',
        'requestDatetime': 'bbbb'
      },
      {
        'consultingCategoryCode': 'IC02',
        'questionTitle': 'bbbb',
        'travelFromDate': 'bbbb',
        'boardMasterSeq': 'bbbb',
        'questionDetail': 'bbbb',
        'requestDatetime': 'bbbb'
      },
    ];
    let tmp = [];
    this.sampleList.forEach((item) => {
      tmp[item.consultingCategoryCode] = tmp[item.consultingCategoryCode] || [];
      tmp[item.consultingCategoryCode].push(item);
    });
    this.viewList = this.sampleList;
    this.convertedList = tmp;

    console.log(this.convertedList, 123);

    try {
      throw new CustomError('Not Exist a User');
    } catch (e) {
      console.log(e?.status);
    }
    // console.log(this.mainForm.value.selectNumber, 123123);
    // console.log(this.mainForm.value.selectQna, 123123);
    // console.log(this.mainForm.controls.selectQna.value, 123123);
    // console.log(this.mainForm.get('selectQna').value, 123123);
  }


  selectCategory(code): void {
    console.log(123213, 'asdfsadfdasf');
    this.viewList = [];
    if (code === 'ALL') {
      this.viewList = this.sampleList;
    } else {
      this.viewList = [this.convertedList[code]];
    }
  }

  test(): void {
    try {
      console.log(1);
    } catch (e) {
      console.log(1);
    }
  }
}
