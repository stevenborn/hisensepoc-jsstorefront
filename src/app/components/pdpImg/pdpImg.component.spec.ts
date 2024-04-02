/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PdpImgComponent } from './pdpImg.component';

describe('PdpImgComponent', () => {
  let component: PdpImgComponent;
  let fixture: ComponentFixture<PdpImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdpImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdpImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
