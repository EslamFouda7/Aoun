import { Donor } from "./Donor.model";
import { Foundation } from "./Foundation.model";

export interface DonationRequest {
  foundation_id:number;
  id:number;
  required_amount:number;
  location:string;
  reqiured_donation:string;
  title:string;
  description:string;
  file_path:string;
  match_percentage:number
  stats: {
    total_donated: number;
    remaining_amount: number;
    percentage_completed: number;
  };
  foundation: Foundation;
}

