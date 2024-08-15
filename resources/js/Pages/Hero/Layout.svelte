<script>
    import Footer from "../Footer.svelte";
</script>

<div class="flex flex-col h-screen font-sans">
    <div class="flex-grow bg-black text-white relative">
        <slot />
    </div>

    <Footer />
</div>
