'use client';
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";

export default function MenuItemPage(){
    const {loading:profileLoading,data:profileData} = useProfile();
    const [menuItems, setMenuItems] = useState([]);
   
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
          res.json().then(menuItems => {
            setMenuItems(menuItems);
          });
        })
      }, []);

 


    if(profileLoading){
        return 'Loading menu items...';
    }

    if(!profileData.admin){
        return 'Not an admin';
    }

    
        return (
            <section className="mt-4 max-w-lg mx-auto">
                <UserTabs isAdmin={true}/>
                <div className="mt-4 text-center flex flex-col">
                    <div >
                        <Link
                        className="button flex text-sm gap-2"
                        href={'/menu-items/new'}>
                        <span className="pt-1">Crete new menu item</span>
                        <Right />
                        </Link>
                    </div>
                </div>
                <div>
                    <h2 className="text-sm text-gray-500 mt-3">Edit menu item:</h2>
                    <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link
                        key={item._id}
                        href={'/menu-items/edit/'+item._id}
                        className="bg-gray-200 rounded-lg p-4"
                        >
                        <div className="relative">
                            <Image
                            className="rounded-md max-h-auto max-h-24 block max-auto"
                            src={item.image} alt={''} width={120} height={120} />
                        </div>
                        <div className="text-center text-sm mt-3">
                            {item.name}
                        </div>
                        </Link>
                    ))}
                    </div>
                </div>
            </section>

        )
    
    
}