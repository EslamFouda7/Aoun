import { DonationRequest } from './DonationRequest.model';

export interface donation {
  amount: number;
  currency: string;
  donation_request: DonationRequest;
  donation_request_id: number;
  donor_id: number;
  id: number;
  payment_method: string;
}
