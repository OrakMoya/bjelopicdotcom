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
     * @property {any} video
     */

    /** @type {Props & { [key: string]: any }} */
    let {
        video,
        alt = "",
        year = "",
        selected = false,
        showTitle = false,
        ...rest
    } = $props();
    let duration = video.preview_url ? 100 : 0;
</script>

<div
    class="{selected
        ? 'scale-[104%] md:scale-[102%]'
        : ''} transition-all duration-300 w-full h-full rounded-md overflow-clip"
>
    <AspectRatio ratio={16 / 9}>
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
        class="px-2 py-1 text-sm sm:text-base md:text-sm lg:text-base italic text-neutral-500 text-left bg-neutral-900 border border-t-0 border-accent rounded-b-md flex justify-between items-center w-full gap-2"
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
