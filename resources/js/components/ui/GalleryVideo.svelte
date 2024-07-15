<script>
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { AspectRatio } from "bits-ui";
    import { ChevronLeft } from "lucide-svelte";
    export let preview_src = null;
    export let thumbnail_src = null;
    export let alt = "";
    export let selected_id = "";
    export let this_id = "";
    export let href = "";
    export let poster_src = "";
    export let title = "";
    export let year = "";
    let poster_shown = false;
    let screensize_md = 768;
    let innerWidth = 0;
    let menubar_height = 0;
    let duration = preview_src ? 100 : 0;
    $: focused = this_id === selected_id;
    $: poster_shown = focused && poster_shown;
</script>

<svelte:window bind:innerWidth />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="{focused
        ? 'scale-[104%]'
        : ''} transition-all duration-300 w-full h-full"
>
    <div class="w-full h-full overflow-hidden relative bg-black {$$restProps.class}">
        {#if focused && preview_src}
            <div transition:fade class="absolute flex items-center align-middle w-full h-full top-0">
                <a
                    {href}
                    target="_blank"
                    class="block object-cover"
                    transition:fade={{ duration }}
                >
                    <video muted autoplay loop transition:fade>
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
                        class="block absolute"
                        transition:fade={{ duration }}
                    >
                        <img src={thumbnail_src} {alt} class="object-cover" />
                    </a>
                {:else}
                    <img
                        src={thumbnail_src}
                        {alt}
                        class="absolute"
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
                on:click|preventDefault|stopPropagation={() =>
                    (poster_shown = true)}
            >
                <ChevronLeft class="w-6 h-6" />
            </button>
        {/if}

        {#if focused && poster_src && poster_shown}
            <button
                class="w-1/3 p-4 z-10 hover:cursor-pointer block absolute right-0 top-0"
                on:click|preventDefault|stopPropagation={() =>
                    (poster_shown = false)}
                transition:fly={{ x: 100 }}
            >
                <AspectRatio.Root ratio={707 / 1000}>
                    <img src={poster_src} alt="" />
                </AspectRatio.Root>
            </button>
        {/if}
    </div>
</div>
