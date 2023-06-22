<script>
    import { FloatingLabelInput, Alert } from 'flowbite-svelte';
    import { Button, Link } from "$lib/components/mines"
    export let form;
    if(!form)  form = { success:true };
</script>

<svelte:head>
	<title>Sign-in</title>
</svelte:head>

<div class="p-2 w-full">
    <form class="rounded-lg md:p-10 p-6  bg-transparent dark:bg-gray-700 text-start transition-all border dark:border-gray-600 border-gray-200 w-full max-w-md mx-auto flex flex-col gap-4" action="?/signIn" method= "POST">
        <h1 class="mb-4">Sign-in</h1>
        <FloatingLabelInput style="filled" id="email" name="email" type="email" label="E-mail" value="{form?.formData?.email || ''}"/>
        <FloatingLabelInput style="filled" id="username" name="username" type="text" label="Username" value="{form?.formData?.username || ''}"/>
        <FloatingLabelInput style="filled" id="password" name="password" type="password" label="Password" value="{form?.formData?.password || ''}"/>
        {#if form?.success == false}
            <Alert border color="red">
                <i class="bi bi-info-circle-fill"></i>{form.message}
            </Alert>
        {/if}
        <Button type="submit">Sign-in</Button>
        <p>Already an account, <Link href="/log-in">log-in<i class="bi bi-arrow-right font-bold"></i></Link></p>
    </form>
</div>