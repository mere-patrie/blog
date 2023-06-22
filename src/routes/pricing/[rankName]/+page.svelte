<script>
    import { PricingCard, PricingItemWrapper, PricingItem } from 'flowbite-svelte-blocks';
    import { Button, Link } from "$lib/components/mines"

    export let data;
    const rank = data.returnRanks;
</script>

<svelte:head>
	<title>{rank.name} pricing</title>
</svelte:head>

<div class="flex justify-center mt-4">
    <PricingCard>
        <h3>{rank.name}</h3>

        <div class="flex w-full justify-center">
            <img src="/{rank.name}.png" alt="Rank logo" class="w-32 h-32">
        </div>

        {#if rank?.ownIt}
            <span class="text-2xl font-extrabold">You own this rank !</span>
        {:else}
            {#if rank?.newPrice}
                <span class="text-2xl line-through font-extrabold text-red-600">{rank.price} €</span>
                <span class="text-5xl font-extrabold">{rank.newPrice} €</span>
            {:else}
                <span class="text-5xl font-extrabold">{rank.price} €</span>
            {/if}
            <p class="w-full text-center mb-3">/month</p>
        {/if}

        <p class="w-full text-center mb-3">/month</p>
        <p class="my-3">{rank.description}</p>
        <PricingItemWrapper>
            {#each rank.characteristics as characteristic}
                <PricingItem>
                    <p>{@html characteristic}</p>
                </PricingItem>
            {/each}

            {#if !rank?.ownIt}
                <Button href="/checkout?rank={rank.name}" class="w-full">Buy<i class="bi bi-arrow-right text-xl font-bold"></i></Button>
            {/if}
        </PricingItemWrapper>
    </PricingCard>
</div>