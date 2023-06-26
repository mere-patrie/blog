import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'
import { Auth } from "$lib/server/auth"
import ranks from "$lib/ranks"
import { json } from '@sveltejs/kit'

const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function POST({ cookies, request }) {
    const body = await request.json();
    const wantToBuyRank = body.rank;
    const token = cookies.get("token") || false;
    if(!token) return

    const auth = await Auth(token);
    if(auth.error) return

    const userRank = ranks.filter(rank => rank.name == auth.rank)[0];
    let rank = ranks.filter(rank => (rank.name == wantToBuyRank.name && rank.level !== 0))[0];
    const price = parseInt((rank.price-userRank.price) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: 'eur',
        payment_method_types: ['card']
    });
    
    return json({ clientSecret: paymentIntent.client_secret });
}