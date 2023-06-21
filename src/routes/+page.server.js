import { postsRef, usersRef, newsletterRef} from "$lib/server/db";

export async function load() {
    var posts = await postsRef.find({  }).project({ _id:0 }).limit(10).toArray();

    const getUserData = async (post) => { 
        let user = await usersRef.findOne({ username:post.username });
        user = user == null ? null : (({ password, _id, ...o }) => o)(user);
        return { ...post, user:user };
    }
    const unresolvedPromises = posts.map(getUserData).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    posts = await Promise.all(unresolvedPromises);

    return { posts }
}

export const actions = {
    newsLetter: async ({ request }) => {
        try{
            const formData = Object.fromEntries(await request.formData());
            const { email } = formData;

            await newsletterRef.replaceOne({ email:email }, { email:email }, { upsert: true });

            return { success:true, email:email, message:"test" }
        }catch(err){
            return { success:false, email:email, message:err }
        }
    }
};