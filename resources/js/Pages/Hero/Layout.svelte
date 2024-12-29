<script>
    import Footer from "../Footer.svelte";
    /** @import {Snippet} from "svelte" */

    /** @type {{children: Snippet}} */
    let { children } = $props();
</script>

<div class="font-sans min-h-screen">
    <div class="flex-grow bg-neutral-900 text-white w-full h-full  relative">
        {@render children?.()}
    </div>

    <Footer />
</div>
