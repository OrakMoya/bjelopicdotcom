<script>
    import HeroCarousel from "../HeroCarousel.svelte";

    let { videos } = $props();
</script>

<div class="relative bg-neutral-900 overflow-clip">
    <section class="pt-48 pb-[500px] relative">
        <div class="max-w-screen-xl mx-auto mb-12 md:mb-16">
            <h2 class="text-center text-6xl font-bold mb-2">
                Text ovdje nekakav
            </h2>
            <p class="text-center text-xl text-neutral-500">
                Subtext ovdje nekakav
            </p>
        </div>

        <HeroCarousel {videos} />
    </section>
</div>
