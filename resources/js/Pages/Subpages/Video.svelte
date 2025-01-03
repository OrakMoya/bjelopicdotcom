<script>
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import { Link } from "@inertiajs/svelte";
    import { ImageOffIcon } from "lucide-svelte";
    let { video, stills, in_collection, in_category, for_subject } = $props();
</script>

<svelte:head>
    <title
        >{video.title} ({new Date(video.publication_date).getUTCFullYear()}) -
        BjeloPIC</title
    >
</svelte:head>

<main class="my-4 flex flex-col gap-y-4">
    <section
        class="bg-neutral-900 border-y border-neutral-800 relative overflow-clip px-4 py-6"
    >
        <div
            class="max-w-screen-xl mx-auto w-full flex justify-between items-center"
        >
            <div class="absolute right-0 w-full md:w-1/2">
                <img
                    src={video.thumbnail_url}
                    class="object-cover w-full blur-md brightness-[40%] md:brightness-[65%] scale-105 md:scale-150"
                    alt=""
                />
            </div>
            <div class="relative">
                <span
                    class="text-neutral-400 md:text-neutral-500 md:text-lg drop-shadow-md"
                >
                    {video.category} za {video.subject}
                </span>
                <h1 class="text-2xl md:text-4xl font-bold drop-shadow-md mb-2 md:mb-4">
                    {video.title} ({new Date(
                        video.publication_date,
                    ).getUTCFullYear()})
                </h1>

                <div class="flex gap-1 md:gap-2 flex-wrap justify-start w-[80%] md:w-full">
                    {#each video.roles as role}
                        <div
                            class="
                w-fit
                whitespace-nowrap
                text-neutral-500
                drop-shadow-md
                md:text-sm text-xs
                bg-neutral-900/[65%] px-1 pt-[2px] pb-1 md:px-2
                rounded-md border border-neutral-700"
                        >
                            {role}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </section>

    <section
        class="bg-neutral-900 border-y border-neutral-800 px-4 py-6 md:py-4"
    >
        <div class="max-w-screen-xl mx-auto">
            <div
                class="flex flex-col-reverse md:flex-row justify-between gap-y-6 gap-x-8 w-full"
            >
                <div class="w-full gap-x-4 flex">
                    <div class="w-full sm:w-[71.55%]">
                        <a href={video.link} class=" transition-transform">
                            <AspectRatio
                                ratio={16 / 9}
                                class="bg-neutral-800 rounded-sm overflow-clip hover:scale-[102%] transition-transform"
                            >
                                <img
                                    src={video.thumbnail_url}
                                    class=""
                                    alt=""
                                />
                            </AspectRatio>
                        </a>
                    </div>
                    <div class="w-[28.45%] hidden sm:block">
                        <AspectRatio
                            ratio={707 / 1000}
                            class="bg-neutral-800 rounded-sm overflow-clip"
                        >
                            {#if video.poster_url}
                                <a href={video.poster_url} target="_blank">
                                    <img src={video.poster_url} alt="" />
                                </a>
                            {:else}
                                <div
                                    class="w-full h-full flex items-center justify-center"
                                >
                                    <ImageOffIcon class="size-8" />
                                </div>
                            {/if}
                        </AspectRatio>
                    </div>
                </div>
                {#if video.description || video.poster_url}
                    <div class="flex gap-x-4 w-full md:w-1/2 lg:w-2/5 h-min">
                        <p
                            class="{video.poster_url
                                ? 'w-2/3'
                                : ''} sm:w-full sm:text-lg"
                        >
                            {video.description}
                        </p>
                        {#if video.poster_url}
                            <div
                                class="sm:hidden w-1/3 sm:w-0 rounded-sm overflow-clip"
                            >
                                <AspectRatio ratio={707 / 1000}>
                                    <a href={video.poster_url} target="_blank">
                                        <img src={video.poster_url} alt="" />
                                    </a>
                                </AspectRatio>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    </section>

    {#if in_collection.length}
        <section
            class="bg-neutral-900 border-y border-neutral-800 px-4 pb-4 pt-12"
        >
            <div class="max-w-screen-xl mx-auto">
                <span class="text-neutral-500 drop-shadow-md"> Kolekcija</span>
                <h2 class="text-xl md:text-3xl font-bold drop-shadow-md">
                    {video.collection}
                </h2>
            </div>
        </section>
        <section class=" px-4 bg-neutral-900 py-4 border-y border-neutral-800">
            <div class="max-w-screen-xl mx-auto">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {#each in_collection as col_video}
                        <Link
                            class="block hover:scale-105 transition-transform rounded-sm overflow-clip border border-neutral-800"
                            href="/gallery/{col_video.uuid}"
                        >
                            <img src={col_video.thumbnail_url} alt="" />
                        </Link>
                    {/each}
                </div>
            </div>
        </section>
    {/if}

    {#if in_category.length}
        <section
            class="bg-neutral-900 border-y border-neutral-800 px-4 pb-4 pt-12"
        >
            <div class="max-w-screen-xl mx-auto">
                <span class="text-neutral-500 drop-shadow-md"
                    >Radovi u kategoriji</span
                >
                <h2 class="text-xl md:text-3xl font-bold drop-shadow-md">
                    {video.category}
                </h2>
            </div>
        </section>
        <section class=" px-4 bg-neutral-900 py-4 border-y border-neutral-800">
            <div class="max-w-screen-xl mx-auto">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {#each in_category as cat_video}
                        <Link
                            class="block hover:scale-105 transition-transform rounded-sm overflow-clip border border-neutral-800"
                            href="/gallery/{cat_video.uuid}"
                        >
                            <img src={cat_video.thumbnail_url} alt="" />
                        </Link>
                    {/each}
                </div>
            </div>
        </section>
    {/if}

    {#if for_subject.length}
        <section
            class="bg-neutral-900 border-y border-neutral-800 px-4 pb-4 pt-12"
        >
            <div class="max-w-screen-xl mx-auto">
                <span class="text-neutral-500 drop-shadow-md"
                    >Drugi radovi za</span
                >
                <h2 class="text-xl md:text-3xl font-bold drop-shadow-md">
                    {video.subject}
                </h2>
            </div>
        </section>
        <section class=" px-4 bg-neutral-900 py-4 border-y border-neutral-800">
            <div class="max-w-screen-xl mx-auto">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {#each for_subject as subj_video}
                        <Link
                            class="block hover:scale-105 transition-transform rounded-sm overflow-clip border border-neutral-800"
                            href="/gallery/{subj_video.uuid}"
                        >
                            <img src={subj_video.thumbnail_url} alt="" />
                        </Link>
                    {/each}
                </div>
            </div>
        </section>
    {/if}

    {#if stills.length}
        <section
            class="bg-neutral-900 border-y border-neutral-800 px-4 pb-4 pt-12"
        >
            <div class="max-w-screen-xl mx-auto">
                <h2 class="text-xl md:text-3xl font-bold drop-shadow-md">
                    Stillovi rada
                </h2>
            </div>
        </section>
        <section class=" px-4 bg-neutral-900 py-4 border-y border-neutral-800">
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-xl mx-auto"
            >
                {#each stills as still, i}
                    <a
                        href={still.path}
                        class="border rounded-sm overflow-clip {i ===
                            stills.length - 1 && stills.length % 2
                            ? 'md:col-span-2 md:w-2/3 md:mx-auto'
                            : ''} "
                    >
                        <img
                            class="w-full h-full object-contain content-center"
                            src={still.path}
                            alt=""
                        />
                    </a>
                {/each}
            </div>
        </section>
    {/if}
</main>
