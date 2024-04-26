import { availability, salaryOptions, workingTimeOptions } from "./consts";

type OfferStatus = "pending" | "active" | "inactive";

export type AgreementType = (
  | "UoP"
  | "B2B"
  | "Umowa zlecenie"
  | "Umowa o dzieło"
)[];

export type OfferWorkingTime = ("pełen etat" | "część etatu")[];

export type Offer = {
  _id: string;
  user: string;
  post: string;
  company: string;
  city: string;
  address: string;
  email: string;
  experience: "< 1 rok" | "1-3 lata" | "3-5 lat" | "5-10 lat" | "> 10 lat";
  agreementType: ("UoP" | "B2B" | "Umowa zlecenie" | "Umowa o dzieło")[];
  workingTime: OfferWorkingTime;
  offerText: string;
  tasks: string[];
  requirements: string[];
  isActive: boolean;
  timeOfPosting: string;
  timeOfEditing: string;
  creator: "employer" | "admin";
  status: OfferStatus;
  minSalary: string;
  maxSalary: string;
  phoneNumber: string;
  salaryOption: "hourly" | "monthly";
  salaryGrossNet: "gross" | "net";
};

export type WorkingTime = (typeof workingTimeOptions)[number];

export type WorkerOffer = {
  _id: string;
  postTitle: string;
  email: string;
  phoneNumber: string;
  city: string;
  education: string;
  experience: string;
  workingTime: WorkingTime[];
  offerText: string;
  status: OfferStatus;
  timeOfPosting: string;
  timeOfEditing: string;
  creator: WorkerOfferCreator;
  availability: Availability;
};

export type WorkerOfferFormInputs = Pick<
  WorkerOffer,
  | "email"
  | "phoneNumber"
  | "education"
  | "experience"
  | "city"
  | "offerText"
  | "availability"
  | "postTitle"
> & {
  workingTime: { name: WorkingTime }[];
};

export type WorkerOfferCreator = "worker" | "admin";

export type Availability = (typeof availability)[number];

export type SalaryOptions = (typeof salaryOptions)[number];

export type SearchOption = "pracodawcy" | "pracownicy";
