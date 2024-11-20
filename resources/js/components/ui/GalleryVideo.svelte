<script>
    import { run, preventDefault, stopPropagation } from 'svelte/legacy';

    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { AspectRatio } from "bits-ui";
    import { ChevronLeft } from "lucide-svelte";
    
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
        ...rest
    } = $props();
    let poster_shown = $state(false);
    let screensize_md = 768;
    let innerWidth = $state(0);
    let menubar_height = $state(0);
    let duration = preview_src ? 100 : 0;
    let focused = $derived(this_id === selected_id);
    run(() => {
        poster_shown = focused && poster_shown;
    });
</script>

<svelte:window bind:innerWidth />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="{focused
        ? 'scale-[104%] md:scale-[102%]'
        : ''} transition-all duration-300 w-full h-full"
>
    <div
        class="w-full h-full overflow-hidden relative bg-black {rest.class}"
    >
        {#if focused && preview_src}
            <div
                transition:fade
                class="absolute flex items-center align-middle w-full h-full top-0"
            >
                <a
                    {href}
                    target="_blank"
                    class="block w-full h-full object-cover"
                    transition:fade={{ duration }}
                >
                    <video muted autoplay loop transition:fade class="w-full h-full object-cover">
                        <source src={preview_src} />
                    </video>
                </a>
            </div>
        {:else}
            <div transition:fade class="absolute w-full h-full">
                {#if focused}
                    <a
                        {href}
                        target="_blank"
                        class="block absolute w-full h-full"
                        transition:fade={{ duration }}
                    >
                        <img src={thumbnail_src} {alt} class="object-cover w-full h-full" />
                    </a>
                {:else}
                    <img
                        src={thumbnail_src}
                        {alt}
                        class="absolute w-full h-full object-cover"
                        transition:fade={{ duration }}
                    />
                {/if}
            </div>
        {/if}
        {#if focused && title}
            <div
                bind:clientHeight={menubar_height}
                transition:fly={{ opacity: 1, y: menubar_height }}
                class="absolute font-semibold w-full bottom-0 bg-black/80 p-2 text-left"
            >
                {title} <span class="text-bjelopic-blue-1">({year})</span>
            </div>
        {/if}
        {#if !poster_shown && poster_src && focused}
            <button
                transition:fly={{ x: 50 }}
                class="absolute top-[15%] transition-all hover:pr-4 right-0 bg-black/80 rounded-tl-2xl rounded-bl-2xl p-2 z-10 block"
                onclick={stopPropagation(preventDefault(() =>
                    (poster_shown = true)))}
            >
                <ChevronLeft class="w-6 h-6" />
            </button>
        {/if}

        {#if focused && poster_src && poster_shown}
            <button
                class="w-1/3 p-4 z-10 hover:cursor-pointer block absolute right-0 top-0"
                onclick={stopPropagation(preventDefault(() =>
                    (poster_shown = false)))}
                transition:fly={{ x: 100 }}
            >
                <AspectRatio.Root ratio={707 / 1000}>
                    <img src={poster_src} alt="" />
                </AspectRatio.Root>
            </button>
        {/if}
    </div>
</div>
