<script lang="ts">
    import { run } from 'svelte/legacy';

    import NavLink from "$lib/components/ui/NavLink.svelte";
    import { SquareArrowOutUpRight } from "lucide-svelte";
    import {page} from '@inertiajs/svelte';
    interface Props {
        [key: string]: any
    }

    let { ...rest }: Props = $props();


    let show_telescope = $state(false);
    run(() => {
        show_telescope = $page.props.show_telescope;
    });
</script>

<div class="flex flex-col text-2xl gap-y-2 {rest.class} h-full">
    <NavLink href="/"
        ><span class="flex items-baseline"
            >Website<SquareArrowOutUpRight
                class="w-5 h-5 ml-2 relative top-[2px]"
            /></span
        ></NavLink
    >
    <NavLink href="/webtools">Dashboard</NavLink>
    <NavLink href="/webtools/hero">Hero</NavLink>
    <NavLink href="/webtools/videos">Videos</NavLink>
    <NavLink href="/webtools/uploads">File Upload</NavLink>
    {#if show_telescope}
        <NavLink xhr={false}  href="/telescope">Telescope</NavLink>
    {/if}

    <div class="grow h-full"></div>

    <NavLink href="/webtools/logout">Logout</NavLink>
</div>
