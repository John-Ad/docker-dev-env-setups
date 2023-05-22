import def from "../db";
import User from "@/db-models/User";
import jwt from "jsonwebtoken";

export const signIn = async (username: string, password: string): Promise<string> => {
    let user = User.findOne({ username: username, password: password });
    if (!user) {
        return "";
    }

    let token = jwt.sign({ username: username }, "secret");
    return token;
}