import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { FieldComponent } from './field/field.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { PreviewModalComponent } from './preview-modal/preview-modal.component';

@NgModule({
	declarations: [
		AppComponent,
		CategoryComponent,
		FieldComponent,
		MainComponent,
		HeaderComponent,
		PreviewModalComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		DragDropModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
