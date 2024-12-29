<script>
    import GalleryVideo from "$lib/components/ui/GalleryVideo.svelte";
    import TheBjeloPIC from "$lib/components/ui/TheBjeloPIC.svelte";
    import { AspectRatio } from "bits-ui";
    import GalleryVideoDescription from "./GalleryVideoDescription.svelte";
    import Checkmark from "$lib/components/ui/Checkmark.svelte";
    import { Link } from "@inertiajs/svelte";
    /** @import {GalleryVideoProps} from "$lib/types" */

    /**
     * @typedef {Object} Props
     * @prop {{collection: string; videos: GalleryVideoProps[] }[]} by_collection
     */

    /** @type Props */
    let { by_collection } = $props();
    const params = new URLSearchParams(window.location.search);
    const focus = params.get("focus");
    let innerHeight = $state(0);

    let selected_video_uuid = $state(focus);

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

    /**
     * @param {GalleryVideoProps[]} videos
     * @returns {Set<string>}
     */
    function getUniqueRoles(videos) {
        let set = new Set();
        videos.forEach((video) => {
            video.roles.forEach((role) => set.add(role));
        });
        return set;
    }
</script>

<svelte:head>
    <title>Gallery - BjeloPIC</title>
</svelte:head>

<svelte:window bind:innerHeight />
<!-- nisam zih
<div class="absolute w-full h-full">
    <div class="w-full h-full max-w-screen-xl mx-auto">
        <div class="w-1/5 h-full bg-bjelopic-red-5 relative -translate-x-1/3"></div>
    </div>
</div>
-->
{#each by_collection as collection, i}
    <section
        class="mx-auto sm:px-4 max-w-[550px] md:max-w-none my-4 relative"
        onclick={() => (selected_video_uuid = "")}
        role="none"
    >
        <div
            class="max-w-screen-xl mx-auto
            {!by_collection.at(i + 1)?.videos[0].collection &&
            i + 1 < by_collection.length
                ? ''
                : ''}
            py-4 border-y min-[550px]:border-x min-[550px]:border-neutral-800 bg-neutral-900 min-[550px]:rounded-md px-4"
        >
            {#if collection.videos[0].collection}
                {@const firstVideo = collection.videos[0]}
                {@const uniqueRoles = getUniqueRoles(collection.videos)}
                <div
                    class="flex w-full justify-center items-center gap-x-4 mx-auto transition-all duration-500 drop-shadow"
                >
                    <div
                        class="h-[1px] relative top-[2px] bg-white grow"
                    ></div>
                    <div
                        class="whitespace-normal w-max max-w-[570px] font-bold text-2xl md:text-4xl text-center"
                    >
                        {collection.collection}
                    </div>
                    <div
                        class="h-[1px] relative top-[2px] bg-white grow"
                    ></div>
                </div>
                <div
                    class="flex justify-center mb-6 text-lg lg:text-xl text-neutral-500"
                >
                    {#if firstVideo.subject === "BjeloPIC"}
                        <TheBjeloPIC />
                    {:else}
                        {firstVideo.subject}
                    {/if}
                </div>
                {#if uniqueRoles.size}
                    <div
                        class="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mb-4"
                    >
                        {#each uniqueRoles as role}
                            <div
                                class="bg-bjelopic-neutral-1 text-black rounded-sm text-sm lg:text-base px-1 py-[0.5px]"
                            >
                                <span class="drop-shadow">{role}</span>
                            </div>
                        {/each}
                    </div>
                {/if}
                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4"
                    role="none"
                >
                    {#each collection.videos as video}
                        <div class="drop-shadow-lg" id={video.uuid}>
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <button
                                class="w-full block"
                                onclick={(e) => {
                                    e.stopPropagation();
                                    if (selected_video_uuid === video.uuid) {
                                        return;
                                    }
                                    e.preventDefault();
                                    selected_video_uuid = video.uuid;
                                }}
                                onpointerleave={(e) => {
                                    if (e.pointerType == "touch") return;
                                    e.stopImmediatePropagation();
                                    e.preventDefault();
                                    selected_video_uuid = "";
                                }}
                                onpointerenter={(e) => {
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
                                <GalleryVideo
                                    year={new Date(video.publication_date)
                                        .getUTCFullYear()
                                        .toString()}
                                    {video}
                                    selected={video.uuid ===
                                        selected_video_uuid}
                                    showTitle
                                />
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
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <button
                            class="w-full block basis-3/5"
                            onclick={(e) => {
                                e.stopPropagation();
                                if (selected_video_uuid === video.uuid) {
                                    return;
                                }
                                e.preventDefault();
                                selected_video_uuid = video.uuid;
                            }}
                            onpointerleave={(e) => {
                                if (e.pointerType == "touch") return;
                                e.stopImmediatePropagation();
                                e.preventDefault();
                                selected_video_uuid = "";
                            }}
                            onpointerenter={(e) => {
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
                            <GalleryVideo
                                hideBottomBar
                                {video}
                                year={new Date(video.publication_date)
                                    .getUTCFullYear()
                                    .toString()}
                                selected={video.uuid === selected_video_uuid}
                            />
                        </button>
                        <div
                            class="w-full basis-2/5 flex flex-col gap-y-4 justify-center md:justify-start drop-shadow mb-2 md:mb-0"
                        >
                            <section>
                                <span
                                    class="font-semibold text-2xl lg:text-3xl block"
                                >
                                    {#if video.subject === "BjeloPIC"}
                                        <TheBjeloPIC />
                                    {:else}
                                        {video.subject}
                                    {/if} -
                                    <span class="text-white">
                                        {video.title}
                                    </span>
                                    ({new Date(
                                        video.publication_date,
                                    ).getUTCFullYear()})
                                </span>
                                {#if video.category}
                                    <span
                                        class="lg:text-lg mb-2 text-neutral-500 block"
                                        >{video.category}</span
                                    >
                                {/if}
                            </section>
                            <div
                                class="flex justify-center md:justify-start box-border {i %
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
                                {#if video.stillsAvailable}
                                    <Checkmark
                                        class="bg-neutral-900 border border-neutral-500 box-border rounded-md pl-1 pr-2 text-sm lg:text-base"
                                        >Stillovi</Checkmark
                                    >
                                {/if}
                            </div>
                            <Link
                                class="italic underline text-neutral-500"
                                href={"/gallery/" + video.uuid}
                                >Pročitaj više</Link
                            >
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </section>
{/each}
