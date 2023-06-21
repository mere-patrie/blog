<script>
    import { PricingBodyHead, PricingCard, PricingItemWrapper, PricingItem } from 'flowbite-svelte-blocks';
    import{ Heading, P } from "flowbite-svelte"

    export let data;
    const rank = data.returnRanks;
</script>

<div class="flex justify-center mt-4">
    <PricingCard>
        <Heading tag="h3">{rank.name}</Heading>

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
            <P weight="medium" class="w-full text-center mb-3">/month</P>
        {/if}

        <P weight="medium" class="w-full text-center mb-3">/month</P>
        <P weight="medium" class="my-3">{rank.description}</P>
        <PricingItemWrapper>
            {#each rank.characteristics as characteristic}
                <PricingItem>
                    <P weight="normal">{@html characteristic}</P>
                </PricingItem>
            {/each}

            {#if !rank?.ownIt}
                <a href="/checkout?rank={rank.name}" class="button-primary hover:gap-4 w-full">Buy<i class="bi bi-arrow-right text-xl font-bold transition-all"></i></a>
            {/if}
        </PricingItemWrapper>
    </PricingCard>
</div>