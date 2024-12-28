<script>
    import Footer from "../Footer.svelte";
    /** @import {Snippet} from "svelte" */

    /** @type {{children: Snippet}} */
    let { children } = $props();
</script>

<div class="flex flex-col h-screen font-sans">
    <div class="flex-grow bg-neutral-900 text-white relative">
        {@render children?.()}
    </div>

    <Footer />
</div>
