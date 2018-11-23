import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from '../form-service.service';
import { HeaderObject } from '../models/header-object';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public form: FormGroup;
  constructor(private formBuilder: FormBuilder, private formService: FormService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    let obj = new HeaderObject();
    this.formService.createFormFromObject(this.form, obj);
  }

  temp:string[] = [
    'ABCD', 'EFGH', 'IJKL', 'MNOP'
  ]

  onLOBSelect(LOB: string){

  }

  onAgencySelect(agency: string){

  }

  onTemplateSelect(template: string){

  }

  onVersionSelect(version: string){

  }

}
