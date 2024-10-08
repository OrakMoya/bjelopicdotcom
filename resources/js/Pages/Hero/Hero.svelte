<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { Link } from "@inertiajs/svelte";
    import { AspectRatio } from "bits-ui";
    import * as Carousel from "$lib/components/ui/carousel";
    import TheBjeloPic from "$lib/components/ui/TheBjeloPIC.svelte";
    import AutoScroll from "embla-carousel-auto-scroll";
    import FilmReel from "$lib/components/ui/FilmReel.svelte";
    import { ChevronDown } from "lucide-svelte";
    import { fade } from "svelte/transition";
    import TheSubtitle from "$lib/components/ui/TheSubtitle.svelte";
    import { Button as button } from "$lib/components/ui/button";

    export let videos;

    const autoscroll = AutoScroll({
        speed: 0.3,
        startDelay: 0,
        stopOnMouseEnter: true,
    });

    /**
     * @type {number}
     */
    let autoplay_resume_timeout_id = 0;
    let carousel_hovered = false;
    /**
     * @type {any}
     */
    let carousel_api;

    let innerWidth = 0;
    /**
     * @type {number}
     */
    let innerHeight = 0;
    let scrollY = 0;
    let window_scrolled = false;
    let screensize_md = 768;
    $: if (scrollY && !window_scrolled) {
        window_scrolled = true;
    }
    let arrows_shown = false;

    setTimeout(() => (arrows_shown = true), 4000);
    let carousel_opts = {
        loop: true,
        dragFree: true,
    };
    let autoscroll_resume_delay = 3000;

    $: if (carousel_api) {
        // Stop scroll on mobile touch down
        carousel_api.on("pointerDown", () => {
            autoscroll.stop();
            clearTimeout(autoplay_resume_timeout_id);
        });

        // Resume scroll on mobile touch up
        carousel_api.on("pointerUp", () => {
            if (!carousel_hovered)
                autoplay_resume_timeout_id = setTimeout(
                    () => autoscroll.play(),
                    autoscroll_resume_delay,
                );
        });
    }
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
                <source src="/hero.webm" type="video/webm" />
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
        class="w-full h-full flex flex-col justify-center items-center relative gap-y-4"
    >
        <div class="basis-1/3 flex place-items-end">
            <div class="flex flex-col items-center">
                <TheBjeloPic
                    class="drop-shadow-lg text-7xl sm:text-8xl md:text-9xl transition-all duration-500 mb-4 sm:mb-6"
                />
                <div
                    class="flex justify-evenly items-center transition-all duration-500 align-middle w-full gap-x-2 md:px-3 "
                >
                    <div class="border-b border-white w-full h-min"></div>
                    <TheSubtitle
                        class="font-semibold  uppercase text-xs transition-all duration-500 md:text-sm w-fit whitespace-nowrap tracking-tighter"
                    />
                    <div class="bg-white w-full h-[1px]"></div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-x-4 my-1 text-sm sm:text-base ">
            <a href="mailto:info@bjelopic.com" class="px-4 py-2 rounded-xl bg-bjelopic-red-2 transition duration-300 text-white hover:bg-bjelopic-red-1 drop-shadow-md text-center"><span class="drop-shadow"> Kontaktirajte nas</span></a>
            <Link href="/gallery" class="px-4 py-2 rounded-xl bg-black/50 drop-shadow-md transition duration-300 border border-neutral-700 text-white text-center hover:bg-neutral-800/75">Naši radovi</Link>
        </div>
        <div
            class="flex w-screen basis-1/3 overflow-x-clip overflow-y-visible drop-shadow-glow-sm {carousel_hovered
                ? 'md:drop-shadow-none'
                : ''} transition duration-300"
        >
            <Carousel.Root
                on:mouseleave={() =>
                    (autoplay_resume_timeout_id = setTimeout(
                        () => autoscroll.play(),
                        autoscroll_resume_delay,
                    ))}
                on:mouseenter={() => clearTimeout(autoplay_resume_timeout_id)}
                bind:api={carousel_api}
                plugins={[autoscroll]}
                opts={carousel_opts}
                class="w-auto max-w-full mx-auto overflow-visible"
            >
                <Carousel.Content class="overflow-visible">
                    {#each videos as video}
                        <Carousel.Item
                            class=" basis-auto z-0 relative md:hover:z-10 overflow-visible p-0 outline outline-black outline-1"
                        >
                            <FilmReel
                                width={innerWidth < screensize_md ? 16 : 24}
                            />
                            <div class="overflow-visible">
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    on:mouseenter={() =>
                                        (carousel_hovered = true)}
                                    on:mouseleave={() =>
                                        (carousel_hovered = false)}
                                    class="p-1 w-48 md:w-72 bg-black overflow-visible"
                                >
                                    <div
                                        class="w-full h-full relative transition md:hover:drop-shadow-glow-md md:hover:scale-105 {carousel_hovered
                                            ? 'md:brightness-50'
                                            : ''} md:hover:brightness-100 overflow-visible
                                        "
                                    >
                                        <AspectRatio.Root ratio={16 / 9}>
                                            <Link
                                                href="/gallery?focus={video.uuid}"
                                                target="_blank"
                                            >
                                                <img
                                                    src={video.thumbnail_url}
                                                    class="w-full h-full rounded-md overflow-clip relative z-50 md:hover:drop-shadow-lg transition duration-300 object-cover"
                                                    alt="{video.title} thumbnail"
                                                />
                                            </Link>
                                        </AspectRatio.Root>
                                    </div>
                                </div>
                                <FilmReel
                                    width={innerWidth < screensize_md ? 16 : 24}
                                />
                            </div>
                        </Carousel.Item>
                    {/each}
                </Carousel.Content>
            </Carousel.Root>
        </div>
    </section>
</main>
