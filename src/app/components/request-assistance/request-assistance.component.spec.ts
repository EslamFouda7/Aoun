import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAssistanceComponent } from './request-assistance.component';

describe('RequestAssistanceComponent', () => {
  let component: RequestAssistanceComponent;
  let fixture: ComponentFixture<RequestAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAssistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
