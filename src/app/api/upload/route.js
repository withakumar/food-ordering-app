import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
import { Buffer } from "buffer";
export async function POST(req){
    const data = await req.formData();
    //console.log("Uploaded File--",data);
    if(data.get('file')){
        const file = data.get('file');
        const s3Client = new S3Client({
            region: process.env.FOA_AWS_REGION,
            credentials:{
                accessKeyId: process.env.FOA_AWS_ACCESS_KEY,
                secretAccessKey: process.env.FOA_AWS_SECRET_KEY,
            },
        });
        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uniqid()+'.'+ext;
        const chunks = [];
        for await( const chunk of file.stream() ) {
            chunks.push(chunk);
        }
        const buffer = new Buffer.concat(chunks);

        await s3Client.send(new PutObjectCommand({
            Bucket: process.env.FOA_AWS_BUCKET,
            Key: newFileName,
            ContentType: file.type,
            ACL: 'public-read',
            Body: buffer,
        }))
        //console.log(file);
        //upload the file
        const link = 'https://'+process.env.FOA_AWS_BUCKET+'.s3.amazonaws.com/'+newFileName;
        return Response.json(link);
    }
    return Response.json("Ok");
}