import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetflixDetailsComponent } from './netflix-details.component';

describe('NetflixDetailsComponent', () => {
  let component: NetflixDetailsComponent;
  let fixture: ComponentFixture<NetflixDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetflixDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetflixDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
