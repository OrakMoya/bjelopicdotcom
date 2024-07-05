import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import {svelte} from '@sveltejs/vite-plugin-svelte';
import {sveltePreprocess} from 'svelte-preprocess';
import path from "path";

export default defineConfig({
    resolve:{
        alias:{
            $lib: path.resolve("./resources/js"),
        }
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        svelte({preprocess: sveltePreprocess()}),
    ],
});
