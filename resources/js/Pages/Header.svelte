<script>
    import TheSubtitle from "$lib/components/ui/TheSubtitle.svelte";
    import { Link } from "@inertiajs/svelte";
    import {cn} from "$lib/utils";
    let {...rest} = $props();
</script>

<header class={cn(["bg-neutral-900 py-4 px-10 border-b border-b-neutral-800", rest.class])}>
    <div
        class="max-w-screen-lg gap-y-2 mx-auto flex justify-center md:justify-between items-center flex-row"
    >
        <Link href="/">
            <div class="h-12 sm:h-16 md:h-18 flex gap-x-4 items-center">
                <img
                    class="h-full object-contain"
                    src="/bjelopic_banner.png"
                    alt="BjeloPIC"
                />
            </div>
        </Link>
        <div class="text-center">
            <span
                class="hidden  md:text-lg text-primary uppercase"
            >
                <TheSubtitle class="tracking-tight whitespace-nowrap" />
            </span>
        </div>
    </div>
</header>
