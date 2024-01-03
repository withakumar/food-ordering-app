
import mongoose from "mongoose";
import { MenuItem } from "@/models/MenuItem";
import {isAdmin} from "@/app/api/auth/[...nextauth]/route";

export async function POST(req){
    const data = await req.json();
    //console.log(data)
    mongoose.connect(process.env.FOA_MONGO_URL);
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
}

export async function GET(){
   
    mongoose.connect(process.env.FOA_MONGO_URL);
    const menuItems = await MenuItem.find();
    return Response.json(menuItems);
}

export async function PUT(req) {
    mongoose.connect(process.env.FOA_MONGO_URL);
    if (await isAdmin()) {
      const {_id, ...data} = await req.json();
      await MenuItem.findByIdAndUpdate(_id, data);
    }
    return Response.json(true);
  }

  export async function DELETE(req) {
    mongoose.connect(process.env.FOA_MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()) {
      await MenuItem.deleteOne({_id});
    }
    return Response.json(true);
  }