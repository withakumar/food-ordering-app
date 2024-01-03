'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/UseProfile";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage(){
    const {loading:profileLoading,data:profileData} = useProfile();
    const [categoryName,setCategoryName] = useState('');
    const [categories,setCategories] = useState([]);
    const [editedCategory,setEditedCategory] = useState(null);
   // const session = useSession();

   useEffect(() => {
    fetchCategories();
    },[]);

    function fetchCategories(){
        fetch('/api/category').then(res=>{
            res.json().then(categories=>{
                //console.log({categories});
                setCategories(categories);
            })
        });
    }

    async function handleCategorySubmit(ev){
        ev.preventDefault();

        const savingCategory = new Promise(async (resolve, reject) =>
        {
            const data= {name: categoryName};
            if(editedCategory){
                data._id= editedCategory._id;
            }
            const response = await fetch('/api/category',
            { 
                method: editedCategory?'PUT':'POST',
                body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json'},
            });
            setCategoryName('');
            fetchCategories();
            if(response.ok){
                resolve();
            }else{
                reject();
            }
        });
        
        await toast.promise(savingCategory, {
            loading: editedCategory?'Updating category...':'Creating category...',
            success: editedCategory?'Category updated Successfully!':'Category created Successfully!',
            error: 'Error Occured!'
        });
    }

    async function handleDeleteClick(_id){
        const deletingCategory = new Promise(async (resolve, reject) =>
        {
            const response = await fetch('/api/category?_id='+_id,
            { 
                method: 'DELETE',
                headers:{'Content-Type': 'application/json'},
            });
            if(response.ok){
                resolve();
            }else{
                reject();
            }
        });
        
        await toast.promise(deletingCategory, {
            loading: 'Deleting category...',
            success: 'Category deleted Successfully!',
            error: 'Error Occured!'
        });

        fetchCategories();
    }
    

    if(profileLoading){
        return 'Loading category info...';
    }

    if(!profileData.admin){
        return 'Not an administrator';
    }

    
        return (
            <section className="mt-4 max-w-lg mx-auto">
                <UserTabs isAdmin={profileData.admin}/>
                <form style={{'margin':'0'}} onSubmit={handleCategorySubmit}>
                    <div className="flex gap-2">
                        <div className="grow">
                            <label> 
                                {editedCategory ?'Update Category':'New Category Name'}
                            </label>
                            <input type="text" placeholder="Category Name" style={{'margin':'0'}} 
                            value={categoryName} 
                            onChange={ev => setCategoryName(ev.target.value)}>
                            </input>
                        </div>
                        <div className="flex gap-1">
                            <button type="submit" className="text-sm mt-6" >
                                {editedCategory ?'Update':'Create'}
                            </button>
                            <button
                                type="button"
                                className="text-sm mt-6"
                                onClick={() => {
                                    setEditedCategory(null);
                                    setCategoryName('');
                                }}>
                                Cancel
                                </button>
                        </div>

                    </div>
                </form>
                <div>
                    <h2 className="mt-5 mb-1 text-sm text-gray-600 font-medium font-semibold">Categories List:</h2>
                    {
                        categories?.length> 0 && categories.map(category=>(
                            <>
                            <div key={category._id} className="bg-bg-gray-100 rounded-md p-2 px-4 flex gap-1 items-center text-sm">
                                <div className="grow">
                                    {category.name}
                                </div>
                                <div className="flex gap-1">
                                    <button type="button" onClick={()=>{setEditedCategory(category); setCategoryName(category.name)}}>Edit</button>
                                    <DeleteButton label="Delete"  onDelete={()=>handleDeleteClick(category._id)}>Delete</DeleteButton>
                                </div>
                            </div>
                            
                            </>
                        ))
                        //test
                    }
                </div>
            </section>

        )
    
    
}