import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from '../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

  public form: FormGroup;
  private selecteFile;
  public uploadPercentage: string;
  public fileUpload$:Observable<string>;
  constructor(private formBuilder: FormBuilder, private appService: AppService){}

  ngOnInit() {
    this.initializeForm();
    this.fileUpload$ = this.appService.fileUpload$.asObservable();
    this.fileUpload$.subscribe(data => this.uploadPercentage = data);
  }

  public onFileSelected(event) {
    this.selecteFile = event.target.files[0];
  }

  public upload(){
    this.appService.uploadFile(this.selecteFile);
  }

  initializeForm(){
    this.form = this.formBuilder.group({
      format:['', Validators.required],
      file:''
    })
  }


}
