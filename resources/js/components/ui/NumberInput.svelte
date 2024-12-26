<script>
    import { ArrowDown, ArrowUp } from "lucide-svelte";

    let { number = $bindable(0), ...rest } = $props();
</script>

<div class="flex w-fit items-center rounded-md bg-black p-1">
    <div><ArrowDown class="w-4 h-4" /></div>
    <div>{number}</div>
    <div><ArrowUp class="w-4 h-4" /></div>
</div>
