import mongoose, { SchemaDefinitionProperty } from "mongoose";
import { Offer as OfferType } from "@/common/types";

const { Schema } = mongoose;

const OfferSchema = new Schema<
  OfferType & { user: SchemaDefinitionProperty<number> }
>({
  post: { type: String, required: true },
  company: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  postLevel: { type: String, required: true },
  experience: { type: String, required: true },
  agreementType: { type: String, required: true },
  workingTime: { type: String, required: true },
  timeOfPosting: { type: String, required: true },
  offerText: { type: String, required: true },
  tasks: { type: [String], required: true },
  requirements: { type: [String], required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Offer =
  mongoose.models.User || mongoose.model<OfferType>("Offer", OfferSchema);
