import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarshitComponent } from './harshit.component';

describe('HarshitComponent', () => {
  let component: HarshitComponent;
  let fixture: ComponentFixture<HarshitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HarshitComponent]
    });
    fixture = TestBed.createComponent(HarshitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
