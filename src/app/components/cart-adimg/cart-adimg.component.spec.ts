/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CartAdimgComponent } from './cart-adimg.component';

describe('CartAdimgComponent', () => {
  let component: CartAdimgComponent;
  let fixture: ComponentFixture<CartAdimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartAdimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAdimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
