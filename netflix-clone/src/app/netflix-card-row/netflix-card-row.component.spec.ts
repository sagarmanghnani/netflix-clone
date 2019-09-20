import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetflixCardRowComponent } from './netflix-card-row.component';

describe('NetflixCardRowComponent', () => {
  let component: NetflixCardRowComponent;
  let fixture: ComponentFixture<NetflixCardRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetflixCardRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetflixCardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
