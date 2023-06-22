<script>
    import { FloatingLabelInput, Heading, Button, Alert, A, P } from 'flowbite-svelte';
    export let form;
    if(!form)  form = { success:null };
</script>

<svelte:head>
	<title>Forgot password</title>
</svelte:head>

<div class="p-2 w-full">
    <form class="rounded-lg md:p-10 p-6  bg-transparent dark:bg-gray-700 text-start transition-all border dark:border-gray-600 border-gray-200 w-full max-w-md mx-auto flex flex-col gap-4" method= "POST">
        <Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">Forgot password</Heading>
        <FloatingLabelInput style="filled" id="username" name="username" type="text" label="Username" value="{form?.formData?.username || ''}"/>
        {#if form?.success == false}
            <Alert border color="red">
                <svg slot="icon" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="font-medium">Error!</span> {form.message}
            </Alert>
        {:else}
            {#if form?.success == true}
                <Alert border color="green">
                    <svg slot="icon" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    Go check your email to reset your password.
                </Alert>
            {/if}
        {/if}
        <Button size="sm" type="submit">Reset password</Button>
        <P>Remember your password ? <A href="/log-in" textColor="text-primary-600 dark:text-primary-500" aClass="inline-flex items-center font-medium  hover:underline">Log-in
            <svg aria-hidden="true" class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></A>
        </P>
    </form>
</div>