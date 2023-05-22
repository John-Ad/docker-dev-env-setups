
import mongoose from "mongoose";

mongoose.connect("mongodb://mongo-db:27017/nextjs-example").then(() => {
    console.log("Connected to MongoDB");
});

export default {};
