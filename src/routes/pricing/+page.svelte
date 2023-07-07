<script>
    import { PricingCard, PricingItemWrapper, PricingHead, PricingItem } from 'flowbite-svelte-blocks';
    import { Button, Link } from "$lib/components/mines"

    export let data;
    const ranks = data.returnRanks;
</script>

<svelte:head>
	<title>Pricing</title>
</svelte:head>

<PricingHead class="mt-4">
    <svelte:fragment slot="h2">Our ranks</svelte:fragment>
    <svelte:fragment slot="paragraph">Ranks are used to access blog posts restricted to normal users.</svelte:fragment>
</PricingHead>

<div class="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0 max-w-5xl mx-auto">
    {#each ranks as rank}
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
                <div class="flex w-full justify-center">
                    <Link href="/pricing/{rank.name}">Learn more</Link>
                </div>
            </PricingItemWrapper>
        </PricingCard>
    {/each}
</div>