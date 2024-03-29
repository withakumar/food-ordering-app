import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import {User} from '@/models/User';
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongoConnect"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    secret: process.env.FOA_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.FOA_GOOGLE_CLIENT_ID,
            clientSecret: process.env.FOA_GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
            username: { label: "Email", type: "email", placeholder: "Enter your email" },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
            const email = credentials?.email;
            const password = credentials?.password;
            mongoose.connect(process.env.FOA_MONGO_URL);
            const user = await User.findOne({ email });
            const passwordOK = user && bcrypt.compareSync(password,user.password);
            if(passwordOK) {
                return user;
            }
            return null;
            }
        })
        ]
}