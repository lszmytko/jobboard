export type Offer = {
  post: string;
  company: string;
  city: string;
  address: string;
  postLevel: string;
  experience: "< 1 rok" | "1-3 lata" | "3-5 lat" | "5-10 lat" | "> 10 lat";
  agreementType: "UoP" | "B2B" | "Umowa zlecenie" | "Umowa o dzieło"[];
  workingTime: "pełen etat" | "część etatu"[];
  timeOfPosting: string;
  offerText: string;
  tasks: string[];
  requirements: string[];
};
