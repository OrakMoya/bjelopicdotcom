<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import TheBjeloPic from "$lib/components/ui/TheBjeloPIC.svelte";
    import { ChevronDown } from "lucide-svelte";
    import { fade } from "svelte/transition";
    import TheSubtitle from "$lib/components/ui/TheSubtitle.svelte";
    import HeroCarousel from "./HeroCarousel.svelte";
    import HeroLinks from "./HeroLinks.svelte";
    /** @import {HeroGalleryVideoProps} from "$lib/types" */

    /**
     * @typedef {object} Props
     * @prop {HeroGalleryVideoProps[]} videos
     */

    /** @type {Props} */
    let { videos, heroUrl } = $props();

    let innerWidth = $state(0);
    /**
     * @type {number}
     */
    let innerHeight = $state(0);
    let scrollY = $state(0);
    let window_scrolled = $state(false);
    let arrows_shown = $state(false);

    $effect(() => {
        if (scrollY && !window_scrolled) {
            window_scrolled = true;
        }
    });

    setTimeout(() => (arrows_shown = true), 4000);
</script>

<svelte:head>
    <title>BjeloPIC</title>
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY />

<main class="max-w-screen-xl h-screen mx-auto">
    <div
        class="absolute top-0 left-0 overflow-clip w-screen h-full flex justify-center items-center"
    >
        <div class="brightness-50 w-full h-full object-cover">
            <video class="w-full h-full object-cover" autoplay loop muted>
                <source src={heroUrl} type="video/webm" />
            </video>
        </div>
    </div>
    {#if arrows_shown && !window_scrolled}
        <div
            class="absolute left-0 bottom-0 mx-8 my-6 hidden md:block"
            transition:fade={{ duration: 500 }}
        >
            <ChevronDown class="drop-shadow w-8 h-8 animate-bounce " />
        </div>
        <div
            class="absolute right-0 bottom-0 mx-8 my-6 hidden md:block"
            transition:fade={{ duration: 500 }}
        >
            <ChevronDown class="drop-shadow w-8 h-8 animate-bounce" />
        </div>
        <div
            class="absolute left-0 bottom-0 right-0 w-8 mx-auto mb-6"
            transition:fade={{ duration: 500 }}
        >
            <ChevronDown
                class="drop-shadow w-8 h-8 animate-bounce  md:hidden"
            />
        </div>
    {/if}
    <section
        class="w-full h-full flex flex-col justify-center items-center relative gap-y-8"
    >
        <div class="basis-1/3 flex place-items-end">
            <div class="flex flex-col items-center">
                <TheBjeloPic
                    class="drop-shadow-lg text-7xl sm:text-8xl md:text-9xl transition-all duration-500 mb-6 sm:mb-8 text-center relative md:right-1 right-[2px]"
                />
                <div
                    class="flex justify-evenly items-center transition-all duration-500 align-middle w-full gap-x-2 md:px-3"
                >
                    <div class="border-b border-white w-full h-min"></div>
                    <TheSubtitle
                        class="font-semibold  uppercase text-xs transition-all duration-500 md:text-sm w-fit whitespace-nowrap tracking-tighter"
                    />
                    <div class="border-b border-white w-full h-min"></div>
                </div>
            </div>
        </div>

        <HeroLinks />

        <HeroCarousel {videos} />
    </section>
</main>
