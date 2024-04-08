import { Component, OnInit } from '@angular/core';
import { CmsNavigationComponent, CmsNavigationNode } from '@spartacus/core';
import { CmsComponentData, NavigationComponent, NavigationNode, NavigationService } from '@spartacus/storefront';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.scss']
})
export class HomeNavigationComponent implements OnInit {

  navigationData: CmsNavigationComponent | undefined;

  navigationNodeData$: Observable<NavigationNode>[] = []

  childrenNodes: NavigationNode[] = [];
  cnode: CmsNavigationNode | undefined;
  
  node$: Observable<NavigationNode> | undefined;

  name$: Observable<string | undefined> | undefined;

  styleClass$: Observable<string | undefined> | undefined;


  constructor(protected component: CmsComponentData<CmsNavigationComponent>,
    protected navigationService: NavigationService) { }

  ngOnInit() {

    // this.component.data$.subscribe(e => { 
    //   console.log(e);
      
    // })

    // this.navigationService.getNavigationNode(this.component.data$).subscribe(e => {
      // this.childrenNodes = e.children ?? [];
      // console.log(this.childrenNodes[0].title);
      
      // console.log(e);
      
    // })

    // this.navigationNodeData$.push(this.navigationService.getNavigationNode(this.component.data$));

    // this.createNavigation(this.component.data$).subscribe(e => {
    //   console.log(e);
      
    // })
    

    


    this.node$ = this.createNavigation(this.component.data$);
    this.name$ = this.component.data$.pipe(map((d) => d?.navigationNode?.title));
    this.styleClass$ = this.component.data$.pipe(map((d) => d?.styleClass));

  }


  public createNavigation(
    data$: Observable<CmsNavigationComponent>
  ): Observable<NavigationNode> {
    return combineLatest([data$, this.navigationService.getNavigationNode(data$)]).pipe(
      map(([data, nav]) => {
        return {
          title: data.name,
          children: [nav],
        };
      })
    );
  }

}
