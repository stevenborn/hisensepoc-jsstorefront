import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Params, Router } from '@angular/router';
import { GenericLinkComponentService } from '@spartacus/storefront';


interface RouteParts {
  path?: string[];
  queryParams?: Params;
  fragment?: string | null;
}


@Component({
  selector: 'app-general-link',
  templateUrl: './general-link.component.html',
  styleUrls: ['./general-link.component.css']
})

  
  
export class GeneralLinkComponent implements OnInit {

  constructor(
    protected router: Router,
    protected service: GenericLinkComponentService
  ) {}

  ngOnInit() {
  }

  protected readonly URL_SPLIT = /(^[^#?]*)(.*)/;

  protected routeParts: RouteParts = {};

  @Input() url!: string | any[];
  @Input() target: string | null | undefined;
  @Input() id: string | undefined;
  @Input() class: string | undefined;
  @Input() style: string | undefined;
  @Input() title: string | undefined;

  isExternalUrl(): boolean {
    return this.service.isExternalUrl(this.url);
  }

  get rel() {
    return this.target === '_blank' ? 'noopener' : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['url']) {
      this.setUrlParts(changes['url'].currentValue);
    }
  }

  get routerUrl(): string[] | undefined {
    return this.routeParts.path;
  }

  get queryParams(): Params | undefined {
    return this.routeParts.queryParams;
  }

  get fragment(): string | undefined {
    return this.routeParts.fragment ?? undefined;
  }

  protected setUrlParts(url: string | any[]) {
    if (typeof url === 'string') {
      url = this.getAbsoluteUrl(url);
      this.routeParts = this.splitUrl(url as string);
    } else {
      this.routeParts = { path: url };
    }
  }


  protected splitUrl(url: string = ''): RouteParts {
    const { queryParams, fragment } = this.router.parseUrl(url);
    const [, path] = url.match(this.URL_SPLIT) ?? [, ''];

    return { path: [path ?? ''], queryParams, fragment };
  }

  protected getAbsoluteUrl(url: string): string {
    return url.startsWith('/') ? url : '/' + url;
  }

}
