import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Service = new Schema({
    id: ObjectId,
    title: String,
    description: String,
    price: Number,
});

export default mongoose.model("service", Service);