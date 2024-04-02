import { Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pdpImg',
  templateUrl: './pdpImg.component.html',
  styleUrls: ['./pdpImg.component.scss']
})
export class PdpImgComponent implements OnInit {

  product$: Observable<Product> = this.currentProductService.getProduct()  as Observable<Product>;

  constructor(private currentProductService: CurrentProductService) {
    
  }

  ngOnInit() {
  }

}
