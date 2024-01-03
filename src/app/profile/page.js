'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import EditableImage from "../../components/layout/EditableImage";

export default function ProfilePage(){
    const session = useSession();
    //console.log(session?.data?.user?.name);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;

   
    useEffect( ()=>{
        if(status === 'authenticated'){
            
            fetch('/api/profile/').then(response =>{
                //console.log({response});
                response.json().then(data=>{
                    //console.log(data);
                    setUser(data);
                    setIsAdmin(data?.admin);
                    setProfileFetched(true);
                })
            });
        }
    },[session,status]);

    async function handleProfileInfoUpdate(ev,data){
        ev.preventDefault();
      
        const savingProfile = new Promise(async (resolve, reject) =>{
            const response = await fetch('/api/profile',
            { 
                method: 'PUT',
                body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json'},
            });
       
            if(response.ok){
                resolve();
            }else{
                reject();
            }
        });

        await toast.promise(savingProfile,{
            loading: 'Saving Profile...',
            success: 'Profile Saved Successfully!',
            error: 'Error Occured!'
        });

    }

    if(status === 'loading' || !profileFetched) { 
        return 'Profile loading...';
    }
    if(status === 'unauthenticated'){
        return redirect('/login');
    }

    if(status === 'authenticated'){

        //console.log(userImage);
        return (
            <section className="mt-4">
                <UserTabs isAdmin={isAdmin}/>
                
                <div className="max-w-xl mx-auto">
                    <UserForm user={user} onSave={handleProfileInfoUpdate} />
                </div>
            </section>
        )
    }
}