<script>
    import { Link } from "@inertiajs/svelte";
    export let href;
    export let target = "";
    export let xhr = false;
</script>

{#if xhr}
    <Link
        {href}
        {target}
        class="md:hover:font-semibold md:transition-all {$$restProps.class}"
        ><slot /></Link
    >
{:else}
    <a
        {href}
        {target}
        class="md:hover:font-semibold md:transition-all {$$restProps.class}"
        ><slot /></a
    >
{/if}
