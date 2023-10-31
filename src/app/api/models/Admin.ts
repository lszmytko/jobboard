import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

interface Admin {
  name: string;
  password: string;
}

const AdminSchema = new Schema<Admin>({
  name: { type: String, unique: true },
  password: { type: String, required: true },
});

AdminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

export const Admin =
  mongoose.models.Admin || mongoose.model<Admin>("Admin", AdminSchema);
