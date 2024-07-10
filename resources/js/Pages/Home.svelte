<script>
    import { AspectRatio } from "bits-ui";
    import * as Carousel from "$lib/components/ui/carousel";
    import TheBjeloPic from "$lib/components/ui/TheBjeloPIC.svelte";
    import AutoScroll from "embla-carousel-auto-scroll";
    import FilmReel from "$lib/components/ui/FilmReel.svelte";

    const autoscroll = AutoScroll({
        speed: 0.3,
        startDelay: 0,
        stopOnMouseEnter: true,
    });

    export let videos;
    let timeout_id;
    let hovered = false;
</script>

<main class="max-w-screen-xl h-screen mx-auto">
    <div
        class="absolute top-0 left-0 overflow-clip w-screen h-full flex justify-center items-center"
    >
        <div class="brightness-50 w-full h-full object-cover">
            <video class="w-full h-full object-cover" autoplay loop muted>
                <source src="/hero.mp4" type="video/mp4" />
            </video>
        </div>
    </div>
    <section
        class="w-full h-full flex flex-col justify-center items-center relative gap-y-10"
    >
        <div class="basis-1/3 flex place-items-end">
            <TheBjeloPic
                class="drop-shadow-lg text-7xl sm:text-8xl md:text-9xl transition-all duration-500"
            />
        </div>
        <div
            class="flex w-screen basis-1/3 overflow-x-clip overflow-y-visible drop-shadow-glow {hovered
                ? 'md:drop-shadow-none'
                : ''} transition duration-300"
        >
            <Carousel.Root
                on:mouseleave={() =>
                    (timeout_id = setTimeout(() => autoscroll.play(), 2000))}
                on:mouseenter={() => clearTimeout(timeout_id)}
                plugins={[autoscroll]}
                opts={{
                    loop: true,
                    skipSnaps: true,
                    dragFree: true,
                }}
                class="w-auto max-w-full mx-auto overflow-visible"
            >
                <Carousel.Content class="overflow-visible">
                    {#each videos as video}
                        <Carousel.Item
                            class="basis-auto z-0 relative md:hover:z-10 overflow-visible p-0"
                        >
                            <FilmReel />
                            <div class="overflow-visible">
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    on:mouseenter={() => (hovered = true)}
                                    on:mouseleave={() => (hovered = false)}
                                    class="p-1 w-72 bg-black overflow-visible"
                                >
                                    <div
                                        class="w-full h-full relative transition md:hover:drop-shadow-glow md:hover:scale-105 {hovered
                                            ? 'md:brightness-50'
                                            : ''} md:hover:brightness-100 overflow-visible
                                        "
                                    >
                                        <AspectRatio.Root ratio={16 / 9}>
                                            <img
                                                src={video.thumbnail_path}
                                                class="w-full h-full rounded-md overflow-clip relative z-50 md:hover:drop-shadow-lg transition duration-300"
                                                alt="{video.title} thumbnail"
                                            />
                                        </AspectRatio.Root>
                                    </div>
                                </div>
                                <FilmReel />
                            </div>
                        </Carousel.Item>
                    {/each}
                </Carousel.Content>
            </Carousel.Root>
        </div>
    </section>
</main>
