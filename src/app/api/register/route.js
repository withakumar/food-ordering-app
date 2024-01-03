
import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req){
    const body = await req.json();
    const pass = body.password;
    if(!pass?.length || pass.length <5){
        new Error("Invalid password! password must be at least 5 characters");
        return false;
    }
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword,salt)

    mongoose.connect(process.env.FOA_MONGO_URL);
    const createdUser = await User.create(body)
    return Response.json(createdUser);
}