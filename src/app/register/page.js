"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect,useState } from "react";
import {signIn} from "next-auth/react"
import toast from "react-hot-toast";

export default function Register(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function handleFormSubmit(ev){
        ev.preventDefault();
        //console.log(email, password);
        const savingProfile = new Promise(async (resolve, reject) =>{
            const response = await fetch('/api/register',
            { 
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers:{'Content-Type': 'application/json'},
            });

        if(response.ok){
            resolve();
        }else{
            reject();
        }
         setEmail('');
         setPassword('');   
        });
        
        await toast.promise(savingProfile,{
            loading: 'Creating Profile...',
            success: 'Profile created successfully!',
            error: 'Error Occured!'
        });

        
    }
    return(
        <section className="mt-4">
            <h1 className="text-center text-primary text-4xl mb-5">Register</h1>
            

             
            <form className="max-w-full max-auto block" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="Enter your email"  value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Enter your password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                <button type="submit"  >Register</button>
                <div className="my-4 text-center text-gray-500 text-sm font-semibold"> or login with social</div>
                <button onClick={()=>signIn('google',{callbackUrl:'/'})} className="flex gap-2 text-sm justify-center">
                    <Image src={'/google.png'} alt="" width={20} height={20} />
                    Login with google
                </button>
                <div className="my-4 text-gray-500 text-sm font-semibold flex flex-cols-2 gap-2 justify-center">
                    <div>Existing account?</div> <div><Link className="underline" href={'/login'}> Login here </Link></div>
                </div>
            </form>
            
        </section>
    );
}