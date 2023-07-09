import { postsRef, usersRef } from "$lib/server/db";

export async function load() {
    var posts = await postsRef.find({  }).project({ _id:0 }).sort({date:-1}).limit(10).toArray();

    const getUserData = async (post) => { 
        let user = await usersRef.findOne({ username:post.username });
        user = user == null ? null : (({ password, _id, ...o }) => o)(user);
        return { ...post, user:user };
    }
    const unresolvedPromises = posts.map(getUserData).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    posts = await Promise.all(unresolvedPromises);

    return { posts }
}