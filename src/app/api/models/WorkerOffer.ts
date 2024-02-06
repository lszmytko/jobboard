import mongoose from "mongoose";
import {
  WorkerOffer as WorkerOfferType,
  WorkerOfferCreator as creatorType,
} from "@/common/types";

const { Schema } = mongoose;

type WorkerOfferSchemaType = WorkerOfferType & {
  creator: creatorType;
};

const WorkerOfferSchema = new Schema<WorkerOfferSchemaType>({
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  city: { type: String, required: true },
  experience: { type: String, required: true },
  workingTime: { type: [String], required: true },
  timeOfPosting: { type: String, required: true },
  timeOfEditing: { type: String },
  offerText: { type: String, required: false },
  status: { type: String, required: true },
  creator: { type: String, required: true },
  availability: { type: String, required: true },
  education: { type: String, required: true },
});

export const WorkerOffer =
  mongoose.models.WorkerOffer ||
  mongoose.model<WorkerOfferSchemaType>("WorkerOffer", WorkerOfferSchema);
