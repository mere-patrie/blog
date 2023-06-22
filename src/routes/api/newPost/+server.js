import { fail, redirect } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import { postsRef } from '$lib/server/db';
import { Auth } from '$lib/server/auth';

export async function POST({ request, cookies }) {
    const formData = await request.json();
    const { postName, postBannerUrl, postDescription, postAvailableBy, postLanguages } = formData;
    const postFile = dataURLtoFile(formData.postFile, postName.split(" ").join("-")+".md");
    const token = cookies.get("token") || false;


    if(token){
        const auth = await Auth(token);
        if(auth.admin){
            try {
                writeFileSync(`./posts/${postName.split(" ").join("-")}.md`, Buffer.from(await postFile.arrayBuffer()));
                await postsRef.insertOne({ title:postName, username:auth.username, date:new Date().getTime(), fileName:postName, banner:postBannerUrl, description:postDescription, availableBy:postAvailableBy, languages:postLanguages });
                return new Response("OK");
            }catch(err) {
                return new Response(err.code);
            }
        }else{
            return new Response("You are not an admin");
        }
    
    }else{
        throw redirect(301, "/log-in");
    }
};

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}