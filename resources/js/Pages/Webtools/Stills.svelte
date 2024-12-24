<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { Button } from "$lib/components/ui/button";
    import { router, useForm } from "@inertiajs/svelte";
    import { ImagesIcon, PlusIcon, TrashIcon } from "lucide-svelte";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";

    let { video, stills } = $props();
    console.log(video, stills);

    let form = useForm({
        /** @type {File[]|null} */
        stills: null,
    });

    /**
     * @param {Event} event
     */
    function handleInput(event) {
        let target = /** @type {HTMLInputElement}*/ (event.target);
        $form.stills = [...(target.files ?? [])];
        console.log($form.stills);
        $form.post("/webtools/videos/" + video.id + "/stills");
    }
    /** @type {Number|null} */
    let deleteTarget = null;
    let deleteDialogShown = $state(false);
</script>

<AlertDialog.Root bind:open={deleteDialogShown}>
    <AlertDialog.Content>
        <AlertDialog.Header>Are you sure?</AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action
                >{#snippet child(props)}
                    <Button
                        variant="destructive"
                        onclick={() => {
                            router.visit(
                                "/webtools/videos/stills/" + deleteTarget,
                                {
                                    method: "delete",
                                    onSuccess: () => {
                                        deleteTarget = null;
                                        deleteDialogShown = false;
                                    },
                                },
                            );
                        }}
                        {...props}>Delete</Button
                    >
                {/snippet}</AlertDialog.Action
            >
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
<section class="p-4 flex flex-col gap-y-2">
    <h1
        class="text-2xl mb-2 text-center md:text-left"
    ><span class="hidden md:inline">Stills of</span> <span class="font-semibold">{video.title} ({new Date(video.publication_date).getUTCFullYear()})</span></h1>
    <input
        type="file"
        class="hidden"
        id="still-input"
        accept="image/*"
        multiple
        oninput={handleInput}
    />
    <label
        class="rounded-md px-4 py-2 text-sm bg-primary text-primary-foreground hover:opacity-85 hover:cursor-pointer inline-flex gap-1 transition-opacity justify-center"
        for="still-input"
        ><ImagesIcon class="w-6 h-6" /> <PlusIcon class="w-6 h-6" /></label
    >
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {#each stills as still, i}
            <AspectRatio ratio={16 / 9} class="group rounded-md overflow-clip">
                <img
                    src={still.path}
                    alt={"Still no. " + (i + 1) + " for " + video.title}
                />
                <Button
                    variant="destructive"
                    class="absolute right-2 bottom-2 lg:hidden group-hover:block transition-all"
                    onclick={() => {
                        deleteTarget = still.id;
                        deleteDialogShown = true;
                    }}><TrashIcon class="w-4 h-4" /></Button
                >
            </AspectRatio>
        {/each}
    </div>
</section>
