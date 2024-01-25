import { User } from "@/app/api/models/User";

export type Offer = {
  _id: string;
  user: string;
  post: string;
  company: string;
  city: string;
  address: string;
  postLevel: string;
  experience: "< 1 rok" | "1-3 lata" | "3-5 lat" | "5-10 lat" | "> 10 lat";
  agreementType: ("UoP" | "B2B" | "Umowa zlecenie" | "Umowa o dzieło")[];
  workingTime: ("pełen etat" | "część etatu")[];
  offerText: string;
  tasks: string[];
  requirements: string[];
  isActive: boolean;
  timeOfPosting: string;
  timeOfEditing: string;
  aboutCompany: string;
  creator: "employer" | "admin";
};

export type Availability =
  | "cały etat"
  | "pół etatu"
  | "dorywczo"
  | "weekendy"
  | "praca w nocy";

export type WorkerOffer = {
  email: string;
  phoneNumber: string;
  city: string;
  education: string;
  experience: string;
  availability: Availability[];
  offerText: string;
};

export type User = {
  _id: string;
  email: string;
  password: string;
  companyName: string;
  city: string;
  street: string;
  phoneNumber: string;
  flatNumber: string;
};

export type creator = "worker" | "admin";
