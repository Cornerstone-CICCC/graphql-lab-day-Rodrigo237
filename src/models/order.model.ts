import mongoose,{Schema, Document, Types} from "mongoose";


const OrderSchema: Schema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
})

export const Order = mongoose.model('Order', OrderSchema);