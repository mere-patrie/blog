<script>
    import { FloatingLabelInput, Heading, Button, Alert, A, P } from 'flowbite-svelte';
    export let form;
    if(!form)  form = { success:true };
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>

<div class="p-2 w-full">
    <form class="rounded-lg md:p-10 p-6  bg-transparent dark:bg-gray-700 text-start transition-all border dark:border-gray-600 border-gray-200 w-full max-w-md mx-auto flex flex-col gap-4" method= "POST">
        <Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">Log-in</Heading>
        <FloatingLabelInput style="filled" id="username" name="username" type="text" label="Username" value="{form?.formData?.username || ''}"/>
        <FloatingLabelInput style="filled" id="password" name="password" type="password" label="Password" value="{form?.formData?.password || ''}"/>
        {#if form?.success == false}
            <Alert border color="red">
                <svg slot="icon" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="font-medium">Error!</span> {form.message}
            </Alert>
        {/if}
        <Button size="sm" type="submit">Log-in</Button>
        <P>Don't have an account, <A href="/sign-in" textColor="text-primary-600 dark:text-primary-500" aClass="inline-flex items-center font-medium  hover:underline">sign-in
            <i class="bi bi-arrow-right text-xl font-bold transition-all ml-1"></i></A>
        </P>

        <A href="/forgot-password" textColor="text-primary-600 dark:text-primary-500" aClass="inline-flex items-center font-medium  hover:underline">Forgot password ?</A>
    </form>
</div>