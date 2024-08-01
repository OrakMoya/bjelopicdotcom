<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<div class="flex flex-col h-screen">
    <div class=" bg-black border-b border-neutral-800 flex justify-center">
        <span class="text-white drop-shadow-sm text-xs sm:text-sm p-2 text-center"
            >BjeloPIC je na kolektivnom godišnjem odmoru u razdoblju od 1.8. do
            13.8. Hvala na razumijevanju.</span
        >
    </div>
    <Header />
    <div class="flex-grow bg-black text-white">
        <slot />
    </div>

    <Footer />
</div>
