<script>
    import HeroCarousel from "../HeroCarousel.svelte";

    let { videos } = $props();
</script>

<div class="relative bg-neutral-900 overflow-clip">
    <section class="py-32 md:py-48 relative">
        <div class="max-w-screen-xl mx-auto mb-8 md:mb-12 px-8">
            <h2 class="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                Vlastite produkcije, koprodukcije te suradnje
            </h2>
            <p class="text-center md:text-lg lg:text-xl text-neutral-500">
                Od kreiranja promotivnih segmenta za filmske festivale do koprodukcije kratkometražnog filma za studente fakulteta, pa i kompletne produkcije vlastitog dugometražnog filma, nije nam strano ni surađivanje ni skroz vlastiti uradak.
            </p>
        </div>

        <HeroCarousel class="mb-6" {videos} />
    </section>
</div>
