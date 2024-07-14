<script>
    import GalleryVideo from "$lib/components/ui/GalleryVideo.svelte";
    import TheBjeloPic from "$lib/components/ui/TheBjeloPIC.svelte";
    import { AspectRatio } from "bits-ui";
    import { onMount } from "svelte";

    export let videos;
    export let by_collection;
    export let focus = "";
    let hovered = false;

    let selected_video_uuid = focus;

    Promise.all(
        Array.from(document.images)
            .filter((img) => !img.complete)
            .map(
                (img) =>
                    new Promise((resolve) => {
                        img.onload = img.onerror = resolve;
                    }),
            ),
    ).then(() => {
        if (focus) {
            const yOffset = -30;

            const el = document.getElementById(focus);
            if (el) {
                const y = el.getBoundingClientRect().top + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }
    });
</script>

<svelte:head>
    <title>Gallery - BjeloPIC</title>
</svelte:head>

{#each by_collection as collection, i}
    <section
        class=" mx-auto {i % 2
            ? 'bg-bjelopic-neutral-8'
            : 'bg-bjelopic-neutral-7'} py-4 px-4 relative"
        on:click={() => (selected_video_uuid = "")}
        role="none"
    >
        <div class="max-w-screen-lg mx-auto px-4">
            {#if collection.videos.length > 1}
                <div
                    class="flex w-full md:w-2/3 justify-center mb-4 items-center gap-x-4 mx-auto transition-all duration-500"
                >
                    <div
                        class="h-[1px] relative top-[2px] bg-white w-full"
                    ></div>
                    <div class="whitespace-nowrap font-bold text-2xl md:text-4xl">
                        {collection.collection}
                        <span class="text-bjelopic-blue-1"
                            >({new Date(
                                collection.videos[0].publication_date,
                            ).getUTCFullYear()})</span
                        >
                    </div>
                    <div
                        class="h-[1px] relative top-[2px] bg-white w-full"
                    ></div>
                </div>
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4"
                    on:mouseenter={() => {
                        if (!hovered) selected_video_uuid = "";
                    }}
                    role="none"
                >
                    {#each collection.videos as video}
                        <div class="drop-shadow" id={video.uuid}>
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <button
                                class="w-full block"
                                on:click={(e) => {
                                    if (selected_video_uuid === video.uuid) {
                                        return;
                                    }
                                    e.stopPropagation();
                                    e.preventDefault();

                                    selected_video_uuid = video.uuid;
                                }}
                                on:mouseenter={() => {
                                    hovered = true;
                                    selected_video_uuid = video.uuid;
                                }}
                                on:mouseleave={(e) => {
                                    hovered = false;
                                    if (e.buttons) {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        return;
                                    }
                                    selected_video_uuid = "";
                                }}
                            >
                                <AspectRatio.Root ratio={16 / 9}>
                                    <GalleryVideo
                                        title={video.title}
                                        class="rounded-md md:rounded-sm md:hover:rounded-none transition-all overflow-clip"
                                        href={video.link}
                                        this_id={video.uuid}
                                        selected_id={selected_video_uuid}
                                        thumbnail_src={video.thumbnail_path}
                                        preview_src={video.preview_path}
                                        poster_src={video.poster_path}
                                    />
                                </AspectRatio.Root>
                            </button>
                        </div>
                    {/each}
                </div>
            {:else}
                {#each collection.videos as video}
                    <div
                        role="none"
                        id={video.uuid}
                        class="w-full flex-col-reverse text-center flex gap-x-4 {i %
                        2
                            ? 'md:flex-row-reverse md:text-right'
                            : 'md:flex-row md:text-left'}"
                    >
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <button
                            class="w-full basis-3/5 block"
                            on:click={(e) => {
                                if (selected_video_uuid === video.uuid) {
                                    return;
                                }
                                e.stopPropagation();
                                e.preventDefault();

                                selected_video_uuid = video.uuid;
                            }}
                            on:mouseenter={() => {
                                selected_video_uuid = video.uuid;
                                hovered = true;
                            }}
                            on:mouseleave={(e) => {
                                hovered = false;
                                if (e.buttons) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    return;
                                }
                                selected_video_uuid = "";
                            }}
                        >
                            <AspectRatio.Root ratio={16 / 9}>
                                <GalleryVideo
                                    class="rounded-md md:rounded-sm md:hover:rounded-none transition-all overflow-clip"
                                    href={video.link}
                                    this_id={video.uuid}
                                    selected_id={selected_video_uuid}
                                    thumbnail_src={video.thumbnail_path}
                                    preview_src={video.preview_path}
                                    poster_src={video.poster_path}
                                />
                            </AspectRatio.Root>
                        </button>
                        <div
                            class="w-full basis-2/5 flex flex-col justify-center md:justify-start"
                        >
                            <span
                                class="text-bjelopic-blue-1 font-semibold text-2xl md:text-4xl"
                            >
                                {#if video.subject === "BjeloPIC"}
                                    <TheBjeloPic />
                                {:else}
                                    {video.subject}
                                {/if} -
                                <span class="text-white">
                                    {video.title}
                                </span>({new Date(
                                    video.publication_date,
                                ).getUTCFullYear()})
                            </span>
                            {#if video.category}
                                <span class="md:text-lg mb-2">{video.category}</span>
                            {/if}
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </section>
{/each}
