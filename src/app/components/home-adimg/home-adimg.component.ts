import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmsBannerCarouselComponent, CmsBannerComponent, CmsComponent, CmsService } from '@spartacus/core';
import { BannerComponent, CmsComponentData } from '@spartacus/storefront';
import { Observable, of, } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/app/constant/environment.dev';


 interface CmsBannerComponentMedia {
    altText?: string;
    code?: string;
    mime?: string;
    url?: string;
}

@Component({
  selector: 'app-home-adimg',
  templateUrl: './home-adimg.component.html',
  styleUrls: ['./home-adimg.component.scss']
})
  
 
  
  
export class HomeAdimgComponent implements OnInit {


  datas$: Observable<CmsBannerComponent>[] = [];

  prefix: string = environment.prefix;

  constructor(protected component: CmsComponentData<CmsBannerCarouselComponent>,protected cmsService: CmsService,private router: Router){
    
  }


  ngOnInit(): void {
    this.component.data$.subscribe(e => {
      const codes = e.banners?.trim().split(' ') ?? []
      codes.forEach(code => {
        this.datas$.push(this.cmsService.getComponentData(code));
      })
    });    
  }

  isBannerComponentMedia(media: any): media is CmsBannerComponentMedia {
  return media && 'url' in media;
}

  
  onImageClick(data: CmsBannerComponent) {
    if (data.urlLink) {
      // window.location.href = data.urlLink;  
      window.open(data.urlLink,'_blank')
    }
  }



}
