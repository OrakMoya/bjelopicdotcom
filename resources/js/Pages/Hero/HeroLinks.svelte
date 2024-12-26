<script>
    import { Link } from "@inertiajs/svelte";
</script>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-1 text-sm sm:text-base items-center">
    <Link
        href="/gallery"
        class="px-4 py-2 rounded-xl bg-bjelopic-red-2 transition duration-300 text-white hover:bg-bjelopic-red-1 drop-shadow-md text-center text-base"
        ><span class="drop-shadow">Naši radovi</span></Link
    >
    <div class="grid grid-cols-2 gap-4 sm:col-span-2">
        <Link
            href="/contact"
            class="px-4 py-2 rounded-xl bg-black/50 drop-shadow-md transition duration-300 border border-neutral-700 text-white text-center hover:bg-neutral-800/75"
            >Kontaktirajte nas</Link
        >
        <a
            href="https://blog.bjelopic.com"
            class="px-4 py-2 rounded-xl bg-black/50 drop-shadow-md transition duration-300 border border-neutral-700 text-white text-center hover:bg-neutral-800/75"
            >BjeloPIC Blog</a
        >
    </div>
</div>
