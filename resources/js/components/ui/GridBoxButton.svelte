<script lang="ts">
    import { AspectRatio } from "bits-ui";
    import { Link } from "@inertiajs/svelte";
    import { fly } from "svelte/transition";
    interface Props {
        href?: string;
        subtext?: string;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { href = "", subtext = "", children, ...rest }: Props = $props();
</script>

<Link {href}>
    <div
        class="border-2 border-neutral-700 rounded-lg overflow-clip w-32 text-white bg-neutral-900 hover:brightness-125 transition {rest.class}"
    >
        <AspectRatio.Root ratio={1} class="flex justify-center items-center">
            <div class="grid gap-y-1 text-center justify-center">
                <div class="flex justify-center items-center">
                    {@render children?.()}
                </div>
                <span class="text-lg">{subtext}</span>
            </div>
        </AspectRatio.Root>
    </div>
</Link>
