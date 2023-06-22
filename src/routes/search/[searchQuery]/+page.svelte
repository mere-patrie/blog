<script>
    import {  Heading, P } from 'flowbite-svelte'
    import { formatDate } from '$lib/utils';
	import languages from "$lib/languages"

    export let data;

    const results = data.results;
    const query = data.query;

    const theme = "light";
</script>

<svelte:head>
	<title>{query}</title>
</svelte:head>

<div class="p-4">
    {#if results}
        <Heading tag="h2">Results for {query}</Heading>
        <div class="grid justify-items-center max-w-[1550px] mx-auto gap-4 mt-4" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
            {#each results as post}
                <a href={`/blog/${post.fileName}`} class="p-0 border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:scale-[102%] transition-all duration-300">
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
                                <img src="/icons/{languages.filter(lang => lang.name == language)[0].icons[theme]}" class="rounded-md" alt="{language}">
                            {/each}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <Heading tag="h2">No results for "{query}"</Heading>
    {/if}
</div>