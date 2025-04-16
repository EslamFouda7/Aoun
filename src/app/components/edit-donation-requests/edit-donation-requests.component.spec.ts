import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDonationRequestsComponent } from './edit-donation-requests.component';

describe('EditDonationRequestsComponent', () => {
  let component: EditDonationRequestsComponent;
  let fixture: ComponentFixture<EditDonationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDonationRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDonationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
