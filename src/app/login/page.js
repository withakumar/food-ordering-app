"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react"


export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loginInProgress,setLoginInProgress] = useState(false);
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials',{email,password,callbackUrl:'/'});
        setLoginInProgress(false);
    }
    return(

        <section className="mt-4">
        <h1 className="text-center text-primary text-4xl mb-5">Login</h1>
        <form className="max-w-full max-auto block" onSubmit={handleFormSubmit}>
            <input type="email" name="email" placeholder="Enter your email" disabled={loginInProgress} value={email} onChange={ev => setEmail(ev.target.value)}/>
            <input type="password" name="password" placeholder="Enter your password" disabled={loginInProgress} value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button type="submit" disabled={loginInProgress} >Login</button>
            <div className="my-4 text-center text-gray-500 text-sm font-semibold"> or login with social</div>
            <button onClick={()=>signIn('google',{callbackUrl:'/'})} className="flex gap-2 text-sm justify-center">
                <Image src={'/google.png'} alt="" width={20} height={20} />
                Login with google
            </button>
            <div className="my-4 text-gray-500 text-sm font-semibold flex flex-cols-2 gap-2 justify-center">
                <div>Do not have account?</div> <div><Link className="underline" href={'/register'}> Register here </Link></div>
            </div>
        </form>
        
    </section>
    );
}