import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomProductIntroComponent } from './custom-product-intro/custom-product-intro.component';
import {CmsConfig, ConfigModule} from '@spartacus/core';
import {StarRatingModule} from '@spartacus/storefront';
import { PdpImgComponent } from '../components/pdpImg/pdpImg.component';
import { ProductVariantSizeSelectorComponent, ProductVariantsGuard } from '@spartacus/product/variants/components';


@NgModule({
  declarations: [
    CustomProductIntroComponent,
    PdpImgComponent
  ],
  imports: [
    CommonModule,
    ConfigModule.withConfig({
      cmsComponents: {
          ProductIntroComponent: {
              // component: CustomProductIntroComponent
        },
        // ProductVariantSelectorComponent: {
        //   component: ProductVariantSizeSelectorComponent,
        //   guards: [ProductVariantsGuard],
        // },
      }
  } as CmsConfig),
  StarRatingModule
  ],
  exports: [
    PdpImgComponent
  ]
})
export class CustomPdpModule { }
