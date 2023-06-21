<script>
    import "../app.css";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider, Button, A, Modal, Spinner  } from 'flowbite-svelte'
    import { fade } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'

    
    export let data;
    
    let logOutModal = false;
	const auth = data.auth || false;
</script>

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img src="" class="mr-3 h-6 sm:h-9" alt="Logo"/>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
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
            <div class="hidden md:block">
                <Button size="sm" href="/sign-in">Get started</Button>
                <A href="/log-in" class="underline hover:no-underline ml-4">Log-in</A>
            </div>
        {/if}
        <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
    </div>
    <NavUl {hidden}>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/#about">About</NavLi>
        <NavLi href="/pricing">Pricing</NavLi>
        <div class="block md:hidden">
            <DropdownDivider />
            {#if auth}
                <NavLi href="/dashboard">Dashboard</NavLi>
                <NavLi href="/settings">Settings</NavLi>
                <NavLi on:click={() => logOutModal = true}>Log out</NavLi>
            {:else}
                <NavLi href="/log-in">Log-in</NavLi>
                <Button size="sm" href="/sign-in" class="mt-2">Sign-in</Button>
            {/if}
        </div>
    </NavUl>
</Navbar>

<Modal bind:open={logOutModal} size="xs" autoclose>
    <div class="text-center">
        <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to log out?</h3>
        <div class="flex flex-row w-full gap-2">
            <button class="button-border-gray w-full" >No, cancel</button>
            <a href="/log-out" class="button-primary w-full">Yes, I'm sure</a>
        </div>
    </div>
</Modal>

{#key data.pathname}
    <div in:fade={{ easing: cubicOut, duration: 300 }} out:fade={{ easing: cubicIn, duration: 300 }}>
        <slot />
    </div>
{/key}