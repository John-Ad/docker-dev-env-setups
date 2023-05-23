import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ServiceSchema = new Schema({
    id: ObjectId,
    title: String,
    description: String,
    price: Number,
});


const Service = mongoose.models.service || mongoose.model("service", ServiceSchema);

export default Service;