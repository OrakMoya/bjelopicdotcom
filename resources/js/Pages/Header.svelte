<script>
    import TheSubtitle from "$lib/components/ui/TheSubtitle.svelte";
    import { Link } from "@inertiajs/svelte";
</script>

<header class="bg-neutral-900 p-4 border-b border-b-neutral-800">
    <div
        class="max-w-screen-lg gap-y-2 mx-auto flex justify-between items-center flex-col md:flex-row"
    >
        <Link href="/">
            <div class="h-20 flex gap-x-4 items-center">
                <img
                    class="h-full object-contain"
                    src="/bjelopic_banner.png"
                    alt="BjeloPIC"
                />
            </div>
        </Link>
        <div class="text-center">
            <span
                class=" text-center text-xs sm:text-base md:text-lg lg:text-xl text-white uppercase font-semibold"
            >
                <TheSubtitle class="tracking-tight whitespace-nowrap" />
            </span>
        </div>
    </div>
</header>
