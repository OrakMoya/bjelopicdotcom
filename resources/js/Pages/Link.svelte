<script lang="ts">
    import { Link } from "@inertiajs/svelte";
    interface Props {
        href: any;
        target?: string;
        xhr?: boolean;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let {
        href,
        target = "",
        xhr = false,
        children,
        ...rest
    }: Props = $props();
</script>

{#if xhr}
    <Link
        {href}
        {target}
        class="md:hover:font-semibold md:transition-all {rest.class}"
        >{@render children?.()}</Link
    >
{:else}
    <a
        {href}
        {target}
        class="md:hover:font-semibold md:transition-all {rest.class}"
        >{@render children?.()}</a
    >
{/if}
