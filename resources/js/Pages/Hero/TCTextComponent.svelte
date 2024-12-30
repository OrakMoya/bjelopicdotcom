<script>
    let { suffix = "", appendColon = false, children = null } = $props();
</script>

<div
    class="flex sm:gap-x-1 lg:gap-x-2 font-bold text-6xl sm:text-5xl lg:text-6xl"
>
    <span
        >{@render children?.()}<span
            class="text-neutral-700 text-5xl sm:text-4xl lg:text-5xl"
            >{suffix}</span
        ></span
    >
    <span class="hidden sm:block">
        {appendColon ? ":" : ""}
    </span>
</div>
