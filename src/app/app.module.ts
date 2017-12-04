import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SelectComponent } from './select/select.component';
import { TraductorComponent } from './traductor/traductor.component';
import { CodemirrorModule } from 'ng2-codemirror';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    TraductorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CodemirrorModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
