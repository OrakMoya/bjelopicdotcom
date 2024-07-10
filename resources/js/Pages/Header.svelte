<script>
    import TheBjeloPic from "$lib/components/ui/TheBjeloPIC.svelte";
    import { Link } from "@inertiajs/svelte";

    let subtitles = [
        'Producenti "ORIGINALNIH BJELOVARSKIH BLOCKBUSTERA"',
        "Jednostavno superiorniji",
    ];

    function pickSubtitle(bias) {
        let random = Math.random();
        if (random < bias) return subtitles[0];
        else return subtitles[1];
    }
</script>

<header class="bg-black p-4 border-b border-b-neutral-800">
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
                class=" text-center text-xs md:text-lg lg:text-xl text-white uppercase font-semibold"
            >
                {pickSubtitle(0.9)}
            </span>
        </div>
    </div>
</header>
