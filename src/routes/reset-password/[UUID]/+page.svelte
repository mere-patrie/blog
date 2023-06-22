<script>
    import { FloatingLabelInput, Button, Alert } from 'flowbite-svelte';
    import { Button, Link } from "$lib/components/mines"
    export let form;
    if(!form)  form = { success:null };
</script>

<svelte:head>
	<title>Reset password</title>
</svelte:head>

<div class="p-2 w-full">
    <form class="rounded-lg md:p-10 p-6  bg-transparent dark:bg-gray-700 text-start transition-all border dark:border-gray-600 border-gray-200 w-full max-w-md mx-auto flex flex-col gap-4" method= "POST">
        <h1 class="mb-4">New password</h1>
        <FloatingLabelInput style="filled" id="password" name="password" type="text" label="New password" />
        {#if form?.success == false}
            <Alert border color="red"><i class="bi bi-info-circle-fill"></i>{form.message}</Alert>
        {/if}
        <Button type="submit">Reset password</Button>
        <p>Remember your password ? <Link href="/log-in">Log-in<i class="bi bi-arrow-right font-bold"></i></Link></p>
    </form>
</div>