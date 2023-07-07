<script>
    import "../app.css";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Modal } from 'flowbite-svelte'
    import { fade } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { onMount } from 'svelte';
    import { Button, Link, Analytics } from "$lib/components/mines"

    export let data;
    
    let logOutModal = false;
    let searchModal = false;
	const auth = data.auth || false;
    let recognition;
    let searchInputValue = "";
    let lang;
    let doesNotSupportSpeech = false;

    onMount(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if(SpeechRecognition) doesNotSupportSpeech = false; else{
            recognition = new SpeechRecognition();
            lang = window.navigator.language;
        }
    });

    const handleInput = (event) => {
		searchInputValue = event.target.value;
	}

    function handleVoiceBtn() {
        recognition.continuous = true;
        recognition.lang = lang;
        recognition.start();
        recognition.addEventListener("result", (event) => {
            const transcript = event.results[event.resultIndex][0].transcript.trim();
            searchInputValue = transcript;
        });
    }
</script>

<svelte:head>
    <meta name="keywords" content="Blog">
    <meta name="author" content="Angus Paillaugue">
</svelte:head>

<Analytics />

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img src="favicon.svg" class="mr-3 h-6 sm:h-9" alt="Logo"/>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Code Chronicles</span>
    </NavBrand>
    <div class="flex items-center justify-center md:order-2">
        {#if auth}
            <Avatar id="avatar-menu" class="cursor-pointer" src="{auth.profilePicture || "/defaultProfilePicture.png"}" />
            <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                <DropdownHeader>
                    <span class="block text-sm"> {auth.username} </span>
                    <span class="block truncate text-sm font-medium"> {auth.email} </span>
                </DropdownHeader>
                <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownDivider />
                <DropdownItem on:click={() => logOutModal = true}>Log out</DropdownItem>
            </Dropdown>
        {:else}
            <div class="hidden md:flex flex-row items-center">
                <Button href="/sign-in">Get started</Button>
                <Link href="/log-in" class="ml-4">Log-in</Link>
            </div>
        {/if}
        <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
    </div>
    <NavUl {hidden}>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/#about">About</NavLi>
        <NavLi href="/pricing">Pricing</NavLi>
        <NavLi on:click={() => searchModal = true} class="cursor-pointer">Search</NavLi>
    </NavUl>
</Navbar>

<Modal bind:open={logOutModal} size="xs">
    <div class="text-center">
        <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 class="mb-5">Are you sure you want to log out?</h3>
        <div class="flex flex-row w-full gap-2">
            <Button colorType="gray" class="w-full" >No, cancel</Button>
            <Button href="/log-out" class="w-full" on:click={() => logOutModal = false}>Yes, I'm sure</Button>
        </div>
    </div>
</Modal>

<Modal bind:open={searchModal} size="md">
    <div class="text-center">
        <h3>Search</h3>
        <form class="flex flex-col md:flex-row items-center mt-4 gap-2" action="/search" method="GET" on:submit={() => searchModal = false}>
            <label for="searchQuery" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none {doesNotSupportSpeech ? "hidden" : ""}"><i class="bi bi-search"></i></div>
                <input type="text" id="searchQuery" name="searchQuery" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for posts, languages, ..." required value="{searchInputValue}" on:input="{handleInput}">
                <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3" on:click={handleVoiceBtn}><i class="bi bi-mic"></i></button>
            </div>
            <Button type="submit" class="w-full md:w-fit hover:gap-2"><i class="bi bi-search"></i>Search</Button>
        </form>
    </div>
</Modal>

{#key data.pathname}
    <div in:fade={{ easing: cubicOut, duration: 300 }} out:fade={{ easing: cubicIn, duration: 300 }}>
        <slot />
    </div>
{/key}