import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Model } from "mongoose";

export interface Users extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<Users>({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: async function (this: Users, email: string) {
        const user = await (this.constructor as Model<Users>).findOne({
          email: email.toLowerCase(),
        });

        if (user) {
          if (this._id === user._id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: (props) => "The specified email address is already in use.",
    },
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

UserSchema.methods.generateAuthToken = function () {
  const maxAge = 10 * 24 * 60 * 60;
  const token = jwt.sign(
    {
      _id: this._id,
    },
    `${process.env.APP_JWT_KEY}`,
    {
      expiresIn: maxAge,
    }
  );
  return token;
};

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
