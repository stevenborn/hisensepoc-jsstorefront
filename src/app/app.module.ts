import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "@spartacus/storefront";
import { AppComponent } from './app.component';
import { SpartacusModule } from './spartacus/spartacus.module';
import { CustomPdpModule } from './custom-pdp/custom-pdp.module';
import { provideOutLet } from "./layout/provideOutLet";
import { CommonModule } from '@angular/common';
import { provideConfig } from "@spartacus/core";
import { translationChunksConfig, translations } from "@spartacus/assets";

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
    CustomPdpModule,
    CommonModule
  ],
  providers: [
    provideOutLet,
    provideConfig({
    i18n: {
      resources: translations,
      chunks: translationChunksConfig,
    },
  }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
