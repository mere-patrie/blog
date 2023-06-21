import { Auth } from "$lib/server/auth"
import ranks from "$lib/ranks"

export const load = async ({ params, cookies }) => {
    const { rankName } = params;
    const token = cookies.get("token") || false;

    if(token){
        let auth = await Auth(token);
        let userRank = ranks.filter(rank => rank.name == auth.rank)[0];
        let returnRanks = ranks.filter(rank => (rank.name == rankName && rank.level >= userRank.level));
        returnRanks = returnRanks.map(rank => {if(rank.level == userRank.level){return { ...rank,ownIt:true }}else return { ...rank, newPrice:Math.round((rank.price-userRank.price) * 100) / 100 }})[0];
        if(!auth.error) {if(returnRanks) return { returnRanks }; else return { returnRanks:ranks.filter(rank => rank.name == rankName)[0] }; }
    }
    return { returnRanks:ranks.filter(rank => rank.name == rankName)[0] };
};