<script>
    import { Link, page } from "@inertiajs/svelte";
    let hrefLink = "/";
    let methodName = "get";

    export { hrefLink as href, methodName as method };
</script>

<Link
    href={hrefLink}
    class=" {$page.url.endsWith(hrefLink)
        ? 'font-bold'
        : 'font-light hover:font-normal'}"
    method={methodName}><slot /></Link
>
