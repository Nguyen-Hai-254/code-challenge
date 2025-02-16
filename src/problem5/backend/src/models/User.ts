import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    age: number;
    salary: number;
    phone: string;
    avatar: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, required: true },
        salary: { type: Number },
        phone: { type: String },
        avatar: { type: String }
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
