<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { Button } from "$lib/components/ui/button";
    import { router, useForm } from "@inertiajs/svelte";
    import { ImagesIcon, PlusIcon, TrashIcon } from "lucide-svelte";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import NumberInput from "$lib/components/ui/NumberInput.svelte";
    import axios, { AxiosHeaders } from "axios";

    let { video, stills } = $props();

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
        $form.post("/webtools/videos/" + video.id + "/stills");
    }
    /** @type {Number|null} */
    let deleteTarget = null;
    let deleteDialogShown = $state(false);
</script>

<svelte:head>
    <title
        >{video.title} ({new Date(video.publication_date).getUTCFullYear()}) -
        Webtools</title
    >
</svelte:head>

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
                                    preserveState: true,
                                    preserveScroll: true,
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

<section
    class="px-8 py-4 flex flex-col gap-y-2 max-w-screen-sm md:max-w-screen-xl mx-auto"
>
    <h1 class="text-2xl mb-2 text-center md:text-left">
        <span>Stills of</span>
        <span class="font-semibold"
            >{video.title} ({new Date(
                video.publication_date,
            ).getUTCFullYear()})</span
        >
    </h1>
    <input
        type="file"
        class="hidden"
        id="still-input"
        accept="image/*"
        multiple
        oninput={handleInput}
    />
    <div
        class="grid grid-cols-1 md:grid-cols-2 xl:gap-6 gap-6 md:gap-4 mt-2 md:mt-0"
    >
        <label
            class="bg-bjelopic-neutral-8 w-full h-full rounded-md overflow-clip text-neutral-500 hover:text-white hover:cursor-pointer transition-colors flex items-center justify-center"
            for="still-input"
        >
            <AspectRatio ratio={stills.length > 0 ? 3 : 2.35}>
                <div class=" w-full h-full flex justify-center items-center">
                    <PlusIcon class="w-12 h-12" />
                </div>
            </AspectRatio>
        </label>
        {#each stills as still, i}
            <div
                class="flex md:flex-col border border-neutral-800 bg-neutral-900 rounded-md overflow-clip"
            >
                <AspectRatio ratio={16 / 9} class="group bg-black">
                    <img
                        src={still.path}
                        class="object-contain w-full h-full"
                        alt={"Still no. " + (i + 1) + " for " + video.title}
                    />
                </AspectRatio>
                <div
                    class="px-2 py-2 flex flex-col-reverse md:flex-row items-center justify-between"
                >
                    <NumberInput
                        number={still.position}
                        onChange={(number) =>
                            router.patch(
                                "/webtools/videos/stills/" + still.id,
                                {
                                    position: number,
                                },
                                {
                                    preserveScroll: true,
                                },
                            )}
                    />
                    <Button
                        variant="destructive"
                        class="transition-opacity p-2 h-fit"
                        onclick={() => {
                            deleteTarget = still.id;
                            deleteDialogShown = true;
                        }}
                    >
                        <TrashIcon class="w-4 h-4" />
                    </Button>
                </div>
            </div>
        {/each}
    </div>
</section>
