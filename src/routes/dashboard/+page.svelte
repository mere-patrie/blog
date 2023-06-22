<script>
    import { Modal, Input, Fileupload, Label, Helper, MultiSelect, Textarea } from 'flowbite-svelte'
    import { Button, Link } from "$lib/components/mines"
    import languages from "$lib/languages"
    import ranks from "$lib/ranks"

    export let data;

    const auth = data.auth;
    const isAdmin = auth.admin || false;
    let logOutModal = false;
    let newPostModal = false;
    let postFile, postName, postBannerUrl, postDescription, postAvailableBy, postLanguages

    function newPost(e){
        let data = { postFile, postName, postBannerUrl, postDescription, postAvailableBy:postAvailableBy.map(el => el.value), postLanguages:postLanguages.map(el => el.value) };
        fetch("/api/newPost", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }
    function handleFileUpload(e) {
        const file = (e.target)?.files?.[0];
        if (!file) return;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {postFile = reader.result};
    }
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="max-w-xl w-full mx-auto p-4">
    <h2>Welcome {auth.username}</h2>
    <hr>
    {#if isAdmin}
        <h4>Admin functions</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button on:click={() => newPostModal = true} class="card-button"><i class="bi bi-plus-circle"></i><span>New post<p>Create a new post</p></span></button>
        </div>
        <hr />
        <h4>User functions</h4>
    {/if}
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
            <Button colorType="gray" class="w-full" >No, cancel</Button>
            <Button href="/log-out" class="w-full" on:click={() => logOutModal = false}>Yes, I'm sure</Button>
        </div>
    </div>
</Modal>


{#if isAdmin}
    <Modal bind:open={newPostModal} size="xs">
        <h4>New post</h4>
        <hr>
        <form class="flex flex-col gap-4" enctype="multipart/form-data" on:submit|preventDefault={newPost}>
            <div>
                <Label for="postName" class="mb-2">Post name</Label>
                <Input id="postName" name="postName" type="text" placeholder="The post name" bind:value={postName} />
            </div>
            <Textarea id="postDescription" placeholder="The description" rows="4" name="postDescription" bind:value={postDescription}/>
            <div>
                <Label for="postLanguages" class="mb-2">Languages used</Label>
                <MultiSelect items={languages.map(lang => {return {value:lang.name,name:lang.name} }) } name="postLanguages" id="postLanguages" highlighted bind:value={postLanguages} />
            </div>
            <div>
                <Label for="postBannerUrl" class="mb-2">Banner url</Label>
                <Input id="postBannerUrl" name="postBannerUrl" type="text" placeholder="The post banner url" bind:value={postBannerUrl} />
            </div>
            <div>
                <Fileupload id="postFile" name="postFile" accept=".md" on:change={handleFileUpload} />
                <Helper class="mb-2">.md file only</Helper>
            </div>
            <div>
                <Label for="postLanguages" class="mb-2">Post readable by</Label>
                <MultiSelect items={ [ {value:"everyone", name:"everyone"}, ...ranks.map(rank => {return {value:rank.name,name:rank.name} }) ] } name="postAvailableBy" id="postAvailableBy" highlighted bind:value={postAvailableBy} />
            </div>
            <Button type="submit">Create</Button>
        </form>
    </Modal>
{/if}