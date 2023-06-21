import Stripe from 'stripe'
import { usersRef } from '$lib/server/db'
import { env } from '$env/dynamic/private'

const stripe = new Stripe(env.SECRET_STRIPE_KEY)

export async function POST({ request }) {
    console.log("Entering webhook");
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.warn('⚠️  Webhook signature verification failed.', err.message);

        return new Response("⚠️  Webhook signature verification failed.", { status: 400 });
    }

    console.log(event);

    if (event.type == 'charge.succeeded') {
        const charge = event.data.object;

        // TODO: fulfill the order
        // usersRef.updateOne({  })
        console.log(event);
        console.log(`✅ Charge succeeded ${charge.id}`);
    }

    return new Response("Ok");
}