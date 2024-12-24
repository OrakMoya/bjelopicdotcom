import { createInertiaApp } from '@inertiajs/svelte';
import './bootstrap';

import Layout from "./Pages/Layout.svelte";
import { hydrate, mount } from 'svelte'

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
        let page = pages[`./Pages/${name}.svelte`]
        return { default: page.default, layout: page.layout || Layout }
    },
    setup({ el, App, props }) {
        if (el.dataset.serverRendered === 'true') {
            hydrate(App, { target: el, props, hydrate: true });
        } else {
            mount(App, { target: el, props, hydrate: true })
        }
    },
})
