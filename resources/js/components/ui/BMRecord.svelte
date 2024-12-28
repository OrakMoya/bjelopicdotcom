<script>
    let { ...rest } = $props();

    let transitioned = $state(false);

    setTimeout(() => (transitioned = true), 3000);
</script>

<div
    class="rounded-full w-min-10 w-10 h-10 h-min-10 sm:w-14 sm:w-min-14 sm:h-14 sm:h-min-14 border-2 transition-colors duration-300
    {transitioned ? 'border-bjelopic-red-2' : 'border-white'}
    drop-shadow-lg bg-black/50 flex items-center justify-center {rest.class}"
>
    <div class="{transitioned ? 'bg-bjelopic-red-2' : 'bg-bjelopic-red-5'} rounded-full w-4 h-4 sm:w-6 sm:h-6 transition-colors duration-300"></div>
</div>
