<script>
    import { Link } from "@inertiajs/svelte";
    import {ArrowRight} from "lucide-svelte";
</script>

<div
    class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-1 text-lg items-center"
>
    <Link
        href="/gallery"
        class="px-4 py-2 rounded-md bg-bjelopic-red-2 transition duration-300 text-white hover:bg-bjelopic-red-1 drop-shadow-md text-center text-base font-semibold border border-bjelopic-red-1"
        ><span class="drop-shadow">Naši radovi</span></Link
    >
    <Link
        href="/contact"
        class="px-4 py-2  drop-shadow-md transition duration-300 text-white group text-center inline-flex items-center gap-x-1"
        >Kontaktirajte nas <ArrowRight class="group-hover:translate-x-2 transition-all duration-300" /> </Link
    >
</div>
