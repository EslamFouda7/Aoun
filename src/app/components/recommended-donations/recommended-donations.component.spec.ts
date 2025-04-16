import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedDonationsComponent } from './recommended-donations.component';

describe('RecommendedDonationsComponent', () => {
  let component: RecommendedDonationsComponent;
  let fixture: ComponentFixture<RecommendedDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedDonationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
