<script>
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    let { video, stills } = $props();
</script>

<section class="p-4 max-w-screen-xl mx-auto">
    <div class="grid grid-cols-1 gap-8">
        {#each stills as still}
            <AspectRatio ratio={16 / 9} class="">
                <a href={still.path} target="_blank">
                    <img src={still.path} alt="Still" />
                </a>
            </AspectRatio>
        {/each}
    </div>
</section>
