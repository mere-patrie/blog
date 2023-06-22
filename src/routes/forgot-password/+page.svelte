<script>
    import { FloatingLabelInput, Alert } from 'flowbite-svelte';
    import { Button, Link } from "$lib/components/mines"

    export let form;
    if(!form)  form = { success:null };
</script>

<svelte:head>
	<title>Forgot password</title>
</svelte:head>

<div class="p-2 w-full">
    <form class="rounded-lg md:p-10 p-6  bg-transparent dark:bg-gray-700 text-start transition-all border dark:border-gray-600 border-gray-200 w-full max-w-md mx-auto flex flex-col gap-4" method= "POST">
        <h1 class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">Forgot password</h1>
        <FloatingLabelInput style="filled" id="username" name="username" type="text" label="Username" value="{form?.formData?.username || ''}"/>
        {#if form?.success == false}
            <Alert border color="red">
                <i class="bi bi-info-circle-fill"></i>{form.message}
            </Alert>
        {:else}
            {#if form?.success == true}
                <Alert border color="green">
                    <i class="bi bi-info-circle-fill"></i>Go check your email to reset your password.
                </Alert>
            {/if}
        {/if}
        <button class="button-primary" type="submit">Reset password</button>
        <p>Remember your password ? <Link href="/log-in">Log-in<i class="bi bi-arrow-right font-bold"></i></Link></p>
    </form>
</div>