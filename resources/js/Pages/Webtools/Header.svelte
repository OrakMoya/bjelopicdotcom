<script>
    import { Link } from "@inertiajs/svelte";
    import { fly } from "svelte/transition";
    let screensize_md = 768;
    let innerWidth = 0;
    let scrollY = 0;
    let previous_scrollY = 1;
    let header_shown = true;
    export let clientHeight = 0;
    export let dontHide = false;

    /**
     * @param {number} scrollY
     */
    function setHeaderVisibility(scrollY) {
        header_shown = innerWidth > screensize_md || scrollY < previous_scrollY;
        previous_scrollY = scrollY;
    }

    $: setHeaderVisibility(scrollY);
</script>

<svelte:window bind:innerWidth bind:scrollY />

{#if header_shown || dontHide}
    <header bind:clientHeight
        class="{dontHide ? 'bg-black' : 'bg-black/75'} md:bg-black w-full p-4 border-t md:border-t-0 md:border-b border-neutral-800 fixed bottom-0 md:relative {$$restProps.class}"
        style="{header_shown && !dontHide ? 'backdrop-filter: blur(20px)' : ''}"
        transition:fly={{ y: 90, opacity: 100 }}
    >
        <div class="flex w-full justify-between">
            <Link
                href="/webtools"
                class="max-w-screen-lg gap-y-2 md:gap-x-2 flex items-center justify-start gap-x-4"
            >
                <div class="h-12 md:h-20 flex gap-x-4 items-center">
                    <img
                        class="h-full object-contain"
                        src={innerWidth < screensize_md
                            ? "/bjelopic_logo.png"
                            : "/bjelopic_banner.png"}
                        alt="BjeloPIC"
                    />
                </div>
                <span
                    class="text-white text-2xl md:text-[36px] relative bottom-[2px] italic"
                    >Webtools</span
                >
            </Link>
            <slot />
        </div>
    </header>
{/if}
