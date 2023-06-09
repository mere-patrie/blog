<script>
	import { Button, Link } from "$lib/components/mines"
	import {  Alert } from 'flowbite-svelte'
	import { formatDate } from '$lib/utils'
	import languages from "$lib/languages"

	export let data;

	const posts = data.posts;
	const languagesRef = languages;
    const theme = "light";
	let successfullyRegisteredToNewsletter;
	let newsLetterEmail = successfullyRegisteredToNewsletter?.email || "";

	function subscribeToNewsletter(){
		fetch("/api/registerNewsLetter", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email:newsLetterEmail})
        }).then((data) => {
			successfullyRegisteredToNewsletter = data;
		});
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="bg-white dark:bg-gray-900 lg:min-h-screen flex justify-center items-center">
    <div class="grid max-w-7xl px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 grid-rows-2 md:grid-rows-1">
        <div class="mr-auto place-self-center lg:col-span-6 text-center md:text-left">
            <h1 class="max-w-2xl mb-4 font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Articles about Web development</h1>
            <p class="mb-6 font-light lg:mb-8 md:text-lg lg:text-xl">Here, you can learn nearly anything related to Web development.</p>
			<Button href="/sign-in" class="md:mx-0 mx-auto">Get started<i class="bi bi-arrow-right text-xl font-bold"></i></Button>
        </div>
        <div class="lg:mt-0 lg:col-span-6 lg:flex">
            <img src="/illustrations/writing-a-blog.svg" alt="Mockup">
        </div>                
    </div>
</section>

{#if posts.length > 0}	
	<section class="max-w-7xl mx-auto mt-10">
		<h2 class="ml-4">Our latest posts</h2>
		<div class="flex flex-no-wrap overflow-x-auto scrolling-touch items-start gap-4 p-4 pb-6">
			{#each posts as post}
				<a href="/blog/{post.fileName}" class="flex-none w-72 sm:w-96 p-0 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:scale-[102%] transition-all duration-300">
					<img src="{post.banner}" class="w-auto blogCoverImg" alt="Post banner" data-flip-id="post-cover-img-{post.title.split(" ").join("-")}">
					<div class="p-4 flex flex-col gap-4 items-start">
						<h4 class="blogTitle" data-flip-id="post-title-{post.title.split(" ").join("-")}">{post.title}</h4>
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
		</div>
	</section>
{/if}

<section id="about" class="max-w-7xl mx-auto mt-10">
	<h2 class="ml-4">About us</h2>
	<div class="border border-gray-200 rounded-lg overflow-hidden p-4 mt-4 flex flex-col gap-4">
		<p class=" indent-8">Welcome to Code Chronicles, your go-to resource for all things web development! Whether you're a seasoned developer looking to enhance your skills or a beginner taking your first steps into the fascinating world of web development, this blog is here to inspire, educate, and guide you on your journey.</p>
	
		<p class="indent-8">At Code Chronicles, we are passionate about all aspects of web development, from front-end design to back-end coding, and everything in between. Our dedicated team of experienced web developers and designers is committed to providing you with valuable insights, practical tips, and up-to-date information on the latest trends, techniques, and technologies in the rapidly evolving web development landscape.</p>
			
		<p class=" indent-8">Through our articles, tutorials, and case studies, we strive to demystify complex concepts and make web development accessible to everyone. We believe that learning should be a continuous process, and our goal is to empower you with the knowledge and tools you need to build beautiful, functional, and high-performing websites and web applications.</p>
			
		<p class=" indent-8">Whether you're interested in mastering HTML, CSS, JavaScript, or diving into frameworks and libraries like React, Angular, or Vue.js, we have you covered. Our content is carefully crafted to cater to developers of all skill levels, from beginners taking their first steps to professionals seeking advanced techniques and best practices.</p>
			
		<p class=" indent-8">In addition to technical topics, we also explore the broader aspects of web development, including user experience (UX) design, responsive web design, search engine optimization (SEO), performance optimization, and more. We believe that a holistic approach to web development leads to superior results, and we're eager to share our knowledge with you.</p>
			
		<p class=" indent-8">Join our vibrant community of developers, designers, and enthusiasts, and be part of the conversation. We encourage you to engage with our content, ask questions, and share your experiences. Together, let's push the boundaries of what's possible in web development and create a brighter digital future.</p>
			
		<p class=" indent-8">Thank you for visiting Code Chronicles. We're excited to have you on board, and we look forward to embarking on this web development journey with you!</p>
	</div>
</section>

<section class="p-4 mt-10" id="newsletter">
	<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 w-full md:w-fit lg:px-6 rounded-lg border border-gray-200">
		<div class="mx-auto max-w-screen-md sm:text-center">
			<h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Sign up for our newsletter</h2>
			<p class="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
			<form action="?/newsLetter" on:submit|preventDefault={subscribeToNewsletter}>
				<div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
					<div class="relative w-full">
						<label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
						<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<i class="bi bi-envelope-fill"></i>
						</div>
						<input class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" name="email" required="" bind:value={newsLetterEmail}>
					</div>
					<div>
						<button type="submit" class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-600 hover:bg-primary-700 border-primary-600 hover:border-primary-700 sm:rounded-none sm:rounded-r-lg">Subscribe</button>
					</div>
				</div>
				<div class="mx-auto max-w-screen-sm">
					{#if successfullyRegisteredToNewsletter}
						<Alert border color="{successfullyRegisteredToNewsletter?.ok == false ? "red" : successfullyRegisteredToNewsletter?.ok == true ? "green" : ""}">
							<i class="bi bi-info-circle-fill"></i> {successfullyRegisteredToNewsletter?.ok == false ? "An error occurred" : successfullyRegisteredToNewsletter?.ok == true ? "Thank you for registering." : ""}
						</Alert>
					{/if}
				</div>
				<div class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <Link href="/privacy-policy">Read our Privacy Policy</Link></div>
			</form>
		</div>
	</div>
</section>