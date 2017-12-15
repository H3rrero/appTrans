import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SelectComponent } from './select/select.component';
import { TraductorComponent } from './traductor/traductor.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { CodemirrorModule } from 'ng2-codemirror';


@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    TraductorComponent,
    NotificacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CodemirrorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
