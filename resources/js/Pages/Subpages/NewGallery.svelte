<script>
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import { Link } from "@inertiajs/svelte";
    import { LoaderCircleIcon, LoaderIcon } from "lucide-svelte";
    import { fade } from "svelte/transition";

    /**
     *   @typedef {Object} Props
     *   @property {any[]} videos
     *   @property {any[]} by_collection
     */

    /** @type {Props} */
    let { videos, by_collection } = $props();
    let hovered_uuid = $state("");

    // Sort with collection that are null first
    by_collection = by_collection.sort((a, b) => {
        return a.collection === b.collection || (a.collection && b.collection)
            ? 0
            : a.collection && !b.collection
              ? 1
              : -1;
    });
</script>

<main class="scroll-smooth">
    <div
        class="w-full bg-neutral-900 my-4 border-y border-neutral-800 px-4 md:px-8 lg:px-12 md:pt-12 md:pb-16 pt-6 pb-8"
    >
        <div class="max-w-[550px] md:max-w-screen-lg mx-auto">
            <h1 class="text-3xl md:text-4xl font-bold mb-5">Galerija radova</h1>
            <div class="flex flex-col gap-y-4">
                {#each by_collection as collection}
                    <section>
                        <h2 class="mb-1 text-neutral-100">
                            {collection.collection ?? "Zasebni radovi"}
                        </h2>
                        <div
                            class="flex flex-wrap gap-x-10 gap-y-1 text-sm md:text-base"
                        >
                            {#each collection.videos as video}
                                <a
                                    href="#{video.uuid}"
                                    class="text-neutral-500 whitespace-nowrap hover:text-white transition-colors"
                                    >{video.title}
                                </a>
                            {/each}
                        </div>
                    </section>
                {/each}
            </div>
        </div>
    </div>

    {#each videos as video, i}
        <!-- content here -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="relative w-full border-y border-neutral-800 my-4"
            onclick={(e) => {
                e.preventDefault();
                hovered_uuid = "";
            }}
            id={video.uuid}
        >
            <div class="absolute w-full h-full overflow-clip brightness-[25%]">
                <img
                    src={video.thumbnail_url}
                    class="w-full h-full object-cover scale-110 blur-lg"
                    alt=""
                />
            </div>
            <div class="relative md:px-8 lg:px-12 px-4 pt-12 pb-14">
                <section
                    class="max-w-[550px] md:max-w-screen-lg mx-auto relative"
                >
                    {#if video.collection}
                        <span
                            class="text-neutral-500 text-sm sm:text-base lg:text-xl"
                            >{video.collection}</span
                        >
                    {/if}
                    <h2
                        class="text-xl sm:text-3xl lg:text-4xl font-bold drop-shadow-md lg:mb-1 lg:mt-1"
                    >
                        {video.subject} - {video.title} ({new Date(
                            video.publication_date,
                        ).getUTCFullYear()})
                    </h2>
                    <p
                        class=" text-sm sm:text-base lg:text-xl text-neutral-500 drop-shadow-md mb-6 lg:mb-6"
                    >
                        {video.category}
                    </p>

                    <div
                        class="flex flex-col md:flex-row gap-x-4 gap-y-6 md:mb-2"
                    >
                        <!-- svelte-ignore a11y_mouse_events_have_key_events -->
                        <a
                            href={video.link}
                            target="_blank"
                            class="block w-full h-full drop-shadow-md {hovered_uuid ===
                            video.uuid
                                ? 'scale-[103%]'
                                : ''} transition-all duration-500"
                            onclick={(e) => {
                                e.stopPropagation();
                                if (hovered_uuid === video.uuid) {
                                    return;
                                }
                                e.preventDefault();
                                hovered_uuid = video.uuid;
                            }}
                            onpointerleave={(e) => {
                                if (e.pointerType == "touch") return;
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                hovered_uuid = "";
                            }}
                            onpointerenter={(e) => {
                                if (
                                    hovered_uuid === video.uuid ||
                                    e.pointerType == "touch"
                                ) {
                                    return;
                                }
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                hovered_uuid = video.uuid;
                            }}
                        >
                            <AspectRatio
                                ratio={16 / 9}
                                class="w-full h-full group"
                            >
                                <div
                                    class="md:hidden text-xs tracking-tighter min-[400px]:text-sm text-right absolute top-0 right-[1px]
                                        px-2 py-[2px] bg-black/20 text-neutral-500 border-x border-t border-neutral-700 rounded-t-md
                                            {hovered_uuid === video.uuid &&
                                    video.preview_url
                                        ? '-translate-y-full duration-500 delay-1100'
                                        : 'duration-200'}
                                        transition-transform
                                            "
                                >
                                    Pregled - pritisnite opet da pogledate
                                </div>
                                <div
                                    class="w-full h-full border border-neutral-800 rounded-md overflow-clip relative
                                        {hovered_uuid === video.uuid &&
                                    video.preview_url
                                        ? 'rounded-tr-none delay-1100 duration-500'
                                        : 'duration-200'} md:rounded-tr-md transition-all"
                                >
                                    <div
                                        class="w-full h-full relative bg-black"
                                    >
                                        {#if hovered_uuid === video.uuid && video.preview_url}
                                            <div
                                                in:fade={{ delay: 1000 }}
                                                class="w-full h-full hidden group-hover:flex justify-center items-center absolute"
                                            >
                                                <LoaderCircleIcon
                                                    class="size-8 animate-spin"
                                                />
                                            </div>
                                            <video
                                                muted
                                                autoplay
                                                loop
                                                transition:fade
                                                class="w-full h-full object-cover absolute"
                                            >
                                                <source
                                                    src={video.preview_url}
                                                />
                                            </video>
                                        {:else}
                                            <img
                                                src={video.thumbnail_url}
                                                transition:fade
                                                alt=""
                                                class="absolute w-full h-full object-cover"
                                            />
                                        {/if}
                                    </div>
                                </div>
                            </AspectRatio>
                        </a>
                        <div
                            class="basis-1/3 flex flex-col items-end md:items-start gap-y-2"
                        >
                            <div
                                class="flex flex-wrap justify-end md:justify-start gap-1 w-full"
                            >
                                {#each video.roles as role}
                                    <div
                                        class="inline-block
                                    w-fit
                                    whitespace-nowrap
                                text-neutral-500
                                drop-shadow-md
                                            text-sm lg:text-base
                                bg-black/20 px-1 py-[2px] lg:px-2
                                rounded-md border border-neutral-700
                                "
                                    >
                                        {role}
                                    </div>
                                {/each}
                            </div>
                            <Link
                                href="/gallery/{video.uuid}"
                                class="underline w-fit text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                                >Saznaj više</Link
                            >
                        </div>
                    </div>
                </section>
            </div>
        </div>
    {/each}
</main>
