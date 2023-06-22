import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex'; // 👈 import mdsvex 
import mdsvexConfig from './mdsvex.config.js'; 


/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
    preprocess: [
        preprocess({ postcss: true }),
		mdsvex(mdsvexConfig),
    ],
	kit: {
		adapter: adapter()
	},
	vitePlugin: {
		experimental: {
		  	inspector: true,
		},
	},	
};

export default config;