'use client';

import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage(){
    const {loading:profileLoading,data:profileData} = useProfile();
    const [redirectToItems, setRedirectToItems] = useState(false);

   
    if (redirectToItems) {
        return redirect('/menu-items');
      }
    
      if (profileLoading) {
        return 'Loading menu item info...';
      }
    
      if (!profileData.admin) {
        return 'Not an administrator';
      }
 
      async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
          const response = await fetch('/api/menu-items', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok)
            resolve();
          else
            reject();
        });
    
        await toast.promise(savingPromise, {
          loading: 'Saving this tasty item',
          success: 'Saved',
          error: 'Error',
        });
    
        setRedirectToItems(true);
      }
   

    
    
    return (
        <section className="mt-8">
          <UserTabs isAdmin={true} />
          <div className="max-w-2xl mx-auto mt-8">
            <Link href={'/menu-items'} className="button text-sm flex gap-2">
              <Left />
              <span className="pt-1">Show all menu items</span>
            </Link>
          </div>
          <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
      );
    
    
}