import { Auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { sendEmail } from "$lib/server/sendEmail";
import { newsletterRef } from "$lib/server/db";

export const actions = {
    default: async ({ cookies, request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { mailObject, mailContent } = formData;

        const token = cookies.get("token") || false;
        if(token){
            const auth = await Auth(token);
            if(auth.admin){
                const emails = await newsletterRef.find({  }).toArray();
                emails.forEach(async(email) => {
                    await sendEmail({
                        subject: mailObject,
                        text: mailContent,
                        to: email.email,
                        attachment: []
                    });
                })
            }else{
                return
            }
        }else {
            throw redirect(301, "/log-in");
        }
    }
};