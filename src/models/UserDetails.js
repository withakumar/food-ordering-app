import {Schema,model,models} from "mongoose";
const UserDetailSchema = new Schema({
    email: {type:String, required:true,unique:true},
    phone: {type:String},
    streetAddress: {type:String},
    city: {type:String},
    state: {type:String},
    postalCode: {type:String},
    country: {type:String},
    admin: {type:Boolean,default:false}
},{timestamps:true});

export const UserDetails = models?.UserDetails || model('UserDetails', UserDetailSchema);