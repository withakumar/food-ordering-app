import {getServerSession} from "next-auth"
import { authOptions } from "./auth";
import {UserDetails} from '@/models/UserDetails';
import * as mongoose from "mongoose";

export async function isAdmin (){
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return false;
    }
    mongoose.connect(process.env.FOA_MONGO_URL);
    const userDetail = await UserDetails.findOne({email:userEmail});
    //console.log({userDetail})
    if (!userDetail) {
      return false;
    }
    
    return true;
  };