// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TabelComponent } from './lazy-loaded/tabel/tabel.component';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        TabelComponent
    ],
    providers: [],
})
export class AppModule { }
