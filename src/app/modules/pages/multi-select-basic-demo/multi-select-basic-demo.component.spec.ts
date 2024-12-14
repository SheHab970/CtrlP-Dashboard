import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectBasicDemoComponent } from './multi-select-basic-demo.component';

describe('MultiSelectBasicDemoComponent', () => {
  let component: MultiSelectBasicDemoComponent;
  let fixture: ComponentFixture<MultiSelectBasicDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectBasicDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectBasicDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
