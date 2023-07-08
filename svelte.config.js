import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js'; 
import adapter from '@sveltejs/adapter-vercel';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [
        preprocess(),
		mdsvex(mdsvexConfig),
    ],
	kit: {
		adapter: adapter({})
	},
	vitePlugin: {
		inspector: true,
	},	
};

export default config;