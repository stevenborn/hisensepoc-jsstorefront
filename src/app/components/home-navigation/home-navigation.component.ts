import { Component, OnInit } from '@angular/core';
import { CmsNavigationComponent, CmsNavigationNode } from '@spartacus/core';
import { CmsComponentData, NavigationComponent, NavigationNode, NavigationService } from '@spartacus/storefront';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.scss']
})
export class HomeNavigationComponent implements OnInit {

  navigationData: CmsNavigationComponent | undefined;

  navigationNodeData$: Observable<NavigationNode>[] = []

  childrenNodes: NavigationNode[] = [];
  cnode: CmsNavigationNode|undefined;

  constructor(protected component: CmsComponentData<CmsNavigationComponent>,
    protected navigationService: NavigationService) { }

  ngOnInit() {

    this.component.data$.subscribe(e => { 
      console.log(e);
      
    })

    // this.navigationService.getNavigationNode(this.component.data$).subscribe(e => { 
      // this.childrenNodes = e.children ?? [];
      // console.log(this.childrenNodes[0].title);
      
      // console.log(e);
      
    // })

    this.navigationNodeData$.push(this.navigationService.getNavigationNode(this.component.data$));
  }

}
