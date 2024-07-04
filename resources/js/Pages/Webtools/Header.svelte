<script>
    import { Link } from "@inertiajs/svelte";
</script>

<header class="bg-black p-4 border-b border-b-neutral-800">
    <div
        class="max-w-screen-lg gap-y-2 gap-x-2 mx-auto flex justify-start items-center flex-col md:flex-row"
    >
        <Link href="/webtools">
            <div class="h-20 flex gap-x-4 items-center">
                <img
                    class="h-full object-contain"
                    src="/bjelopic_banner.png"
                    alt="BjeloPIC"
                />
            </div>
        </Link>
        <span class="text-white text-[36px] relative bottom-[2px] italic">Webtools</span>
    </div>
</header>
