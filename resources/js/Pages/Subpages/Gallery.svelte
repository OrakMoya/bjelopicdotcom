<script>
    import GalleryVideo from "$lib/components/ui/GalleryVideo.svelte";
    import TheBjeloPIC from "$lib/components/ui/TheBjeloPIC.svelte";
    import { AspectRatio } from "bits-ui";
    import GalleryVideoDescription from "./GalleryVideoDescription.svelte";

    export let by_collection;
    const params = new URLSearchParams(window.location.search);
    const focus = params.get("focus");
    console.log(focus);
    let innerHeight = 0;

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
            const el = document.getElementById(focus);
            if (el) {
                el.scrollIntoView({ block: "center", behavior: "smooth" });
            }
        }
    });
</script>

<svelte:head>
    <title>Gallery - BjeloPIC</title>
</svelte:head>

<svelte:window bind:innerHeight />

{#each by_collection as collection, i}
    <section
        class=" mx-auto {i % 2
            ? 'bg-bjelopic-neutral-8'
            : 'bg-bjelopic-neutral-7'} py-4 px-4 relative"
        on:click={() => (selected_video_uuid = "")}
        role="none"
    >
        <div class="max-w-screen-xl mx-auto px-4">
            {#if collection.videos[0].collection}
                <div
                    class="flex w-full justify-center mb-4 items-center gap-x-4 mx-auto transition-all duration-500 drop-shadow"
                >
                    <div
                        class="h-[1px] relative top-[2px] bg-white min-w-8 grow"
                    ></div>
                    <div
                        class="whitespace-normal w-auto max-w-[570px] font-bold text-2xl md:text-4xl text-center"
                    >
                        {collection.collection}
                    </div>
                    <div
                        class="h-[1px] relative top-[2px] bg-white min-w-8 grow"
                    ></div>
                </div>
                <div class="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mb-6">
                    {#each collection.videos[0].roles as role}
                        <div
                            class="bg-bjelopic-neutral-1 text-black rounded-sm text-sm lg:text-base px-1 py-[0.5px]"
                        >
                            <span class="drop-shadow">{role}</span>
                        </div>
                    {/each}
                </div>
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4"
                    role="none"
                >
                    {#each collection.videos as video}
                        <div class="drop-shadow-lg" id={video.uuid}>
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <button
                                class="w-full block"
                                on:click={(e) => {
                                    e.stopPropagation();
                                    if (selected_video_uuid === video.uuid) {
                                        return;
                                    }
                                    e.preventDefault();
                                    selected_video_uuid = video.uuid;
                                }}
                                on:pointerleave={(e) => {
                                    if (e.pointerType == "touch") return;
                                    e.stopImmediatePropagation();
                                    e.preventDefault();
                                    selected_video_uuid = "";
                                }}
                                on:pointerenter={(e) => {
                                    if (
                                        selected_video_uuid === video.uuid ||
                                        e.pointerType == "touch"
                                    ) {
                                        return;
                                    }
                                    e.stopImmediatePropagation();
                                    e.preventDefault();
                                    selected_video_uuid = video.uuid;
                                }}
                            >
                                <AspectRatio.Root ratio={16 / 9}>
                                    <GalleryVideo
                                        title={video.title}
                                        year={new Date(video.publication_date)
                                            .getUTCFullYear()
                                            .toString()}
                                        class="rounded-md md:rounded-sm md:hover:rounded-none transition-all overflow-clip"
                                        href={video.link}
                                        this_id={video.uuid}
                                        selected_id={selected_video_uuid}
                                        thumbnail_src={video.thumbnail_url}
                                        preview_src={video.preview_url}
                                        poster_src={video.poster_url}
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
                            class="w-full block basis-3/5"
                            on:click={(e) => {
                                e.stopPropagation();
                                if (selected_video_uuid === video.uuid) {
                                    return;
                                }
                                e.preventDefault();
                                selected_video_uuid = video.uuid;
                            }}
                            on:pointerleave={(e) => {
                                if (e.pointerType == "touch") return;
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                selected_video_uuid = "";
                            }}
                            on:pointerenter={(e) => {
                                if (
                                    selected_video_uuid === video.uuid ||
                                    e.pointerType == "touch"
                                ) {
                                    return;
                                }
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                selected_video_uuid = video.uuid;
                            }}
                        >
                            <AspectRatio.Root ratio={16 / 9}>
                                <GalleryVideo
                                    class="rounded-md md:rounded-sm md:hover:rounded-none transition-all overflow-clip"
                                    href={video.link}
                                    this_id={video.uuid}
                                    selected_id={selected_video_uuid}
                                    thumbnail_src={video.thumbnail_url}
                                    preview_src={video.preview_url}
                                    poster_src={video.poster_url}
                                />
                            </AspectRatio.Root>
                        </button>
                        <div
                            class="w-full basis-2/5 flex flex-col gap-y-1 justify-center md:justify-start drop-shadow mb-2 md:mb-0"
                        >
                            <span
                                class="text-bjelopic-blue-1 font-semibold text-2xl lg:text-3xl"
                            >
                                {#if video.subject === "BjeloPIC"}
                                    <TheBjeloPIC />
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
                                <span class="lg:text-lg mb-2"
                                    >{video.category}</span
                                >
                            {/if}
                            <div
                                class="flex justify-center md:justify-start {i %
                                    2 ==
                                0
                                    ? 'flex-row'
                                    : 'flex-row-reverse'} mb-2 flex-wrap gap-x-2 gap-y-2"
                            >
                                {#each video.roles as role}
                                    <div
                                        class="bg-bjelopic-neutral-1 text-black rounded-sm text-sm lg:text-base px-1 py-[0.5px]"
                                    >
                                        <span class="drop-shadow">{role}</span>
                                    </div>
                                {/each}
                            </div>
                            <div>
                                <GalleryVideoDescription>
                                    {video.description}
                                </GalleryVideoDescription>
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </section>
{/each}
