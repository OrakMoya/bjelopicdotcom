<script>
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import TheBjeloPic from "$lib/components/ui/TheBjeloPIC.svelte";
    let { video, stills } = $props();
</script>

<svelte:head>
    <title
        >{video.title} ({new Date(video.publication_date).getUTCFullYear()}) -
        BjeloPIC</title
    >
</svelte:head>

<section class="p-4 max-w-screen-xl mx-auto mb-2">
    <div class=" mb-2 md:mb-4">
        <div
            class="flex justify-evenly items-center transition-all duration-500 align-middle w-full gap-x-2 md:gap-x-4 mx-auto md:mt-2 max-w-screen-md"
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
        <div class="flex flex-col justify-center">
            <span class="text-center text-neutral-500 italic"
                >By <TheBjeloPic />, for {#if video.subject === "BjeloPIC"}
                    <TheBjeloPic />
                {:else}
                    <span class="text-white">
                        {video.subject}
                    </span>
                {/if}
            </span>
        </div>
        <div class="flex justify-center">
            <a class="italic underline" href={video.link}>Watch here</a>
        </div>
    </div>

    <article class="max-w-screen-md mx-auto">
        <div>
            <p class="text-justify">{video.description}</p>
        </div>
    </article>

    <div class="mt-16">
        <div
            id="roles"
            class="flex justify-evenly items-center transition-all duration-500 align-middle w-full gap-x-2 md:gap-x-4 mx-auto mb-4 md:mb-6 md:mt-2 max-w-screen-md"
        >
            <div
                class="border-b border-white w-full h-min opacity-0 sm:opacity-100 transition-opacity duration-500"
            ></div>
            <span
                class="whitespace-nowrap transition-all duration-500 text-lg sm:text-2xl relative md:bottom-[2px] font-semibold tracking-tight"
                >Naše uloge</span
            >
            <div
                class="border-b border-white w-full h-min opacity-0 sm:opacity-100 transition-opacity duration-500"
            ></div>
        </div>
        <div class="flex justify-center my-2 gap-2 flex-wrap">
            {#each video.roles as role}
                <div
                    class="bg-bjelopic-neutral-1 text-black rounded-sm text-base px-1 py-[0.5px]"
                >
                    <span class="drop-shadow">{role}</span>
                </div>
            {/each}
        </div>
    </div>

    <div class="{stills.length ? 'block' : 'hidden'} mt-16">
        <div
            id="stills"
            class="flex justify-evenly items-center transition-all duration-500 align-middle w-full gap-x-2 md:gap-x-4 mx-auto mb-4 md:mb-6 md:mt-2 max-w-screen-md"
        >
            <div
                class="border-b border-white w-full h-min opacity-0 sm:opacity-100 transition-opacity duration-500"
            ></div>
            <span
                class="whitespace-nowrap transition-all duration-500 text-lg sm:text-2xl relative md:bottom-[2px] font-semibold tracking-tight"
                >Stillovi</span
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
    </div>
</section>
