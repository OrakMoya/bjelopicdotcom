<script>
    import Header from "./Header.svelte";
    import LayoutLinks from "./LayoutLinks.svelte";
    import * as Drawer from "$lib/components/ui/drawer";
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";
    import { Menu } from "lucide-svelte";
    import { fly, fade } from "svelte/transition";
    let screensize_xl = 1280;
    let screensize_md = 768;
    let innerWidth = 0;
    let menubar_open = false;
    $: if (innerWidth > screensize_xl) menubar_open = false;
    let menubar_width = 0;
    let header_height = 0;
    let menubar_height = 0;
    $: console.log(header_height);
</script>

{#if menubar_open}
    <style>
        body {
            overflow: hidden;
        }
    </style>
{/if}

<svelte:window bind:innerWidth />

<div class="flex flex-col h-screen">
    {#if innerWidth < screensize_xl}
        <Header
            dontHide={menubar_open}
            class="z-40"
            bind:clientHeight={header_height}
        >
            <button
                class="mx-4"
                on:click|preventDefault|stopPropagation={() => {
                    menubar_open = !menubar_open;
                }}><Menu class="w-8 h-8" /></button
            >
        </Header>
        <div>
            {#if innerWidth < screensize_md && menubar_open}
                <div class="h-full relative w-full z-30">
                    <!-- svelte-ignore a11y-interartive-supports-focus -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        transition:fade={{ duration: 300 }}
                        class="w-screen h-screen fixed bg-black/80"
                        on:click={() => (menubar_open = false)}
                        on:scroll|stopPropagation|preventDefault={(e) => {
                            console.log("scroll");
                        }}
                    />
                    <div
                        class="flex fixed w-full pl-8 py-4 pr-20 bg-black border-t bordet-l-neutral-800"
                        style="bottom: {header_height}px;"
                        transition:fly={{
                            y: menubar_height + header_height + 50,
                            opacity: 1,
                            duration: 400,
                        }}
                        bind:clientHeight={menubar_height}
                    >
                        <LayoutLinks class="flex-col-reverse" />
                    </div>
                </div>
            {:else if menubar_open}
                <div class="h-full relative w-full z-30">
                    <!-- svelte-ignore a11y-interartive-supports-focus -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        transition:fade={{ duration: 300 }}
                        class="w-screen fixed bg-black/80"
                        style="height: calc(100vh - {header_height}px);"
                        on:click={() => (menubar_open = false)}
                    />
                    <div
                        class="flex fixed right-0 min-w-72 pl-8 py-4 pr-20 bg-black border-l border-l-neutral-800"
                        bind:clientWidth={menubar_width}
                        style="height: calc(100vh - {header_height}px);"
                        transition:fly={{
                            x: menubar_width + 50,
                            opacity: 1,
                            duration: 400,
                        }}
                    >
                        <LayoutLinks />
                    </div>
                </div>
            {/if}
        </div>
    {:else}
        <Header />
    {/if}

    <div class="flex flex-grow bg-black text-white">
        {#if innerWidth >= screensize_xl}
            <div
                class="min-w-72 px-8 py-6 border-r border-r-neutral-800"
                style="height: calc(100vh - {header_height}px);"
            >
                <LayoutLinks />
            </div>
        {/if}
        <slot />
    </div>
</div>
