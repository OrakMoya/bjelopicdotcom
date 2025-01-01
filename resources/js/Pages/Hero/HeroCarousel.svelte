<script>
    import * as Carousel from "$lib/components/ui/carousel";
    import * as AspectRatio from "$lib/components/ui/aspect-ratio";
    import FilmReel from "$lib/components/ui/FilmReel.svelte";
    import AutoScroll from "embla-carousel-auto-scroll";
    import { onMount } from "svelte";
    import { Link } from "@inertiajs/svelte";
    /** @import {CarouselAPI} from "$lib/components/ui/carousel/context" */
    /** @import {HeroGalleryVideoProps} from "$lib/types" */

    /**
     * @typedef {object} Props
     * @prop {HeroGalleryVideoProps[]} videos
     */

    /** @type {Props & {[key:string]:any}} */
    let { videos, ...rest } = $props();

    const autoscroll = AutoScroll({
        speed: 0.3,
        startDelay: 0,
        stopOnMouseEnter: true,
    });
    const carousel_opts = {
        loop: true,
        dragFree: true,
    };

    /**
     * @type {CarouselAPI | undefined}
     */
    let carousel_api = $state();
    let autoplay_resume_timeout_id = $state(0);
    let autoscroll_resume_delay = 3000;
    let carousel_hovered = $state(false);

    onMount(() => {
        if (carousel_api) {
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
    });
</script>

<div
    class="flex w-screen basis-1/3 overflow-x-clip overflow-y-visible drop-shadow-glow-xs {carousel_hovered
        ? 'md:drop-shadow-none'
        : ''} transition duration-300 {rest.class}"
>
    <Carousel.Root
        setApi={(emblaApi) => (carousel_api = emblaApi)}
        onmouseleave={() =>
            (autoplay_resume_timeout_id = setTimeout(
                () => autoscroll.play(),
                autoscroll_resume_delay,
            ))}
        onmouseenter={() => clearTimeout(autoplay_resume_timeout_id)}
        plugins={[autoscroll]}
        opts={carousel_opts}
        class="w-auto max-w-full mx-auto overflow-visible"
    >
        <Carousel.Content class="overflow-visible">
            {#each videos as video}
                <Carousel.Item
                    class=" basis-auto z-0 relative md:hover:z-10 overflow-visible p-0 outline-x outline-black outline-1"
                >
                    <FilmReel />
                    <div class="overflow-visible">
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            onmouseenter={() => (carousel_hovered = true)}
                            onmouseleave={() => (carousel_hovered = false)}
                            class="p-1 w-60 md:w-[288px] bg-black overflow-visible"
                        >
                            <div
                                class="w-full h-full relative transition md:hover:z-10 md:hover:drop-shadow-glow-md md:hover:scale-105 {carousel_hovered
                                    ? 'md:brightness-[25%]'
                                    : ''} md:hover:brightness-100 overflow-visible
                                        "
                            >
                                <AspectRatio.Root ratio={16 / 9}>
                                    <Link
                                        href="/gallery#{video.uuid}"
                                        target="_blank"
                                    >
                                        <img
                                            src={video.thumbnail_url}
                                            class="w-full h-full rounded-md overflow-clip relative md:hover:drop-shadow-lg transition duration-300 object-cover"
                                            alt="{video.title} thumbnail"
                                        />
                                    </Link>
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
