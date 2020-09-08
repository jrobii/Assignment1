import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanneladminComponent } from './channeladmin.component';

describe('ChanneladminComponent', () => {
  let component: ChanneladminComponent;
  let fixture: ComponentFixture<ChanneladminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanneladminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanneladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
