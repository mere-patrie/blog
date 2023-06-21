import { Auth } from "$lib/server/auth"
import { redirect } from "@sveltejs/kit";
import ranks from "$lib/ranks"

export const load = async ({ cookies, url }) => {
    const buyingRank = url.searchParams.get("rank");
    const token = cookies.get("token") || false;

    if(token){
        const auth = await Auth(token);
        if(auth.error) throw redirect(301, "/log-in");
        let userRank = ranks.filter(rank => rank.name == auth.rank)[0];
        let rank = ranks.filter(rank => (rank.name == buyingRank && rank.level !== 0));
        rank = rank.map(rank => {if(rank.level == userRank.level){throw redirect(301, "/pricing");}else return { ...rank, newPrice:Math.round((rank.price-userRank.price) * 100) / 100 }})[0];
        if(!auth.error) {if(rank) return { auth, rank }; else throw redirect(301, "/pricing"); }else throw redirect(301, "/log-in");
    }else throw redirect(301, "/log-in");
};