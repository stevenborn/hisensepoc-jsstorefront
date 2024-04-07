import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "@spartacus/storefront";
import { AppComponent } from './app.component';
import { SpartacusModule } from './spartacus/spartacus.module';

import { provideOutLet } from "./layout/provideOutLet";
import { CommonModule } from '@angular/common';
import { ConfigModule, provideConfig } from "@spartacus/core";
import { translationChunksConfig, translations } from "@spartacus/assets";
import { CustomModule } from "./custom-module/custom-module";
import { customerLayoutConfig } from "./layout/layout";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    CustomModule,
    CommonModule
  ],
  providers: [
    provideOutLet,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
