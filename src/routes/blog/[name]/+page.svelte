<script>
    import {  Heading, Tooltip, P  } from 'flowbite-svelte'
    import { formatDate } from '$lib/utils';
    import languages from "$lib/languages"
    import MarkdownIt from 'markdown-it'; 
    import hljs from './hjs.js';
    var mdParser = new MarkdownIt({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, { language: lang }).value;
                } catch (__) {}
            }
            return ''; // use external default escaping
        }
    })

    function escapeHtml(str) {
        if (/[&<>"]/.test(str)) {
            return str.replace(/[&<>"]/, replaceUnsafeChar);
        }
        return str;
    }

    function unescapeAll(str) {
        if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

        return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
            if (escaped) { return escaped; }
            return replaceEntityPattern(match, entity);
        });
    }

    mdParser.renderer.rules.fence = function (tokens, idx, options, env, slf) {
        var token = tokens[idx], 
        info = token.info ? unescapeAll(token.info).trim() : '', 
        langName = '', 
        langAttrs = '', 
        highlighted, 
        i, 
        arr, 
        tmpAttrs, 
        tmpToken;

        if (info) {
            arr = info.split(/(\s+)/g);
            langName = arr[0];
            langAttrs = arr.slice(2).join('');
        }

        if (options.highlight) {
            highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
        } else {
            highlighted = escapeHtml(token.content);
        }

        if (highlighted.indexOf('<pre') === 0) {
            return highlighted + '\n';
        }

        // If language exists, inject class gently, without modifying original token.
        // May be, one day we will add .deepClone() for token and simplify this part, but
        // now we prefer to keep things local.
        if (info) {
            i = token.attrIndex('class');
            tmpAttrs = token.attrs ? token.attrs.slice() : [];

            if (i < 0) {
                tmpAttrs.push([ 'class', options.langPrefix + langName ]);
            } else {
                tmpAttrs[i] = tmpAttrs[i].slice();
                tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
            }

            // Fake token just to render attributes
            tmpToken = {
                attrs: tmpAttrs
            };

            return  '<pre class="hljs"><code' + slf.renderAttrs(tmpToken) + '>' + highlighted + '</code></pre>\n';
        }


        return  '<pre class="hljs"><code' + slf.renderAttrs(token) + '>' + highlighted + '</code></pre>\n';
    };

    mdParser.renderer.rules.code_block = function (tokens, idx, options, env, slf) {
        var token = tokens[idx];

        return  '<pre class="hljs"' + slf.renderAttrs(token) + '><code>' + escapeHtml(tokens[idx].content) + '</code></pre>\n';
    };

    mdParser.renderer.rules.link_open = (tokens, idx) => {
        return '<a href="' + mdParser.utils.escapeHtml(tokens[idx].attrs.filter(el => el.includes("href"))[0][1]) + '" class="link">';
    };


    export let data;
    const post = data.post;
    const languagesRef = languages;
    const theme = "light";

    var markdownResult = mdParser.render(post.postContent);
</script>

<!-- SEO -->
<svelte:head>
	<title>{post.metadata.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.metadata.title} />
</svelte:head>

<div class="max-w-5xl mx-auto w-full rounded-lg my-5 bg-white border border-gray-200 overflow-hidden">
    <img src="{post.metadata.banner}" alt="Post banner">
    <Heading tag="h1" class="m-5">{post.metadata.title}</Heading>
    {#if post.author }
        <div class="flex flex-row gap-2 ml-5 items-center mb-5">
            <img src="{post.author.profilePicture || "/defaultProfilePicture.png"}" class="h-16 w-16 rounded-full" alt="{post.author.username}'s profile picture">
            <div class="flex flex-col justify-center items-start">
                <P class="text-lg font-bold">{post.author?.username || "No username"}</P>
                <small>Posted {formatDate(post.metadata.date)}</small>
            </div>
        </div>
    {/if}

    <Heading tag="h5" class="mx-5 mt-10">Tech stack used :</Heading>
    <div class="grid gap-2 p-5 pt-0" style="grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));">
        {#each post.metadata.languages as language}
            <a href="/search/{language}"><img src="/icons/{languagesRef.filter(lang => lang.name == language)[0].icons[theme]}" class="rounded-md" alt="{language}"></a>
            <Tooltip>{language}</Tooltip>
        {/each}
    </div>

    <article class="px-2 pb-2">
        {@html markdownResult}
    </article>
</div>