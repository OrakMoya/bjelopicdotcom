<script>
    import Header from "./Header.svelte";
    import LayoutLinks from "./LayoutLinks.svelte";
    import { Menu } from "lucide-svelte";
    import { fly, fade, scale } from "svelte/transition";
    import { page } from "@inertiajs/svelte";
    import MassToaster from "$lib/components/ui/MassToaster.svelte";
    let screensize_xl = 1280;
    let screensize_md = 768;
    let screensize_sm = 640;
    let innerWidth = 0;
    let innerHeight = 0;
    let menubar_open = false;
    $: if (innerWidth > screensize_xl) menubar_open = false;
    let menubar_width = 0;
    let header_height = 0;
    let effective_header_height = header_height;
    let menubar_height = 0;
    let append_absolute = false;
    let scrollY = 0;
    let logged_in = $page.props.logged_in;

    const anim_duration = 300;
    let duration = anim_duration;
    $: duration = innerWidth < screensize_xl ? anim_duration : 0;
    $: logged_in = $page.props.logged_in;
    $: menubar_open = menubar_open && logged_in;
    $: append_absolute = innerWidth < screensize_xl ? append_absolute : false;
    $: effective_header_height =
        header_height - scrollY < 0 ? 0 : header_height - scrollY;
</script>

{#if menubar_open}
    <style>
        body {
            overflow: hidden;
        }
    </style>
{/if}

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY />

<MassToaster />

<div class="flex flex-col h-screen">
    {#if innerWidth < screensize_xl}
        <Header
            dontHide={menubar_open}
            class="z-40"
            bind:clientHeight={header_height}
        >
            {#if logged_in}
                <button
                    transition:fade={{ duration: anim_duration }}
                    class="mx-4"
                    on:click|preventDefault|stopPropagation={() => {
                        menubar_open = !menubar_open;
                    }}><Menu class="w-8 h-8" /></button
                >
            {/if}
        </Header>
        <div>
            {#if menubar_open}
                <!-- svelte-ignore a11y-interartive-supports-focus -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    transition:fade={{ duration: 300 }}
                    class="w-screen h-screen fixed bg-black/80 z-30 top-0"
                    on:click={() => (menubar_open = false)}
                />
            {/if}

            {#if innerWidth < screensize_md && menubar_open}
                <!-- Mobile collapsing menu -->
                <div class="h-full relative w-full z-30">
                    <div
                        class="flex fixed w-full pl-8 py-4 pr-20 bg-black outline outline-1 outline-neutral-800 rounded-tl-xl rounded-tr-xl"
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
                <!-- Right side collapsing menu -->
                <div class="h-full relative w-full z-30">
                    <div
                        class="flex fixed right-0 min-w-72 pl-8 py-4 pr-20 bg-black border-l border-l-neutral-800"
                        bind:clientWidth={menubar_width}
                        style="height: calc(100vh - {effective_header_height}px); top: {effective_header_height}px;"
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
        <!-- Header for left side fixed menu -->
        <Header />
    {/if}

    {#if innerWidth >= screensize_xl || append_absolute}
        <!-- Disable scroll while menu is open -->
        <style>
            html {
                overflow: hidden;
            }
        </style>
    {/if}

    <div class="flex flex-grow bg-black text-white">
        {#if $page.props.logged_in}
            <div
                class="min-w-72 px-8 py-6 border-r border-r-neutral-800 {innerWidth <
                screensize_xl
                    ? 'hidden'
                    : ''}"
                style="height: calc(100vh - {header_height}px);"
            >
                <LayoutLinks />
            </div>
        {/if}

        <!-- Widest page layout is fixed. Page element inside has overflow scroll -->
        <div
            style="{innerWidth >= screensize_xl
                ? 'height: calc(100vh - ' + header_height + 'px);'
                : ''} "
            class=" overflow-x-clip w-full
            {innerWidth < screensize_xl
                ? 'overflow-visible h-auto'
                : 'overflow-y-scroll'}
            {append_absolute ? 'overflow-y-hidden' : ''}"
        >
            <div class="w-full h-full relative">
                {#key $page.url}
                    <div
                        class="{append_absolute
                            ? 'absolute overflow-hidden'
                            : ''} w-full h-full bg-black"
                        style="top: 0px;"
                        in:fly={{ y: innerHeight, duration: duration }}
                        out:fade={{ delay: duration, duration: 0 }}
                        on:introstart={() => {
                            append_absolute = true;
                        }}
                        on:introend={() => {
                            append_absolute = false;
                        }}
                        on:outrostart={() => (append_absolute = true)}
                        on:outroend={() => (append_absolute = false)}
                    >
                        <slot />
                    </div>
                {/key}
            </div>
        </div>
    </div>
</div>
