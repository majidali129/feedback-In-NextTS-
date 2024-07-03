import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: String;
  verifyCodeExpiry: Date;
  isAcceptionMessage: boolean;
  messages: Message[];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, "user email is required"],
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifyCode: {
    type: String,
    required: [true, "verify code is required"]
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify code field must required"]
  },
  messages: [messageSchema]
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;
