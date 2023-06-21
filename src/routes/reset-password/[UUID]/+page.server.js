import { Auth } from "$lib/server/auth"
import { usersRef, resetPasswordTokensRef } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AUTH_TOKEN_SECRET } from "$env/static/private"

export const load = async ({ cookies  }) => {
    const token = cookies.get("token") || false;
    if(token){
        const auth = await Auth(token);
        if(!auth.error) throw redirect(301, "/dashboard");
    }
};

export const actions = {
    default: async ({ request, params, cookies }) => {
        try{
            const formData = Object.fromEntries(await request.formData());
            const { password } = formData;
    
            const { username } = await resetPasswordTokensRef.findOne({ token:params.UUID });

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await usersRef.updateOne({ username:username }, { $set: { password:hash } });
            await resetPasswordTokensRef.deleteOne({ username:username });

            cookies.set("token", generateAccessToken(username), { path:"/", sameSite:"strict" });
            throw redirect(301, "/dashboard");
        }catch(err){
            console.log(err);
        }
    }
};

function generateAccessToken(username) {return jwt.sign(username, AUTH_TOKEN_SECRET);}