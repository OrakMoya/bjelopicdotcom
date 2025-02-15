<script>
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import { Link } from "@inertiajs/svelte";
    import { ImageOffIcon } from "lucide-svelte";
    import { fade } from "svelte/transition";
    let { video, stills, in_collection, in_category, for_subject } = $props();

    let hovered = $state(false);
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
                    loading="lazy"
                    src={video.thumbnail_url}
                    class="object-cover w-full blur-md brightness-[40%] md:brightness-[65%] scale-105 md:scale-150"
                    alt="{video.title} thumbnail"
                />
            </div>
            <div class="relative">
                <span
                    class="text-neutral-400 md:text-neutral-500 md:text-lg drop-shadow-md"
                >
                    {video.category} za {video.subject}
                </span>
                <h1
                    class="text-2xl md:text-4xl font-bold drop-shadow-md mb-2 md:mb-3"
                >
                    {video.title} ({new Date(
                        video.publication_date,
                    ).getUTCFullYear()})
                </h1>

                <div
                    class="flex gap-1 md:gap-2 flex-wrap justify-start w-[80%] md:w-full"
                >
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
            <div class="flex flex-col justify-between gap-y-6 gap-x-8 w-full">
                <div>
                    {#if video.poster_url}
                        <div
                            class="sm:hidden w-[30%] rounded-md overflow-clip ml-4 mb-2 mt-2 float-right"
                        >
                            <AspectRatio ratio={707 / 1000}>
                                <a href={video.poster_url} target="_blank">
                                    <img
                                        loading="lazy"
                                        src={video.poster_url}
                                        alt="{video.title} poster"
                                    />
                                </a>
                            </AspectRatio>
                        </div>
                    {/if}
                    <p
                        class="w-full md:text-lg max-w-screen-md mx-auto text-justify"
                    >
                        {video.description}
                    </p>
                </div>
                <div class="w-full gap-x-4 flex max-w-screen-lg mx-auto">
                    <div
                        class="w-full {video.poster_url
                            ? 'sm:w-[71.55%]'
                            : 'max-w-screen-md mx-auto'}"
                    >
                        <a
                            href={video.link}
                            target="_blank"
                            class=" transition-transform"
                            onmouseover={() => (hovered = true)}
                            onmouseleave={() => (hovered = false)}
                            onfocus={() => (hovered = true)}
                            onfocusout={() => (hovered = false)}
                        >
                            <AspectRatio
                                ratio={16 / 9}
                                class="bg-neutral-800 rounded-sm overflow-clip hover:scale-[102%] transition-transform group relative drop-shadow-lg border border-neutral-800"
                            >
                                <!-- svelte-ignore a11y_media_has_caption -->
                                {#if hovered && video.preview_url}
                                    <video
                                        transition:fade
                                        class="object-cover absolute w-full h-full left-0 top-0"
                                        autoplay
                                        muted
                                    >
                                        <source
                                            class="object-cover"
                                            src={video.preview_url}
                                        />
                                    </video>
                                {:else}
                                    <img
                                        loading="lazy"
                                        transition:fade
                                        src={video.thumbnail_url}
                                        class=""
                                        alt="{video.title} thumbnail"
                                    />
                                {/if}
                            </AspectRatio>
                        </a>
                    </div>
                    {#if video.poster_url}
                        <div class="w-[28.45%] hidden sm:block">
                            <AspectRatio
                                ratio={707 / 1000}
                                class="bg-neutral-800 rounded-sm overflow-clip"
                            >
                                <a href={video.poster_url} target="_blank">
                                    <img
                                        loading="lazy"
                                        src={video.poster_url}
                                        alt="{video.title} poster"
                                    />
                                </a>
                            </AspectRatio>
                        </div>
                    {/if}
                </div>
                {#if video.description || video.poster_url}{/if}
            </div>
        </div>
    </section>

    {#if video.video_hours.length}
        <section
            class="bg-neutral-900 border-y border-neutral-800 px-4 pb-4 pt-12 relative overflow-clip"
        >
            <div
                class="flex w-full justify-between items-center max-w-screen-xl mx-auto"
            >
                <div class="relative">
                    <h2 class="text-xl md:text-3xl font-bold drop-shadow-md">
                        Satnice
                    </h2>
                </div>
            </div>
        </section>
        <section class=" px-4 bg-neutral-900 py-4 border-y border-neutral-800">
            <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-3/4 md:w-full max-w-screen-xl mx-auto items-end"
            >
                {#each video.video_hours as video_hour}
                    <div class="text-center">
                        <p
                            class="md:w-full w-[80%] mx-auto text-neutral-500 md:text-lg"
                        >
                            {video_hour.phase}
                        </p>
                        <p class="text-7xl font-bold">
                            {video_hour.amount}<span
                                class="text-5xl text-neutral-500"
                                >{video_hour.unit === "hours" ? "h" : "d"}</span
                            >
                        </p>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    {#if stills.length}
        {@const some = stills.slice(0, 10)}
        {@const rand = some[Math.floor(Math.random() * some.length)]}
        <section
            class="bg-neutral-900 border-y border-neutral-800 px-4 pb-4 pt-12 relative overflow-clip"
        >
            <div
                class="flex w-full justify-between items-center max-w-screen-xl mx-auto"
            >
                <div class="absolute right-0 w-full md:w-1/2">
                    <img
                        loading="lazy"
                        src={rand.path}
                        style="
                        -webkit-mask-image: -webkit-gradient(linear, left center, right center, color-stop(5%, rgba(0,0,0,0)), color-stop(25%, rgba(0,0,0,1)) );
                        "
                        class="object-cover w-full min-w-[430px] blur origin-right translate-y-[15%] md:translate-y-[24%] scale-110 md:scale-150"
                        alt="{rand.title} thumbnail"
                    />
                </div>
                <div class="relative">
                    <h2 class="text-xl md:text-3xl font-bold drop-shadow-md">
                        Stillovi rada
                    </h2>
                </div>
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
                            loading="lazy"
                            class="w-full h-full object-contain content-center"
                            src={still.path}
                            alt="{video.title} still {i}"
                        />
                    </a>
                {/each}
            </div>
        </section>
    {/if}

    {#if in_collection.length}
        {@const some = in_collection.slice(0, 10)}
        {@const rand = some[Math.floor(Math.random() * some.length)]}
        <section
            class="bg-neutral-900 border-y border-neutral-800 px-4 pb-4 pt-12 overflow-clip relative"
        >
            <div class="max-w-screen-xl mx-auto flex items-center">
                <div class="absolute right-0 w-full md:w-1/2">
                    <img
                        loading="lazy"
                        src={rand.thumbnail_url}
                        style="
                        -webkit-mask-image: -webkit-gradient(linear, left center, right center, color-stop(5%, rgba(0,0,0,0)), color-stop(25%, rgba(0,0,0,1)) );
                        "
                        class="brightness-[40%] md:brightness-75 object-cover scale-110 md:scale-150 w-full blur origin-right translate-y-[20%] md:translate-y-[24%]"
                        alt="{rand.title} thumbnail"
                    />
                </div>
                <div class="relative">
                    <span
                        class="text-neutral-400 md:text-neutral-500 drop-shadow-md"
                        >Drugi radovi u kolekciji</span
                    >
                    <h2 class="text-xl md:text-3xl font-bold drop-shadow-md">
                        {video.collection}
                    </h2>
                </div>
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
                            <img
                                loading="lazy"
                                src={col_video.thumbnail_url}
                                alt="{col_video.title} thumbnail"
                            />
                        </Link>
                    {/each}
                </div>
            </div>
        </section>
    {/if}

    {#if in_category.length}
        {@const some = in_category.slice(0, 10)}
        {@const rand = some[Math.floor(Math.random() * some.length)]}
        <section
            class="bg-neutral-900 border-y border-neutral-800 px-4 pb-4 pt-12 relative overflow-clip"
        >
            <div class="max-w-screen-xl mx-auto flex items-center">
                <div class="absolute right-0 w-full md:w-1/2">
                    <img
                        loading="lazy"
                        src={rand.thumbnail_url}
                        style="
                        -webkit-mask-image: -webkit-gradient(linear, left center, right center, color-stop(5%, rgba(0,0,0,0)), color-stop(25%, rgba(0,0,0,1)) );
                        "
                        class="brightness-[40%] md:brightness-75 object-cover scale-110 md:scale-150 w-full blur origin-right translate-y-[20%] md:translate-y-[24%]"
                        alt="{rand.title} thumbnail"
                    />
                </div>
                <div class="relative">
                    <span
                        class="text-neutral-400 md:text-neutral-500 drop-shadow-md"
                        >Drugi radovi u kategoriji</span
                    >
                    <h2 class="text-xl md:text-3xl font-bold drop-shadow-md">
                        {video.category}
                    </h2>
                </div>
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
                            <img
                                loading="lazy"
                                src={cat_video.thumbnail_url}
                                alt="{cat_video.title} thumbnail"
                            />
                        </Link>
                    {/each}
                </div>
            </div>
        </section>
    {/if}

    {#if for_subject.length}
        {@const some = for_subject.slice(0, 10)}
        {@const rand = some[Math.floor(Math.random() * some.length)]}
        <section
            class="bg-neutral-900 border-y border-neutral-800 px-4 pb-4 pt-12 overflow-clip relative"
        >
            <div class="max-w-screen-xl mx-auto flex items-center">
                <div class="absolute right-0 w-full md:w-1/2">
                    <img
                        loading="lazy"
                        src={rand.thumbnail_url}
                        style="
                        -webkit-mask-image: -webkit-gradient(linear, left center, right center, color-stop(5%, rgba(0,0,0,0)), color-stop(25%, rgba(0,0,0,1)) );
                        "
                        class="brightness-[40%] md:brightness-75 object-cover scale-110 md:scale-150 w-full blur origin-right translate-y-[20%] md:translate-y-[24%]"
                        alt="{rand.title} thumbnail"
                    />
                </div>
                <div class="relative">
                    <span
                        class="text-neutral-400 md:text-neutral-500 drop-shadow-md"
                        >Drugi radovi za</span
                    >
                    <h2 class="text-xl md:text-3xl font-bold drop-shadow-md">
                        {video.subject}
                    </h2>
                </div>
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
                            <img
                                loading="lazy"
                                src={subj_video.thumbnail_url}
                                alt="{subj_video.title} thumbnail"
                            />
                        </Link>
                    {/each}
                </div>
            </div>
        </section>
    {/if}
</main>
