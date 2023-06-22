<script>
    import { onMount } from "svelte"
    import { Tooltip } from 'flowbite-svelte'
    import { formatDate } from '$lib/utils';
    import languages from "$lib/languages"
    
    export let data;
    const post = data.post;
    const languagesRef = languages;
    const theme = "light";
</script>

<!-- SEO -->
<svelte:head>
	<title>{post.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
</svelte:head>

<div class="max-w-5xl mx-auto w-full rounded-lg my-5 bg-white border border-gray-200 overflow-hidden">
    <img src="{post.banner}" alt="Post banner">
    <h1 class="m-5">{post.title}</h1>
    {#if post }
        <div class="flex flex-row gap-2 ml-5 items-center mb-5">
            <img src="{post.profilePicture || "/defaultProfilePicture.png"}" class="h-16 w-16 rounded-full" alt="{post.username}'s profile picture">
            <div class="flex flex-col justify-center items-start">
                <h6 class="text-lg font-bold">{post?.username || "No username"}</h6>
                <small>Posted {formatDate(post.date)}</small>
            </div>
        </div>
    {/if}

    <h5 class="mx-5 mt-10">Tech stack used :</h5>
    <div class="grid gap-2 p-5 pt-1" style="grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));">
        {#each post.languages as language}
            <a href="/search/{language}"><img src="/icons/{languagesRef.filter(lang => lang.name == language)[0].icons[theme]}" class="rounded-md" alt="{language}"></a>
            <Tooltip>{language}</Tooltip>
        {/each}
    </div>
    <article class="px-2 pb-2">
        <svelte:component this={data.component} />
    </article>
</div>
