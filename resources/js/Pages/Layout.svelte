<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<div class="flex flex-col h-screen">
    <Header />
    <div class="flex-grow bg-black text-white">
        <slot />
    </div>

    <Footer />
</div>
