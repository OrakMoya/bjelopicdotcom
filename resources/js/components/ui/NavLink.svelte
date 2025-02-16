<script lang="ts">
    import { Link, page } from "@inertiajs/svelte";
    interface Props {
        href?: string;
        method?: string;
        xhr?: boolean;
        hide?: boolean;
        contains?: string;
        children?: import("svelte").Snippet;
    }

    let {
        href: hrefLink = "/",
        contains = "",
        method: methodName = "get",
        xhr = true,
        hide = false,
        children,
    }: Props = $props();
</script>

{#if xhr}
    <Link
        href={hrefLink}
        class="{hide ? 'hidden' : ''} {$page.url.endsWith(hrefLink) ||
        (contains && $page.url.includes(contains))
            ? 'font-bold'
            : 'font-light hover:font-normal'}"
        method={methodName}>{@render children?.()}</Link
    >
{:else}
    <a
        href={hrefLink}
        class="{hide ? 'hidden' : ''} {$page.url.endsWith(hrefLink) ||
        (contains && $page.url.includes(contains))
            ? 'font-bold'
            : 'font-light hover:font-normal'}"
        method={methodName}>{@render children?.()}</a
    >
{/if}
