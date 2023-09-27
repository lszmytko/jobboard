import mongoose, { SchemaDefinitionProperty } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { InfoInputs } from "@/app/pracodawca/EmployerPanel/Info/Info";

const { Schema } = mongoose;

const UserDataSchema = new Schema<
  InfoInputs & { user: SchemaDefinitionProperty<number> }
>({
  companyName: { type: String },
  city: { type: String, required: true },
  street: { type: String, required: true },
  flatNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  newPassword: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

UserDataSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.newPassword = await bcrypt.hash(this.newPassword, salt);
});

UserDataSchema.methods.comparePasswords = async function (
  userPassword: string
) {
  const arePasswordMatched = await bcrypt.compare(
    userPassword,
    this.currentPassword
  );
  return arePasswordMatched;
};

export const UserData =
  mongoose.models.UserData ||
  mongoose.model<InfoInputs>("UserData", UserDataSchema);
