import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderRowComponent } from './loader-row.component';

describe('LoaderRowComponent', () => {
  let component: LoaderRowComponent;
  let fixture: ComponentFixture<LoaderRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
