import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "agent";
  country: string;
  address: string;
  phoneNumber: string;
  dob: string;
  profileImageUrl: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "agent"], default: "agent" },
  country: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dob: { type: String, required: true },
  profileImageUrl: { type: String, required: true },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
