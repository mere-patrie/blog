import { postsRef, usersRef } from "$lib/server/db";

export async function load({ params }) {
    const searchQuery = new RegExp( params.searchQuery, 'i' )
    var results = await postsRef.find({ $or: [{ title:searchQuery }, { description:searchQuery }, { languages:searchQuery }] }).sort({ date:-1 }).project({ _id:0 }).toArray();

    if(results.length == 0) return { query:params.searchQuery, results:false };

    const getUserData = async (post) => { 
        let user = await usersRef.findOne({ username:post.username });
        user = user == null ? null : (({ password, _id, ...o }) => o)(user);
        return { ...post, user:user };
    }
    const unresolvedPromises = results.map(getUserData).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    results = await Promise.all(unresolvedPromises);

    return { query:params.searchQuery, results:results };
};