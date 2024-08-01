<script>
    import Footer from "../Footer.svelte";
</script>

<div class="flex flex-col h-screen font-sans">
    <div class=" bg-black border-b border-neutral-800 flex justify-center">
        <span class="text-white drop-shadow-sm text-xs sm:text-sm p-2 text-center"
            >BjeloPIC je na kolektivnom godišnjem odmoru u razdoblju od 1.8. do
            13.8. Hvala na razumijevanju.</span
        >
    </div>

    <div class="flex-grow bg-black text-white relative">
        <slot />
    </div>

    <Footer />
</div>
