<script>
    import { Link } from "@inertiajs/svelte";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import { fade } from "svelte/transition";
    import Checkmark from "./Checkmark.svelte";

    /**
     * @typedef {Object} Props
     * @property {string} [alt]
     * @property {boolean} selected
     * @property {boolean} [showTitle]
     * @property {boolean} [hideBottomBar]
     * @property {any} video
     */

    /** @type {Props & { [key: string]: any }} */
    let {
        video,
        alt = "",
        year = "",
        hideBottomBar = false,
        selected = false,
        showTitle = false,
        ...rest
    } = $props();
    let duration = video.preview_url ? 100 : 0;
</script>

<div
    class="{selected
        ? 'scale-[104%] md:scale-[102%]'
        : ''} transition-all duration-300 w-full h-full rounded-md overflow-clip
        bg-neutral-800 border border-neutral-700 box-border
    "
>
    <!-- alt -->
    <AspectRatio
        ratio={16 / 9}
        class="rounded-b-md overflow-clip drop-shadow-md w-full"
    >
        <div
            class="w-full h-full overflow-hidden relative bg-black {rest.class}"
        >
            {#if selected && video.preview_url}
                <div
                    transition:fade
                    class="absolute flex items-center align-middle w-full h-full top-0"
                >
                    <a
                        aria-label="View video"
                        href={video.link}
                        target="_blank"
                        class="block w-full h-full object-cover"
                    >
                        <video
                            muted
                            autoplay
                            loop
                            transition:fade
                            class="w-full h-full object-cover"
                        >
                            <source src={video.preview_url} />
                        </video>
                    </a>
                </div>
            {:else}
                <div transition:fade class="absolute w-full h-full">
                    {#if selected}
                        <a
                            aria-label="View video"
                            href={video.link}
                            target="_blank"
                            class="block w-full h-full object-cover"
                        >
                            <img
                                src={video.thumbnail_url}
                                {alt}
                                class="object-cover w-full h-full"
                            />
                        </a>
                    {:else}
                        <img
                            src={video.thumbnail_url}
                            {alt}
                            class="absolute w-full h-full object-cover"
                            transition:fade={{ duration }}
                        />
                    {/if}
                </div>
            {/if}
        </div>
    </AspectRatio>
    <Link
        class="px-2 py-1 text-sm sm:text-base md:text-sm lg:text-base italic text-neutral-500 text-left  flex justify-between items-center w-full gap-2 {hideBottomBar ? 'hidden' : ''}"
        href={"/gallery/" + video.uuid}
    >
        <div class="inline-flex items-center gap-x-2 overflow-hidden">
            <span class={showTitle ? "block" : "hidden"}
                >{video.title} ({new Date(
                    video.publication_date,
                ).getUTCFullYear()})</span
            >
            {#if video.stillsAvailable}
                <Checkmark>Stillovi</Checkmark>
            {/if}
        </div>
        <span class="underline whitespace-nowrap w-fit">Pročitaj više</span>
    </Link>
</div>
