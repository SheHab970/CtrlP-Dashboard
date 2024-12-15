import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServIcesComponent } from './serv-ices.component';

describe('ServIcesComponent', () => {
  let component: ServIcesComponent;
  let fixture: ComponentFixture<ServIcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServIcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServIcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
