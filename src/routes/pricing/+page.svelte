<script>
    import { PricingCard, PricingItemWrapper, PricingHead, PricingItem } from 'flowbite-svelte-blocks';
    import{ Heading, P } from "flowbite-svelte"

    export let data;
    const ranks = data.returnRanks;
</script>

<svelte:head>
	<title>Pricing</title>
</svelte:head>

<PricingHead class="mt-4">
    <svelte:fragment slot="h2">Designed for business teams like yours</svelte:fragment>
    <svelte:fragment slot="paragraph">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</svelte:fragment>
</PricingHead>

<div class="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0 max-w-5xl mx-auto">
    {#each ranks as rank}
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
                <div class="flex w-full justify-center">
                    <a href="/pricing/{rank.name}" class="link">Learn more</a>
                </div>
            </PricingItemWrapper>
        </PricingCard>
    {/each}
</div>