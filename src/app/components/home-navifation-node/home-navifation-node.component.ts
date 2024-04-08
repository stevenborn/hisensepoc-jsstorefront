import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CmsNavigationNode, WindowRef } from '@spartacus/core';
import { HamburgerMenuService, ICON_TYPE, NavigationNode } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';



@Component({
  selector: 'app-home-navifation-node',
  templateUrl: './home-navifation-node.component.html',
  styleUrls: ['./home-navifation-node.component.scss']
})
export class HomeNavifationNodeComponent implements OnInit {

  @Input() node: NavigationNode | null | undefined;

  @Input() wrapAfter: number | undefined;

  @Input() resetMenuOnClose: boolean | undefined;

  @Input() navAriaLabel: string | null | undefined;

  iconType = ICON_TYPE;

  @Input() @HostBinding('class.flyout') flyout = true;

  @Input() @HostBinding('class.is-open') isOpen = false;

  private openNodes: HTMLElement[] = [];
  private subscriptions = new Subscription();
  private resize = new EventEmitter();

  @HostListener('window:resize')
  onResize() {
    this.resize.next(undefined);
  }

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elemRef: ElementRef,
    protected hamburgerMenuService: HamburgerMenuService,
    protected winRef: WindowRef
  ) {
    this.subscriptions.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => this.clear())
    );
    this.subscriptions.add(
      this.resize.pipe(debounceTime(50)).subscribe(() => {
        this.alignWrappersToRightIfStickOut();
      })
    );
  }


  ngOnInit() {
    if (this.resetMenuOnClose) {
      this.resetOnMenuCollapse();
    }
  }


  resetOnMenuCollapse(): void {
    this.subscriptions.add(
      this.hamburgerMenuService?.isExpanded
        .pipe(distinctUntilChanged(), filter(Boolean))
        .subscribe(() => {
          this.reinitializeMenu();
        })
    );
  }

  closeIfClickedTheSameLink(navNode: NavigationNode): void {
    if (
      typeof navNode.url === 'string' &&
      this.winRef.nativeWindow?.location.href.includes(navNode.url)
    ) {
      this.elemRef.nativeElement
        .querySelectorAll('li.is-open:not(.back), li.is-opened')
        .forEach((el: any) => {
          this.renderer.removeClass(el, 'is-open');
          this.renderer.removeClass(el, 'is-opened');
        });
      this.reinitializeMenu();
      this.hamburgerMenuService.toggle();
    }
  }

  reinitializeMenu(): void {
    if (this.openNodes?.length > 0) {
      this.clear();
      this.renderer.removeClass(this.elemRef.nativeElement, 'is-open');
    }
  }

  protected ariaCollapseNodes(): void {
    this.openNodes.forEach((parentNode) => {
      Array.from(parentNode.children)
        .filter((childNode) => childNode?.tagName === 'BUTTON')
        .forEach((childNode) => {
          this.renderer.setAttribute(childNode, 'aria-expanded', 'false');
        });
    });
  }

  toggleOpen(event: UIEvent): void {
    if (event.type === 'keydown') {
      event.preventDefault();
    }
    this.ariaCollapseNodes();
    const node = <HTMLElement>event.currentTarget;
    const parentNode = <HTMLElement>node.parentNode;
    if (this.openNodes.includes(parentNode)) {
      if (event.type === 'keydown') {
        this.back();
      } else {
        this.openNodes = this.openNodes.filter((n) => n !== parentNode);
        this.renderer.removeClass(parentNode, 'is-open');
      }
    } else {
      this.openNodes.push(parentNode);
      this.renderer.setAttribute(node, 'aria-expanded', 'true');
    }

    this.updateClasses();

    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  back(): void {
    if (this.openNodes[this.openNodes.length - 1]) {
      this.renderer.removeClass(
        this.openNodes[this.openNodes.length - 1],
        'is-open'
      );
      this.openNodes.pop();
      this.updateClasses();
    }
  }

  clear(): void {
    this.openNodes = [];
    this.updateClasses();
  }

  onMouseEnter(event: MouseEvent) {
    this.alignWrapperToRightIfStickOut(<HTMLElement>event.currentTarget);
    this.focusAfterPreviousClicked(event);
  }

  getTotalDepth(node: NavigationNode, depth = 0): number {
    if (node.children && node.children.length > 0) {
      return Math.max(
        ...node.children.map((n) => this.getTotalDepth(n, depth + 1))
      );
    } else {
      return depth;
    }
  }

  getColumnCount(length: number): number {
    return Math.round(length / (this.wrapAfter || length));
  }

  focusAfterPreviousClicked(event: MouseEvent) {
    const target: HTMLElement = <HTMLElement>(
      (event.target || event.relatedTarget)
    );
    if (
      target.ownerDocument.activeElement?.matches('nav[tabindex]') &&
      target.parentElement?.matches('.flyout')
    ) {
      target.focus();
    }
    return target.ownerDocument;
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private alignWrapperToRightIfStickOut(node: HTMLElement) {
    const wrapper = <HTMLElement>node.querySelector('.wrapper');
    const body = <HTMLElement>node.closest('body');
    if (wrapper) {
      this.renderer.removeStyle(wrapper, 'margin-left');
      if (
        wrapper.offsetLeft + wrapper.offsetWidth >
        body.offsetLeft + body.offsetWidth
      ) {
        this.renderer.setStyle(
          wrapper,
          'margin-left',
          `${node.offsetWidth - wrapper.offsetWidth}px`
        );
      }
    }
  }

  private alignWrappersToRightIfStickOut() {
    const navs = <HTMLCollection>this.elemRef.nativeElement.childNodes;
    Array.from(navs)
      .filter((node) => node.tagName === 'LI')
      .forEach((nav) => this.alignWrapperToRightIfStickOut(<HTMLElement>nav));
  }

  private updateClasses(): void {
    this.openNodes.forEach((node, i) => {
      if (i + 1 < this.openNodes.length) {
        this.renderer.addClass(node, 'is-opened');
        this.renderer.removeClass(node, 'is-open');
      } else {
        this.renderer.removeClass(node, 'is-opened');
        this.renderer.addClass(node, 'is-open');
      }
    });

    this.isOpen = this.openNodes.length > 0;
  }
}


