import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from "@spartacus/core";
import { SmartEditConfig, SmartEditRootModule, SMART_EDIT_FEATURE } from "@spartacus/smartedit/root";

@NgModule({
  declarations: [],
  imports: [
    SmartEditRootModule
  ],
  providers: [provideConfig(<CmsConfig>{
    featureModules: {
      [SMART_EDIT_FEATURE]: {
        module: () =>
          import('@spartacus/smartedit').then((m) => m.SmartEditModule),
      },
    }
  }),
  provideConfig(<SmartEditConfig>{
    smartEdit: {
      storefrontPreviewRoute: 'cx-preview',
      allowOrigin: '47.104.103.85:9002',
    },
  })
  ]
})
export class SmartEditFeatureModule { }
