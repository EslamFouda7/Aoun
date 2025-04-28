import { donation } from './donation.model';
import { StatsDonationRequest } from './StatsDonationRequest.model';

export interface DonationItem {
  donation: donation;
  status: StatsDonationRequest;
}
