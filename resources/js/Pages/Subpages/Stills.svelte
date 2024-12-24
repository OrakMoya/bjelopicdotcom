<script>
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    let { video, stills } = $props();
</script>

<section class="p-4 max-w-screen-xl mx-auto mb-2">
    <div
        class="flex justify-evenly items-center transition-all duration-500 align-middle w-full gap-x-2 md:gap-x-4 mx-auto mb-4 md:mb-6 md:mt-2 max-w-screen-md"
    >
        <div
            class="border-b border-white w-full h-min opacity-0 sm:opacity-100 transition-opacity duration-500"
        ></div>
        <span
            class="whitespace-nowrap transition-all duration-500 text-lg sm:text-2xl relative md:bottom-[2px] font-semibold tracking-tight"
            >{video.title} ({new Date(
                video.publication_date,
            ).getUTCFullYear()})</span
        >
        <div
            class="border-b border-white w-full h-min opacity-0 sm:opacity-100 transition-opacity duration-500"
        ></div>
    </div>
    <div class="grid grid-cols-1 gap-8">
        {#each stills as still}
            <a href={still.path} target="_blank">
                <img
                    class="w-full rounded-md drop-shadow-glow-xs"
                    src={still.path}
                    alt="Still"
                />
            </a>
        {/each}
    </div>
</section>
