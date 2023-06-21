<script>
	import {  Heading, P, Alert } from 'flowbite-svelte'
	import { formatDate } from '$lib/utils';
	import languages from "$lib/languages"

	export let data;
	export let form;
	
	const posts = data.posts;
	const languagesRef = languages;
    const theme = "light";
</script>

<section class="bg-white dark:bg-gray-900 lg:min-h-screen flex justify-center items-center">
    <div class="grid max-w-7xl px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-6">
            <Heading tag="h1" class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Payments tool for software companies</Heading>
            <P class="mb-6 font-light lg:mb-8 md:text-lg lg:text-xl">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</P>
            <a href="/sign-in" class="button-primary w-fit hover:gap-4">Get started<i class="bi bi-arrow-right text-xl font-bold transition-all"></i></a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-6 lg:flex">
            <img src="/illustrations/writing-a-blog.svg" alt="mockup">
        </div>                
    </div>
</section>

<section class="flex flex-row justify-items-center max-w-[1550px] mx-auto p-4 gap-4 overflow-x-auto">
	{#each posts as post}
		<a href="/blog/{post.fileName}" class="p-0 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:scale-[102%] transition-all duration-300 w-96">
			<img src="{post.banner}" class="w-auto" alt="Post banner">
			<div class="p-4 flex flex-col gap-4 items-start">
				<Heading tag="h4">{post.title}</Heading>
				<p class="font-semibold">{post.description}</p>
				<div class="flex flex-row gap-2 items-center">
					<img src="{post.user.profilePicture || "../defaultProfilePicture.png"}" class="h-12 w-12 rounded-full" alt="{post.user.username}'s' profile picture">
					<div class="flex flex-col justify-center items-start">
						<p class="text-lg font-bold">{post?.user?.username || "No username"}</p>
						<small>Posted {formatDate(post.date)}</small>
					</div>
				</div>
				<div class="grid grid-cols-6 gap-2">
					{#each post.languages as language}
						<img src="/icons/{languagesRef.filter(lang => lang.name == language)[0].icons[theme]}" class="rounded-md" alt="{language}">
					{/each}
				</div>
			</div>
		</a>
	{/each}
</section>

<section class="bg-white dark:bg-gray-900" id="newsletter">
	<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
		<div class="mx-auto max-w-screen-md sm:text-center">
			<h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Sign up for our newsletter</h2>
			<p class="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
			<form action="?/newsLetter" method="POST">
				<div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
					<div class="relative w-full">
						<label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
						<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
						</div>
						<input class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" name="email" required="" value="{ form?.email || "" }">
					</div>
					<div>
						<button type="submit" class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
					</div>
				</div>
				<div class="mx-auto max-w-screen-sm">
					{#if form?.success == false}
						<Alert border color="red">
							<svg slot="icon" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
							<span class="font-medium">Error!</span> {form.message}
						</Alert>
						{:else}
						{#if form?.success == true}
						<Alert border color="green">
							<svg slot="icon" aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
							<span class="font-medium">Done!</span> Thank you for registering to our newsletter
						</Alert>
						{/if}
					{/if}
				</div>
				<div class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="/privacy-policy" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
			</form>
		</div>
	</div>
</section>