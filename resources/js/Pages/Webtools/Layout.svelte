<script lang="ts">
    import Header from "./Header.svelte";
    import LayoutLinks from "./LayoutLinks.svelte";
    import { Menu } from "lucide-svelte";
    import { fly, fade, scale } from "svelte/transition";
    import { page } from "@inertiajs/svelte";
    import MassToaster from "$lib/components/ui/MassToaster.svelte";
    interface Props {
        children?: import("svelte").Snippet;
        logged_in: boolean;
    }

    let { children, logged_in }: Props = $props();
    let screensize_xl = 1280;
    let screensize_md = 768;
    let screensize_sm = 640;
    let innerWidth = $state(0);
    let innerHeight = $state(0);
    let menubar_open = $state(false);
    $effect(() => {
        if (innerWidth > screensize_xl) menubar_open = false;
    });
    let menubar_width = $state(0);
    let header_height = $state(0);
    let effective_header_height = $state(0);
    let menubar_height = $state(0);
    let append_absolute = $state(false);
    let scrollY = $state(0);

    const anim_duration = 300;
    let duration = $state(anim_duration);
    $effect(() => {
        duration = innerWidth < screensize_xl ? anim_duration : 0;
    });
    $effect(() => {
        menubar_open = menubar_open && logged_in;
    });
    $effect(() => {
        append_absolute = innerWidth < screensize_xl ? append_absolute : false;
    });
    $effect(() => {
        effective_header_height =
            header_height - scrollY < 0 ? 0 : header_height - scrollY;
    });
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
                    onclick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        menubar_open = !menubar_open;
                    }}><Menu class="w-8 h-8" /></button
                >
            {/if}
        </Header>
        <div>
            {#if menubar_open}
                <!-- svelte-ignore a11y_interartive_supports_focus -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                    transition:fade={{ duration: 300 }}
                    class="w-screen h-screen fixed bg-neutral-900/80 z-30 top-0"
                    onclick={() => (menubar_open = false)}
                ></div>
            {/if}

            {#if innerWidth < screensize_md && menubar_open}
                <!-- Mobile collapsing menu -->
                <div class="h-full relative w-full z-30">
                    <div
                        class="flex fixed w-full pl-8 py-4 pr-20 bg-neutral-900 outline outline-1 outline-neutral-800 rounded-tl-xl rounded-tr-xl"
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
                        class="flex fixed right-0 min-w-72 pl-8 py-4 pr-20 bg-neutral-900 border-l border-l-neutral-800"
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
        <Header bind:clientHeight={header_height} />
    {/if}

    {#if innerWidth >= screensize_xl || append_absolute}
        <!-- Disable scroll while menu is open -->
        <style>
            html {
                overflow: clip;
            }
        </style>
    {/if}

    <div class="flex flex-grow bg-black text-white xl:overflow-hidden">
        {#if $page.props.logged_in}
            <div
                class="min-w-72 px-8 py-6 border-r border-r-neutral-800 bg-neutral-900 {innerWidth <
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
                        onintrostart={() => {
                            append_absolute = true;
                        }}
                        onintroend={() => {
                            append_absolute = false;
                        }}
                        onoutrostart={() => (append_absolute = true)}
                        onoutroend={() => (append_absolute = false)}
                    >
                        {@render children?.()}
                    </div>
                {/key}
            </div>
        </div>
    </div>
</div>
