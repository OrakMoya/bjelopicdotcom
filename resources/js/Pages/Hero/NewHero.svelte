<script module>
    import Button from "$lib/components/ui/button/button.svelte";
    import { Link } from "@inertiajs/svelte";
    import Header from "../Header.svelte";

    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import BmRecord from "$lib/components/ui/BMRecord.svelte";
    import HeroTypewriter from "$lib/components/ui/HeroTypewriter.svelte";
    import { MoveRight } from "lucide-svelte";

    let { heroUrl } = $props();
</script>

<div
    class="absolute top-0 left-0 overflow-clip w-screen h-full flex justify-center items-center"
>
    <div class=" w-full h-full object-cover blur-md">
        <video
            class="w-full h-full object-cover brightness-50"
            autoplay
            loop
            muted
        >
            <source src={heroUrl} type="video/webm" />
        </video>
    </div>
</div>
<section class="w-full h-screen relative flex flex-col">
    <Header class="bg-transparent border-0" />

    <div class="w-full h-full px-10">
        <section
            class="grid grid-cols-1 lg:grid-cols-5 w-full h-full max-w-[400px] sm:max-w-screen-xl mx-auto"
        >
            <!-- Left side -->
            <div
                class="flex flex-col gap-y-20 sm:gap-y-16 justify-center h-[90%] sm:h-full lg:h-[80%] col-span-3"
            >
                <div class="flex flex-col items-center sm:items-start">
                    <div
                        class="min-[350px]:text-5xl text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-md inline-flex items-center flex-wrap lg:whitespace-nowrap mb-3 lg:mb-4 box-border"
                    >
                        <div
                            class="flex flex-col sm:flex-row items-center basis-full h-min justify-center sm:justify-start text-center sm:text-left"
                        >
                            <BmRecord class="sm:mr-4 mb-3 sm:mb-0" />
                            Trebate nešto
                            <p class="hidden sm:inline-block">&nbsp</p>
                        </div>

                        <span
                            class="text-bjelopic-red-1 inline-flex items-center sm:items-start justify-center sm:justify-left w-full sm:w-auto"
                        >
                            <BmRecord
                                class="hidden sm:flex opacity-0 mr-2 sm:mr-4"
                            />
                            <HeroTypewriter
                                class="whitespace-nowrap"
                                phrases={[
                                    "snimiti?",
                                    "režirati?",
                                    "producirati?",
                                    "osvijetliti?"
                                ]}
                            /></span
                        >
                    </div>
                    <div class="inline-flex">
                        <BmRecord
                            class="hidden sm:flex opacity-0 mr-2 sm:mr-4 shrink-0"
                        />
                        <p
                            class="sm:text-xl text-center sm:text-left text-neutral-400 max-w-xl drop-shadow-md"
                        >
                            Možemo Vam pomoći u svemu tome. Naša strast i iskustvo jamče rezultate u svim aspektima filmskog stvaralaštva.
                        </p>
                    </div>
                </div>

                <div class="inline-flex">
                    <BmRecord
                        class="hidden sm:flex opacity-0 mr-2 sm:mr-4 shrink-0"
                    />
                    <div
                        class="flex flex-wrap flex-row sm:text-lg justify-center sm:justify-start items-center gap-x-4 gap-y-4 max-w-[250px] sm:max-w-none mx-auto sm:mx-0"
                    >
                        <Link
                            href="/gallery"
                            class="w-full sm:w-fit font-bold rounded-md bg-bjelopic-red-2 border border-bjelopic-red-1 px-4 py-2 hover:bg-opacity-80 transition-colors text-center drop-shadow-md"
                            ><span class="drop-shadow-md">Naši radovi</span></Link
                        >
                        <Link
                            href="/contact"
                            class="w-full sm:w-fit justify-center px-4 py-2 inline-flex items-center gap-x-3 group text-neutral-300 hover:text-white transition-colors drop-shadow-md"
                            >Kontaktirajte nas <MoveRight
                                class="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Right side -->
            <div class="hidden sm:block"></div>
        </section>
    </div>
</section>
