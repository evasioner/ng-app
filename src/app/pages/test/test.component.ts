import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  private dataModel: any;
  public viewModel: any;
  resolveData: any;
  mainForm: FormGroup; // 생성된 폼 저장
  totalCount = 0;
  limitStart = 0;
  limitEnd = 10;
  pageCount = 10;
  code: any;
  categoryCode: any;
  imageSrc: any;
  selectedCategory: string = 'ALL';
  uploadFiles: any;

  fileName: '';

  constructor(
    private fb: FormBuilder
  ) {
    this.initialize();
    this.mainFormCreate();
  }


  ngOnInit(): void {

    const bodyEl = document.getElementsByTagName('body')[0];
    bodyEl.classList.add('overflow-none');

  }

  initialize(): void {
  }

  deleteFile() {

  }

  get selectFile() {
    this.fileName = this.mainForm.get('selectFile').value;
    return this.mainForm.get('selectFile');
  }

  onFileChange(files: FileList, index: number) {
    if (files && files.length > 0) {
      // For Preview
      const file = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      this.mainForm.controls.selectFiles['controls'][index].setValue(file.name);
    }
    this.fileName = this.mainForm.controls.selectFiles['controls'][index].value;
  }

  newDest(): FormGroup {
    return this.fb.group({
      selectFile: new FormControl('', Validators.required)
    });
  }

  get selectFiles(): FormArray {
    return this.mainForm.get('selectFiles') as FormArray;
  }

  addDest() {
    // this.files.push(this.newDest());
  }

  addClick() {
    this.addSelectFiles();
    // this.uploadFiles.push(this.mainForm.controls.selectFile.value);
    // console.log('==============');
    // console.log(this.uploadFiles);
    // console.log('==============');
  }

  deleteClick(index?: number) {
    if (index) {
      this.selectFiles.removeAt(index);
    } else {
      this.selectFiles.removeAt(this.selectFiles.length - 1);
    }
  }

  addSelectFiles() {
    if (this.selectFiles.length >= 3) {
      alert('3개이상 불가');
      return false;
    }
    const control = new FormControl('', Validators.required);
    this.selectFiles.push(control);
  }


  write() {
    let rqInfo = {
      stationTypeCode: 'environment.STATION_CODE',
      currency: 'KRW',
      language: 'KO',
      condition: {
        consultingCategoryCode: this.mainForm.get('consultingCategoryCode').value,
        consultingTypeCode: this.mainForm.get('consultingTypeCode').value,
        userNo: 1000,
        smsReceiveYn: true,
        questionTitle: this.mainForm.get('questionDetail').value,
        questionDetail: this.mainForm.get('questionDetail').value,
        bookingItemCode: this.mainForm.get('bookingItemCode').value,
      },
    };

    if (this.mainForm.controls.selectFiles.value.length === 0) {
      this.mainForm.controls.selectFiles.value.forEach((file, index) => {
        rqInfo.condition[`attachedFileName${++index}`] = file;
      });
    }
    console.log(rqInfo, 1232132131);
  }


  public selectCategory() {

    console.log('click', this.selectedCategory);

    // this.code = code;
    // this.viewModel.consulting.list = [];

    // if (code === 'ALL') {
    //   this.viewModel.consulting.list = this.sampleList;
    //
    // } else {
    //   this.viewModel.consulting.list = this.convertedList[code] || [];
    //
    // }
    // console.log(this.viewModel.consulting.list, '====this.viewModel.consulting.list');
    // this.typeCodeCount = this.viewModel.consulting.list.length;

  }

  qnaTypes = [
    {name: 'ALL', code: 'ALL'},
    {name: 'IC01', code: 'IC01'},
    {name: 'IC02', code: 'IC02'},
    {name: 'IC03', code: 'IC03'},
    {name: 'IC04', code: 'IC04'}
  ];


  mainFormCreate() {
    this.mainForm = this.fb.group({
      consultingCategoryCode: new FormControl('', [Validators.required]),
      bookingItemCode: new FormControl('', [Validators.required]),
      consultingTypeCode: new FormControl(0, [Validators.required]),
      questionDetail: new FormControl('', [Validators.required]),
      selectFiles: new FormArray([])
    });
    this.addSelectFiles();
    console.log(this.mainForm, 'this.mainForm');
  }
}
