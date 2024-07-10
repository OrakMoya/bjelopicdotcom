<script>
    import { Link } from "@inertiajs/svelte";
</script>

<header class="bg-black p-4 border-b border-b-neutral-800">
    <div>
        <Link
            href="/webtools"
            class="max-w-screen-lg gap-y-2 sm:gap-x-2 mx-auto flex items-center justify-center md:justify-start"
        >
            <div class="h-20 flex gap-x-4 items-center">
                <img
                    class="h-full object-contain"
                    src="/bjelopic_banner.png"
                    alt="BjeloPIC"
                />
            </div>
            <span
                class="text-white text-[32px] sm:text-[36px] relative bottom-[2px] italic"
                >Webtools</span
            >
        </Link>
    </div>
</header>
