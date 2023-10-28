import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

interface User {
  email: string;
  password: string;
  companyName: string;
  city: string;
  street: string;
  localNumber: string;
  phoneNumber: string;
  comparePasswords: (password: string) => boolean;
}

const UserSchema = new Schema<User>({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  companyName: { type: String },
  city: { type: String },
  street: { type: String },
  localNumber: { type: String },
  phoneNumber: { type: String },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.NEXT_PUBLIC_JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
};

UserSchema.methods.comparePasswords = async function (
  candidatePassword: string
) {
  const arePasswordMatched = await bcrypt.compare(
    candidatePassword,
    this.password
  );
  return arePasswordMatched;
};

export const User =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);
