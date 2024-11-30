import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxTaskComponent } from './box-task.component';

describe('BoxTaskComponent', () => {
  let component: BoxTaskComponent;
  let fixture: ComponentFixture<BoxTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
