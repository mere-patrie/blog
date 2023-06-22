<script>
    export let data;
    const auth = data.auth;

    import { Modal, Heading } from 'flowbite-svelte'
    let logOutModal = false;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="max-w-xl w-full mx-auto">
    <Heading tag="h1">Welcome {auth.username}</Heading>
    <hr>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/settings" class="card-button"><i class="bi bi-sliders"></i><span>Settings<p>Change your account informations</p></span></a>
        <button on:click={() => logOutModal = true} class="card-button"><i class="bi bi-door-closed"></i><span>Sign out<p>Disconnect from this account</p></span></button>
    </div>
</div>

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