import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedinComponent } from './logedin.component';

describe('LogedinComponent', () => {
  let component: LogedinComponent;
  let fixture: ComponentFixture<LogedinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogedinComponent]
    });
    fixture = TestBed.createComponent(LogedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
