<script module>
    // @ts-nocheck

    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { Button } from "$lib/components/ui/button";
    import { router, useForm } from "@inertiajs/svelte";
    import {
        DownloadIcon,
        ImagesIcon,
        PlusIcon,
        TrashIcon,
    } from "lucide-svelte";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import NumberInput from "$lib/components/ui/NumberInput.svelte";
    import axios, { AxiosHeaders } from "axios";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import StillComponent from "./StillComponent.svelte";
    import { Label } from "$lib/components/ui/label";

    let { video, stills } = $props();

    let form = useForm({
        /** @type {File[]|null} */
        stills: null,
        /** @type {('ASC'|'DESC')|false} */
        sortByFilename: false,
    });

    /**
     * @param {Event} event
     */
    function handleInput(event) {
        let target = /** @type {HTMLInputElement}*/ (event.target);
        $form.stills = [...(target.files ?? [])];
        $form.post("/webtools/videos/" + video.id + "/stills", {
            onSuccess: () =>
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                }),
        });
    }
    /** @type {Number|null} */
    let deleteTarget = null;
    let deleteDialogShown = $state(false);
    let deleteSelectedDialogShown = $state(false);
    let downloadSelectedDialogShown = $state(false);

    /** @type {number[]} */
    let selectedStills = $state([]);

    /**
     * @param {number} id
     * @param {boolean} state
     */
    function selectStill(id, state) {
        if (state) {
            selectedStills = [...selectedStills, id];
        } else {
            selectedStills = selectedStills.filter((item) => {
                return item !== id;
            });
        }
    }

    let fileDropping = $state(false);

    /**
     * @param {DragEvent & { currentTarget: EventTarget & HTMLDivElement; }} e
     */
    function handleDrop(e) {
        e.preventDefault();
        fileDropping = false;
        console.log(e.dataTransfer?.files);
        if (e.dataTransfer?.files) {
            /**
             * @type {File[]}
             */
            $form.stills = [...e.dataTransfer.files];
            $form.post("/webtools/videos/" + video.id + "/stills", {
                onSuccess: () =>
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                    }),
            });
        }
    }
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

<AlertDialog.Root bind:open={downloadSelectedDialogShown}>
    <AlertDialog.Content>
        <AlertDialog.Header>Nisam jos implementiro</AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Jbg</AlertDialog.Cancel>
            <AlertDialog.Action>
                {#snippet child(props)}
                    <Button
                        variant="default"
                        onclick={() => (downloadSelectedDialogShown = false)}
                        {...props}>Jbg</Button
                    >
                {/snippet}
            </AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root bind:open={deleteSelectedDialogShown}>
    <AlertDialog.Content>
        <AlertDialog.Header>Are you sure?</AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action
                >{#snippet child(props)}
                    <Button
                        variant="destructive"
                        onclick={() => {
                            router.visit("/webtools/videos/stills/custom", {
                                method: "delete",
                                data: {
                                    selectedStills:
                                        $state.snapshot(selectedStills),
                                },
                                onSuccess: () => {
                                    deleteSelectedDialogShown = false;
                                    selectedStills = [];
                                },
                                preserveState: true,
                                preserveScroll: true,
                            });
                        }}
                        {...props}>Delete</Button
                    >
                {/snippet}</AlertDialog.Action
            >
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
    ondragenter={(e) => {
        e.preventDefault();
        fileDropping = true;
    }}
    ondragover={(e) => {
        e.preventDefault();
        fileDropping = true;
    }}
    ondragleave={() => {
        fileDropping = false;
    }}
    ondrop={handleDrop}
    class="px-8 py-4 flex flex-col gap-y-2 max-w-screen-sm md:max-w-screen-xl mx-auto relative group h-full min-h-full"
>
    <div
        class="flex flex-col md:flex-row items-start md:items-center justify-between"
    >
        <h1 class="text-2xl mb-2 text-center md:text-left w-full md:w-auto">
            <span>Stills of</span>
            <span class="font-semibold"
                >{video.title} ({new Date(
                    video.publication_date,
                ).getUTCFullYear()})</span
            >
        </h1>

        <div
            class="flex flex-col sm:flex-row items-center gap-x-2 gap-y-2 w-full md:w-auto justify-center"
        >
            <div class="inline-flex items-center gap-x-2">
                {#if selectedStills.length}
                    <Button
                        variant="destructive"
                        onclick={() => (deleteSelectedDialogShown = true)}
                    >
                        <TrashIcon class="size-6" />
                    </Button>
                    <Button
                        onclick={() => (downloadSelectedDialogShown = true)}
                    >
                        <DownloadIcon class="size-6" />
                    </Button>
                {/if}
                <Label
                    class="h-10 inline-flex items-center gap-x-2 hover:cursor-pointer bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-md"
                    for="select-all-checkbox"
                >
                    <Checkbox
                        class="size-4"
                        id="select-all-checkbox"
                        bind:checked={() => {
                            return (
                                selectedStills.length === stills.length &&
                                stills.length
                            );
                        },
                        (s) => {
                            if (s) {
                                selectedStills = [];
                                stills.forEach(
                                    (
                                        /** @type {{ id: number; }} */ element,
                                    ) => {
                                        selectedStills.push(element.id);
                                    },
                                );
                            } else selectedStills = [];
                        }}
                    />
                    All
                </Label>
            </div>
            <div class="inline-flex items-center gap-x-2">
                On upload, sort by filename:
                <div
                    class="bg-neutral-900 rounded-md px-2 py-1 inline-flex gap-x-2"
                >
                    <button
                        onclick={() => ($form.sortByFilename = false)}
                        class="{$form.sortByFilename !== false
                            ? ''
                            : 'text-white bg-black'} px-2 rounded-md">/</button
                    >
                    <button
                        onclick={() => ($form.sortByFilename = "ASC")}
                        class="{$form.sortByFilename !== 'ASC'
                            ? ''
                            : 'text-white bg-black'} px-2 rounded-md"
                        >ASC</button
                    >
                    <button
                        onclick={() => ($form.sortByFilename = "DESC")}
                        class="{$form.sortByFilename !== 'DESC'
                            ? ''
                            : 'text-white bg-black'} px-2 rounded-md"
                        >DESC</button
                    >
                </div>
            </div>
        </div>
    </div>
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
            <StillComponent
                {still}
                index={i}
                {video}
                onDeleteRequest={() => {
                    deleteTarget = still.id;
                    deleteDialogShown = true;
                }}
                bind:selected={() =>
                    selectedStills.find((member) => member === still.id)
                        ? true
                        : false,
                (s) => selectStill(still.id, s)}
            />
        {/each}
    </div>
    <div
        class="absolute w-full h-full left-0 top-0 pointer-events-none bg-black {fileDropping
            ? 'opacity-50'
            : 'opacity-0'} transition-opacity duration-300"
    ></div>
</section>
