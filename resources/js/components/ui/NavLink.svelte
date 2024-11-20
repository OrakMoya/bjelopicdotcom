<script lang="ts">
    import { Link, page } from "@inertiajs/svelte";
    interface Props {
        href?: string;
        method?: string;
        xhr?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        href: hrefLink = "/",
        method: methodName = "get",
        xhr = true,
        children
    }: Props = $props();

    
</script>

{#if xhr}
    <Link
        href={hrefLink}
        class=" {$page.url.endsWith(hrefLink)
            ? 'font-bold'
            : 'font-light hover:font-normal'}"
        method={methodName}>{@render children?.()}</Link
    >
{:else}
    <a
        href={hrefLink}
        class=" {$page.url.endsWith(hrefLink)
            ? 'font-bold'
            : 'font-light hover:font-normal'}"
        method={methodName}>{@render children?.()}</a
    >
{/if}
