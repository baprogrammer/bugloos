import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponentComponent } from './radio-component.component';

describe('RadioComponentComponent', () => {
  let component: RadioComponentComponent;
  let fixture: ComponentFixture<RadioComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
