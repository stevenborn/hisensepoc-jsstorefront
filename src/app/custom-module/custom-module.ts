import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CmsConfig, ConfigModule, I18nModule, provideConfig} from '@spartacus/core';
import {StarRatingModule} from '@spartacus/storefront';
import { PdpImgComponent } from '../components/pdpImg/pdpImg.component';
import { ProductVariantSizeSelectorComponent, ProductVariantsGuard } from '@spartacus/product/variants/components';
import { HomeAdimgComponent } from '../components/home-adimg/home-adimg.component';
import { CartAdimgComponent } from '../components/cart-adimg/cart-adimg.component';
import { customerLayoutConfig } from '../layout/layout';
import { HomeNavigationComponent } from '../components/home-navigation/home-navigation.component';
import { HomeNavifationNodeComponent } from '../components/home-navifation-node/home-navifation-node.component';
import { StoreModule } from '@ngrx/store';
import { GeneralLinkComponent } from '../components/general-link/general-link.component';
import { IconComponent } from '../components/icon/icon.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PdpImgComponent,
    HomeAdimgComponent,
    CartAdimgComponent,
    HomeNavigationComponent,
    HomeNavifationNodeComponent,
    GeneralLinkComponent,
    IconComponent
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
          AdImagesComponent: {
          component: HomeAdimgComponent
        },
        CategoryNavigationComponent: {
          // component:HomeNavigationComponent
        }
        }, 
    } as CmsConfig,),
    ConfigModule.withConfig(customerLayoutConfig),
  
    StarRatingModule,
    StoreModule.forRoot({}),
    RouterModule.forRoot([]),
    I18nModule
  ],
  exports: [
    PdpImgComponent,
    HomeAdimgComponent,
    CartAdimgComponent,
    HomeNavigationComponent,
    HomeNavifationNodeComponent,
    GeneralLinkComponent,
    IconComponent
  ]
})
export class CustomModule { }
