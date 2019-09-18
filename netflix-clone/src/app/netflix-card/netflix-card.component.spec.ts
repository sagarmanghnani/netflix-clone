import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetflixCardComponent } from './netflix-card.component';

describe('NetflixCardComponent', () => {
  let component: NetflixCardComponent;
  let fixture: ComponentFixture<NetflixCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetflixCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetflixCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
