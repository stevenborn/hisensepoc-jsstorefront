import { Component, Input, OnInit } from '@angular/core';
import { CmsNavigationNode } from '@spartacus/core';

@Component({
  selector: 'app-home-navifation-node',
  templateUrl: './home-navifation-node.component.html',
  styleUrls: ['./home-navifation-node.component.scss']
})
export class HomeNavifationNodeComponent implements OnInit {

  @Input() node: CmsNavigationNode | undefined

  constructor() { }

  ngOnInit() {
    console.log(this.node);
    
  }

}
