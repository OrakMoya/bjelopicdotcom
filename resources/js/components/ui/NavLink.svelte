<script>
    import { Link, page } from "@inertiajs/svelte";
    let hrefLink = "/";
    let methodName = "get";
    export let xhr = true;

    export { hrefLink as href, methodName as method };
</script>

{#if xhr}
    <Link
        href={hrefLink}
        class=" {$page.url.endsWith(hrefLink)
            ? 'font-bold'
            : 'font-light hover:font-normal'}"
        method={methodName}><slot /></Link
    >
{:else}
    <a
        href={hrefLink}
        class=" {$page.url.endsWith(hrefLink)
            ? 'font-bold'
            : 'font-light hover:font-normal'}"
        method={methodName}><slot /></a
    >
{/if}
