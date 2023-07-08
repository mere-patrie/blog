import { Auth } from "$lib/server/auth"
import ranks from "$lib/ranks"

export const load = async ({ cookies }) => {
    const token = cookies.get("token") || false;
    if(token){
        const auth = await Auth(token);
        if(auth.error) return { returnRanks:ranks.filter(rank => rank.level !== 0) };
        const userRank = ranks.filter(rank => rank.name == auth.rank)[0];
        let returnRanks = ranks.filter(rank => (rank.level !== 0));
        if(userRank.level > 0){
            returnRanks = returnRanks.map(rank => {if(rank.level <= userRank.level){return { ...rank,ownIt:true }}else return { ...rank, newPrice:Math.round((rank.price-userRank.price) * 100) / 100 }});
        }
        if(!auth.error) {if(returnRanks) return { returnRanks }; else return { returnRanks:ranks }}
    }
    return { returnRanks:ranks.filter(rank => rank.level !== 0) };
};
