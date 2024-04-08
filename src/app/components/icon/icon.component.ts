import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { DirectionMode, ICON_TYPE, IconLoaderService } from '@spartacus/storefront';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input() set cxIcon(type: ICON_TYPE) {
    this.setIcon(type);
  }

  /**
   * The type input parameter is bound to the icon type. You can feed the `ICON_TYPE` to
   * accomplish a configurable button in the UI.
   */
  @Input() set type(type: ICON_TYPE) {
    this.setIcon(type);
  }

  /**
   * the icon provides an html fragment that is used to add SVG or text based icons.
   */
  icon: SafeHtml | undefined;

  /**
   * The `flip-at-rtl` class is added to the DOM for the style layer to flip the icon in RTL direction.
   */
  @HostBinding('class.flip-at-rtl') flipAtRtl: boolean | undefined;

  /**
   * The `flip-at-ltr` class is added to the DOM for the style layer to flip the icon in LTR direction.
   */
  @HostBinding('class.flip-at-ltr') flipAtLtr: boolean | undefined;

  /**
   * Maintains the applied style classes so we can remove them when the
   * icon type changes at run time.
   */
  protected styleClasses: string[] | undefined;

  constructor(
    protected iconLoader: IconLoaderService,
    protected elementRef: ElementRef<HTMLElement>,
    protected renderer: Renderer2
  ) {}
  ngOnInit(): void {
    
  }

  protected setIcon(type: ICON_TYPE): void {
    if (!type || <string>type === '') {
      return;
    }
    this.icon = this.iconLoader.getHtml(type);
    this.addStyleClasses(type);
    this.iconLoader.addLinkResource(type);
    this.flipIcon(type);
  }

  /**
   * The icons supports flipping for some icons to support rtl and ltr directions.
   */
  protected flipIcon(type: ICON_TYPE) {
    // TODO: this can be dropped with the next major release.
    if (!this.iconLoader.getFlipDirection) {
      return;
    }
    const iconDirection = this.iconLoader.getFlipDirection(type);
    this.flipAtLtr = iconDirection === DirectionMode.LTR;
    this.flipAtRtl = iconDirection === DirectionMode.RTL;
  }

  /**
   * Adds the style classes and the link resource (if available).
   */
  protected addStyleClasses(type: ICON_TYPE): void {
    this.renderer.addClass(this.host, 'cx-icon');

    this.styleClasses?.forEach((cls) =>
      this.renderer.removeClass(this.host, cls)
    );

    this.styleClasses = this.iconLoader.getStyleClasses(type)?.split(' ');
    this.styleClasses?.forEach((cls) => {
      if (cls !== '') {
        this.renderer.addClass(this.host, cls);
      }
    });
  }

  protected get host() {
    return this.elementRef.nativeElement;
  }
}
