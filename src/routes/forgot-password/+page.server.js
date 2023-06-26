import { Auth } from "$lib/server/auth"
import { usersRef, resetPasswordTokensRef } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import { v4 as randomUUID } from 'uuid';
import { sendEmail } from "$lib/server/sendEmail";

export const load = async ({ cookies }) => {
    const token = cookies.get("token") || false;
    if(token){
        const auth = await Auth(token);
        if(!auth.error) throw redirect(301, "/dashboard");
    }
};

export const actions = {
    default: async ({ request }) => {
        try{
            const formData = Object.fromEntries(await request.formData());
            const { username } = formData;
    
            const userExists = await usersRef.findOne({ username:username });
            if(!userExists) return { success:false, formData:formData, message:"No account with this username!" };

            const email = userExists.email;

            const userToken = randomUUID()
            let token = await resetPasswordTokensRef.findOne({ username:userExists })

            if (!token) {
                token = await resetPasswordTokensRef.insertOne({ username:username, token:userToken })
            } else if (token.expires < new Date()) {
                // Each token has an expiry date. 
                // If the token is expired, delete it and make a new one
                await token.deleteOne()
                await resetPasswordTokensRef.deleteOne({ username:username });
                token = await resetPasswordTokensRef.insertOne({ username:username, token:userToken });
            }
    
            const link = `http://localhost:5173/reset-password/${userToken}`;
    
            await sendEmail({
                subject: 'Password Reset',
                text: `Reset your password`,
                to: email,
                attachment: [{
                    data: `<div>Click the link below to reset your password: <br/><br/><a href="${link}">Reset password</a></div>`,
                    alternative: true
                }]
            });
    
            return { success:true, message: 'Password reset email sent' }
    

        }catch(err){
            console.log(err);
        }
    }
};