<script>
    import { AspectRatio } from "bits-ui";
    export let videos;
    export let by_collection;

    let screensize_md = 768;
</script>

<svelte:head>
    <title>Gallery - BjeloPIC</title>
</svelte:head>

{#each by_collection as collection, i}
    <section
        class="{i % 2 ? 'bg-bjelopic-neutral-8' : 'bg-bjelopic-neutral-7'} pt-4 pb-8"
    >
        <div
            class="flex max-w-screen-lg mx-auto px-8 flex-col-reverse items-center {collection.length <
            2
                ? i % 2
                    ? 'md:flex-row-reverse md:items-start'
                    : 'md:flex-row md:items-start'
                : ''}"
        >
            <div
                class="{collection.length > 1
                    ? 'w-full'
                    : 'w-3/5'} flex flex-wrap items-center justify-center"
            >
                {#each collection as video, j}
                    <div
                        class="{(collection.length % 2 != 0 &&
                            j == collection.length - 1) ||
                        collection.length < 2
                            ? 'sm:basis-4/5 md:basis-full'
                            : 'basis-full sm:basis-4/5 md:basis-1/2'} p-2"
                    >
                        <AspectRatio.Root ratio={16 / 9}>
                            <img
                                class="w-full h-full object-cover"
                                src={video.thumbnail_path}
                                alt="{video.title} thumbnail"
                            />
                        </AspectRatio.Root>
                    </div>
                {/each}
            </div>
            <div class="font-bold text-2xl">
                {collection[0].collection
                    ? collection[0].collection
                    : collection[0].title}
            </div>
        </div>
    </section>
{/each}
