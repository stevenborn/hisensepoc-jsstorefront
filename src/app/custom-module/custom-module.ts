import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CmsConfig, ConfigModule, provideConfig} from '@spartacus/core';
import {StarRatingModule} from '@spartacus/storefront';
import { PdpImgComponent } from '../components/pdpImg/pdpImg.component';
import { ProductVariantSizeSelectorComponent, ProductVariantsGuard } from '@spartacus/product/variants/components';
import { HomeAdimgComponent } from '../components/home-adimg/home-adimg.component';
import { CartAdimgComponent } from '../components/cart-adimg/cart-adimg.component';
import { customerLayoutConfig } from '../layout/layout';
import { HomeNavigationComponent } from '../components/home-navigation/home-navigation.component';
import { HomeNavifationNodeComponent } from '../components/home-navifation-node/home-navifation-node.component';


@NgModule({
  declarations: [
    PdpImgComponent,
    HomeAdimgComponent,
    CartAdimgComponent,
    HomeNavigationComponent,
    HomeNavifationNodeComponent
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
  
  StarRatingModule
  ],
  exports: [
    PdpImgComponent,
    HomeAdimgComponent,
    CartAdimgComponent,
    HomeNavigationComponent,
    HomeNavifationNodeComponent
  ]
})
export class CustomModule { }
