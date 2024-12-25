<script>
    import { Check } from "lucide-svelte";

    let {children} = $props();
</script>

<span class="inline-flex gap-x-1 items-center"><Check class="inline w-5 h-5 text-green-500" />{@render children()}</span>
