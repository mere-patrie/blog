<script>
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import { loadStripe } from '@stripe/stripe-js'
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
    import { Elements, CardNumber, CardExpiry, CardCvc } from '$lib/components/payment'
    import { Alert, Spinner  } from 'flowbite-svelte';

    export let data;
    const auth = data.auth;
    const rank = data.rank;
    if(!rank) goto("/log-in");

    let stripe = null;
    let error = null;
    let cardElement;
    let processing = false;

    onMount(async () => {
        stripe = await loadStripe(PUBLIC_STRIPE_KEY);
    });

    async function createPaymentIntent() {
        const response = await fetch('/payment-intent', { method: 'POST' });
        const { clientSecret } = await response.json();

        return clientSecret;
    }

    async function submit() {
        if (processing) return;
        processing = true;
        const clientSecret = await createPaymentIntent();

        // confirm payment with stripe
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement
            }
        });
        
        if (result.error) {
            error = result.error;
            processing = false;
        } else {
            console.log(result);
            //   goto('/dashboard')
        }
    }
</script>
  
<svelte:head>
	<title>Checkout</title>
</svelte:head>

{#if stripe}
    <div class="max-w-xl mx-auto flex flex-col gap-4 p-4 rounded-lg border border-gray-200">
        <form on:submit|preventDefault={submit} class="flex flex-col gap-4">
            <Elements {stripe}>
                <h2>Checkout</h2>

                <a href="/pricing/{rank.name}" class="flex flex-row items-center rounded-lg border border-gray-200 p-2">
                    <img src="/{rank.name}.png" alt="Rank logo" class="w-24 h-24">
                    <div class="flex flex-col w-full">
                        <h2>{rank.name}</h2>
                        <div class="flex flex-row gap-2 w-full items-center">
                            {#if rank?.newPrice}
                                <span class="text-xl line-through font-extrabold text-red-600">{rank.price} €</span>
                                <span class="text-xl font-extrabold">{rank.newPrice} €</span>
                            {:else}
                                <span class="text-xl font-extrabold">{rank.price} €</span>
                            {/if}
                            <p class="font-semibold">/month</p>
                        </div>
                    </div>
                </a>

                <CardNumber bind:element={cardElement} classes={{ base: 'block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' }} />
                
                <div class="flex flex-row gap-4">
                    <CardExpiry classes={{ base: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' }} />
                    <CardCvc classes={{ base: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' }} />
                </div>
                
                {#if error}
                    <Alert border color="red" class="flex flex-row gap-2 items-center">
                        <i class="bi bi-info-circle-fill text-lg"></i>
                        <span class="font-medium">Error!</span> {error.message}
                    </Alert>
                {/if}
                <button disabled={processing} class="button-primary w-full">
                    {#if processing}
                    <Spinner size={5}/>
                    {:else}
                        Pay {rank.price} €
                    {/if}
                </button>
            </Elements>
        </form>
    </div>
{/if}