import { error } from '@sveltejs/kit';
import { Auth } from '$lib/server/auth';
import { usersRef, postsRef } from '$lib/server/db';

export const load = async ({ params, cookies }) => {
    const { name } = params;
    var post = await postsRef.findOne({ fileName:name });
    
    if (!post) throw error(404, 'Post not found');
    post = (({ _id, ...o }) => o)(post);
    
    var author = await usersRef.findOne({ username:post.username });
    author = (({ password, _id, ...o }) => o)(author);
    if(post.availableBy == "everyone") return { post };

    const token = cookies.get("token") || false;
    if(token){
        const auth = await Auth(token);
        if(!auth.error) {
            if(post.availableBy.includes(auth.rank)) return { post };
            throw error(403, { message:`You need to be ${post.availableBy.join(" or ")} to view this post!`, link:`/ranks/${post.availableBy[0]}`, buttonText:"Purchase" });
        }else{
            return { post }
        }
    }else{
        throw error(403, { message:`You need to be logged-in to view this post!`, link:`/log-in`, buttonText:"Log-in" });
    }
};