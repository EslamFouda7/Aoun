import { Foundation } from "./Foundation.model";

export interface DonationRequest {
  foundation_id:number;
  id:number;
  required_amount:number;
  location:string;
  title:string;
  description:string;
  file_path:string;
  foundation: Foundation;    
}

