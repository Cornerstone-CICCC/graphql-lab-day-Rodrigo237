import mongoose,{Schema, Document} from "mongoose";
import { ICustomer } from "../types/customer";



const CustomerSchema: Schema = new Schema<ICustomer>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);