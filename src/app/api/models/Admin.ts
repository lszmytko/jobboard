import mongoose from "mongoose";
import jwt from "jsonwebtoken";
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

AdminSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, name: this.name },
    process.env.NEXT_PUBLIC_JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
};

AdminSchema.methods.comparePasswords = async function (
  candidatePassword: string
) {
  const arePasswordMatched = await bcrypt.compare(
    candidatePassword,
    this.password
  );
  return arePasswordMatched;
};

export const Admin =
  mongoose.models.Admin || mongoose.model<Admin>("Admin", AdminSchema);
