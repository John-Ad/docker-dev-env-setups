
import Service from "@/db-models/Service";
import User from "@/db-models/User";
import mongoose from "mongoose";

mongoose.connect("mongodb://mongo-db:27017/nextjs-example").then(() => {
    console.log("Connected to MongoDB");
});

console.log("#####  SERVICE MONGOOSE MODELS: ", mongoose.models);

export { User, Service }

