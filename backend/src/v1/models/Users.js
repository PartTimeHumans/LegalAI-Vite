import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

/**
 * @desc  User Schema models
 */
var UserSchema = new Schema(
  {
    first_name: {
      type: String,
      default: "",
      required: true,
    },
    last_name: {
      type: String,
      default: "",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      default: "User",
      required: true,
    },
    address: {
      type: String,
      default: "",
      required: true,
    },
    phone: {
      type: String,
      default: "",
      required: true,
    },
    secondary_phone: {
      type: String,
      default: "",
      required: true,
    },
    father_name: {
      type: String,
      default: "",
      required: true,
    },
    mother_name: {
      type: String,
      default: "",
      required: true,
    },
    gender: {
      type: String,
      default: "",
      required: true,
    },
    DOB: {
      type: String,
      default: "",
      required: true,
    },
    nationality: {
      type: String,
      default: "",
      required: true,
    },
    caste: {
      type: String,
      default: "",
      required: true,
    },
    occupation: {
      type: String,
      default: "",
      required: true,
    },
    jail: {
      type: String,
      default: "",
    },
    cases: [{ type: Schema.Types.ObjectId, ref: "CourtCase" }],
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
User.createIndexes();
export default User;
