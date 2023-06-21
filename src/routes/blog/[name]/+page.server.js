import { error } from '@sveltejs/kit';
import { Auth } from '$lib/server/auth';
import fs from 'fs/promises';
import { usersRef, postsRef } from '$lib/server/db';


export const load = async ({ params, cookies }) => {
    const { name } = params;
    var metadata = await postsRef.findOne({ fileName:name });
    try {
        var postContent = await fs.readFile(`./posts/${name}.md`, 'utf-8');
    }catch(err){throw error(404, 'Post not found');}
    
    if (!metadata) throw error(404, 'Post not found');
    metadata = (({ _id, ...o }) => o)(metadata);
    
    const author = await usersRef.findOne({ username:metadata.username });

    if(metadata.availableBy == "everyone") return { post:{ postContent, metadata, author:(({ password, _id, ...o }) => o)(author), path:`posts/${name}.md` } };

    const token = cookies.get("token") || false;
    if(token){
        const auth = await Auth(token);
        if(!auth.error) {
            if(metadata.availableBy.includes(auth.rank)) return { post:{ postContent, metadata, author:(({ password, _id, ...o }) => o)(author), path:`posts/${name}.md` } };
            throw error(403, { message:`You need to be ${metadata.availableBy.join(" or ")} to view this post!`, link:`/ranks/${metadata.availableBy[0]}`, buttonText:"Purchase" });
        }else{
            return { post:{ postContent, metadata, author:(({ password, _id, ...o }) => o)(author), path:`posts/${name}.md` } }
        }
    }else{
        throw error(403, 'Please log-in to access this post!');
    }
};