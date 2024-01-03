import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link,setLink}){
    async function handleFileChange(ev){
        const files = ev.target.files;
        //const file = ev.target.files[0];
        if(files?.length >0){
            const data = new FormData;
            data.set('file', files[0]);
            
            const fileUploading = new Promise(async (resolve, reject) =>{
                const response = await fetch('/api/upload',{
                    method: 'POST',
                    body: data
                });
                if(response.ok){
                    response.json().then(link=>{
                        setLink(link);
                    });
                    resolve();
                }else{
                    reject();
                }
            });
            
            await toast.promise(fileUploading, {
                loading: 'Uploading Image...',
                success: 'Image Uploaded Successfully!',
                error: 'Error Occured!'
            });
        }
    }

    return (<>
        {
            link && (
                <Image src={link} width={95} height={95} className="rounded-full mb-5" alt="user Image"/>
            )
        }

         {!link && (
                <div className="bg-g bg-gray-200 p-3 text-gray-500 rounded-lg mb-5 text-sm text-center h-15 font-medium" >No image</div>
            )
        }
        
        <label className="">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="text-gray-600 text-sm font-normal border rounded-lg py-2 px-1">Change avatar</span>
        </label>
    </>)
}