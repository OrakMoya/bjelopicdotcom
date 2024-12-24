<script>
    import { run, preventDefault, stopPropagation } from "svelte/legacy";

    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { AspectRatio } from "bits-ui";
    import { ChevronLeft, ImagesIcon } from "lucide-svelte";
    import { Link } from "@inertiajs/svelte";

    /**
     * @typedef {Object} Props
     * @property {any} [preview_src]
     * @property {any} [thumbnail_src]
     * @property {string} [alt]
     * @property {string|null} selected_id
     * @property {string} [this_id]
     * @property {string} [href]
     * @property {string} [poster_src]
     * @property {string} [title]
     * @property {string} [year]
     */

    /** @type {Props & { [key: string]: any }} */
    let {
        preview_src = null,
        thumbnail_src = null,
        alt = "",
        selected_id,
        this_id = "",
        href = "",
        poster_src = "",
        title = "",
        year = "",
        stillsAvailable = false,
        uuid = "",
        ...rest
    } = $props();
    let poster_shown = $state(false);
    let screensize_md = 768;
    let innerWidth = $state(0);
    let menubar_height = $state(0);
    let duration = preview_src ? 100 : 0;
    let focused = $derived(this_id === selected_id);
    $effect(() => {
        poster_shown = focused && poster_shown;
    });
</script>

<svelte:window bind:innerWidth />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="{focused
        ? 'scale-[104%] md:scale-[102%]'
        : ''} transition-all duration-300 w-full h-full group"
>
    <div class="w-full h-full relative {rest.class}">
        {#if stillsAvailable}
            <div class="w-full h-full scale-x-[1] absolute">
                <img
                    src={thumbnail_src}
                    {alt}
                    class="absolute w-full h-full rounded-md object-cover rotate-[2deg] origin-bottom-left brightness-[0%] -translate-y-[6px] translate-x-8 group-hover:rotate-0 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform delay-500 group-hover:delay-0 duration-500 group-hover:brightness-0"
                    transition:fade={{ duration }}
                />
                <img
                    src={thumbnail_src}
                    {alt}
                    class="absolute w-full h-full rounded-md object-cover rotate-[1deg] origin-bottom-left brightness-[50%] -translate-y-[3px] translate-x-4 group-hover:rotate-0 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform delay-500 group-hover:delay-0 duration-500 group-hover:brightness-0"
                    transition:fade={{ duration }}
                />
            </div>
        {/if}
        {#if focused && preview_src}
            <div
                transition:fade
                class="absolute flex items-center align-middle w-full h-full top-0 rounded-md overflow-clip"
            >
                <a
                    aria-label="View video"
                    {href}
                    target="_blank"
                    class="block w-full h-full object-cover"
                    transition:fade={{ duration }}
                >
                    <video
                        muted
                        autoplay
                        loop
                        transition:fade
                        class="w-full h-full object-cover"
                    >
                        <source src={preview_src} />
                    </video>
                </a>
            </div>
        {:else}
            <div transition:fade class="absolute w-full h-full rounded-md overflow-clip">
                {#if focused}
                    <a
                        {href}
                        target="_blank"
                        class="block absolute w-full h-full"
                        transition:fade={{ duration }}
                    >
                        <img
                            src={thumbnail_src}
                            {alt}
                            class="object-cover w-full h-full"
                        />
                    </a>
                {:else}
                    <img
                        src={thumbnail_src}
                        {alt}
                        class="absolute w-full h-full object-cover rounded-md drop-shadow-xl"
                        transition:fade={{ duration }}
                    />
                {/if}
            </div>
        {/if}
        <div class="w-full h-full absolute overflow-clip rounded-md">
            {#if focused && (title || stillsAvailable)}
                <div
                    bind:clientHeight={menubar_height}
                    transition:fly={{ opacity: 1, y: menubar_height }}
                    class="absolute flex items-center justify-between font-semibold w-full bottom-0 bg-black/80 p-1 text-left"
                >
                    <div class={title ? "" : "invisible"}>
                        {title}
                        <span class="text-bjelopic-blue-1"> ({year})</span>
                    </div>
                    <div class={stillsAvailable ? "" : "invisible"}>
                        <Link href={"/gallery/" + uuid}>
                            <ImagesIcon class="w-5 h-5 m-2" />
                        </Link>
                    </div>
                </div>
            {/if}
            {#if !poster_shown && poster_src && focused}
                <button
                    transition:fly={{ x: 50 }}
                    class="absolute top-[15%] transition-all hover:pr-4 right-0 bg-black/80 rounded-tl-2xl rounded-bl-2xl p-2 z-10 block"
                    onclick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        poster_shown = true;
                    }}
                >
                    <ChevronLeft class="w-6 h-6" />
                </button>
            {/if}

            {#if focused && poster_src && poster_shown}
                <button
                    class="w-1/3 p-4 z-10 hover:cursor-pointer block absolute right-0 top-0"
                    onclick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        poster_shown = false;
                    }}
                    transition:fly={{ x: 100 }}
                >
                    <AspectRatio.Root ratio={707 / 1000}>
                        <img src={poster_src} alt="" />
                    </AspectRatio.Root>
                </button>
            {/if}
        </div>
    </div>
</div>
