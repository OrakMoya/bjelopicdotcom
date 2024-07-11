<script>
    import { AspectRatio } from "bits-ui";
    export let videos;
</script>

{#each videos as video, i}
    <section class={i % 2 ? "bg-bjelopic-neutral-8" : "bg-bjelopic-neutral-7"}>
        <div
            class="max-w-screen-xl mx-auto flex p-4 gap-x-2 {i % 2
                ? 'flex-row-reverse'
                : ''}"
        >
            <div class="w-3/5 p-2">
                <AspectRatio.Root ratio={16 / 9}>
                    <img
                        class="w-full h-full"
                        src={video.thumbnail_path}
                        alt="{video.title} thumbnail"
                    />
                </AspectRatio.Root>
            </div>
            <div class="flex flex-col p-2">
                <span class="font-semibold text-2xl lg:text-3xl"
                    ><span class="text-bjelopic-blue-1"
                        >{video.subject} -
                    </span>{video.title}
                    <span class="text-bjelopic-blue-1"
                        >({new Date(
                            video.publication_date,
                        ).getUTCFullYear()})</span
                    ></span
                >
                <p>{video.description}</p>
            </div>
        </div>
    </section>
{/each}
