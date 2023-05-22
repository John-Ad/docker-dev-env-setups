import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
    id: ObjectId,
    username: String,
    password: String,
});

export default mongoose.model("user", User);