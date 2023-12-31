import mongoose, { SchemaDefinitionProperty } from "mongoose";
import { Offer as OfferType } from "@/common/types";

const { Schema } = mongoose;

type OfferSchemaType = OfferType & {
  user: SchemaDefinitionProperty<number>;
} & { status: string } & { timeOfPosting: string };

const OfferSchema = new Schema<OfferSchemaType>({
  post: { type: String, required: true },
  company: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  postLevel: { type: String, required: true },
  experience: { type: String, required: true },
  agreementType: { type: [String], required: true },
  workingTime: { type: [String], required: true },
  timeOfPosting: { type: String, required: true },
  offerText: { type: String, required: false },
  tasks: { type: [String], required: true },
  requirements: { type: [String], required: true },
  isActive: { type: Boolean },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: { type: String, required: true },
});

export const Offer =
  mongoose.models.Offer ||
  mongoose.model<OfferSchemaType>("Offer", OfferSchema);
