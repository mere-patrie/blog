<script>
    import "../app.css";
    import { fade } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { Analytics, Footer, NavBar } from "$lib/components/mines"

    export let data;
</script>

<svelte:head>
    <meta name="keywords" content="Blog">
    <meta name="author" content="Angus Paillaugue">
</svelte:head>

<Analytics />

<div class="flex flex-col min-h-screen">
    <NavBar />
    
    {#key data.pathname}
        <div in:fade={{ easing: cubicOut, duration: 300 }} out:fade={{ easing: cubicIn, duration: 300 }} class="flex-grow mb-10">
            <slot />
        </div>
    {/key}
    
    <Footer />
</div>