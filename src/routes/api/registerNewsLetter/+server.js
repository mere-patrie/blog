/** @type {import('./$types').RequestHandler} */
import { newsletterRef } from "$lib/server/db"

export async function POST({ request }) {
    try{
        const formData = await request.json();
        const { email } = formData;

        await newsletterRef.replaceOne({ email:email }, { email:email }, { upsert: true });

        return new Response(JSON.stringify({ message: "Thank you for registering." }), { status: 200 });
    }catch(err){
        return new Response(JSON.stringify({ message:err }), { status: 500 })
    }
};