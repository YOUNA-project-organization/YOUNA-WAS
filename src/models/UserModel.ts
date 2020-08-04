import mongoose, { Schema } from "mongoose";
import { IUser } from "./ModelTypes";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
