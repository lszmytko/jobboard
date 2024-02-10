import mongoose from "mongoose";

import { Offer as OfferType } from "@/common/types";

const { Schema } = mongoose;

type OfferSchemaType = Omit<OfferType, "timeOfPosting" | "timeOfEditing"> & {
  status: string;
  timeOfPosting: Date;
  timeOfEditing: Date;
};

const OfferSchema = new Schema<OfferSchemaType>({
  post: { type: String, required: true },
  company: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String, required: true },
  agreementType: { type: [String], required: true },
  workingTime: { type: [String], required: true },
  timeOfPosting: { type: Date, required: true, default: null },
  timeOfEditing: { type: Date, default: null },
  offerText: { type: String, required: false },
  tasks: { type: [String], required: true },
  requirements: { type: [String], required: true },
  isActive: { type: Boolean },
  status: { type: String, required: true },
  creator: { type: String, required: true },
  minSalary: { type: String, required: true },
  maxSalary: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  salaryOption: { type: String, required: true },
});

export const Offer =
  mongoose.models.Offer ||
  mongoose.model<OfferSchemaType>("Offer", OfferSchema);
