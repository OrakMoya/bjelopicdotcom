<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import {
        BadgeXIcon,
        EyeIcon,
        ImageIcon,
        PlusIcon,
        TrashIcon,
    } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Tabs from "$lib/components/ui/tabs";
    import { useForm, router } from "@inertiajs/svelte";
    import { Textarea } from "$lib/components/ui/textarea";
    import { CalendarIcon } from "lucide-svelte";
    import * as Popover from "$lib/components/ui/popover";
    import { cn } from "$lib/utils";
    import { Link } from "@inertiajs/svelte";
    import {
        DateFormatter,
        getLocalTimeZone,
        parseDate,
    } from "@internationalized/date";
    import { Calendar } from "$lib/components/ui/calendar";
    import { AspectRatio } from "bits-ui";
    import * as Accordion from "$lib/components/ui/accordion";
    import * as Command from "$lib/components/ui/command";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { tick } from "svelte";
    import ExtendableCombobox from "$lib/components/ui/extendable-combobox/ExtendableCombobox.svelte";
    import VideoHour from "./VideoHour.svelte";
    import { fly, slide } from "svelte/transition";
    import { flip } from "svelte/animate";
    /** @import {GalleryVideoProps} from "$lib/types" */

    /**
     * @typedef {Object} Props
     * @property {GalleryVideoProps[]} videos
     * @property {string[]} collections
     * @property {{id: number; role: string;}[]} available_roles
     * @property {string[]} available_production_phases
     */

    /** @type {Props} */
    let { videos, collections, available_roles, available_production_phases } =
        $props();

    let new_video_dialog_open = $state(false);
    let collections_open = $state(false);
    let new_collection_open = $state(false);
    let new_collection_name = $state("");
    /**
     * @type {GalleryVideoProps | null}
     */
    let currently_edited_video = $state(null);
    let deleteVideoDialogOpen = $state(false);

    let new_video_form = useForm({
        /** @type {number|null} */ id: null,
        /** @type {string|null} */ title: null,
        /** @type {string|null} */ description: null,
        /** @type {string|null} */ subject: null,
        /** @type {string|null} */ poster: null,
        /** @type {boolean} */ poster_deleted: false,
        /** @type {string|null} */ preview: null,
        /** @type {boolean} */ preview_deleted: false,
        /** @type {string|null} */ thumbnail: null,
        /** @type {string|null} */ link: null,
        /** @type {any} */ publication_date: null,
        /** @type {string|null} */ collection: "",
        /** @type {string|null} */ category: null,
        /** @type {string[]} */ roles: [],
        /** @type {{phase: string|null; amount: number; unit: string}[]} */ video_hours:
            [],
    });

    const df = new DateFormatter("en-US", {
        dateStyle: "long",
    });

    function processSubmit() {
        let previous_date = $new_video_form.publication_date;
        if ($new_video_form.publication_date) {
            $new_video_form.publication_date =
                $new_video_form.publication_date.toString();
        }
        if (currently_edited_video) {
            $new_video_form
                .transform((/** @type {any} */ data) => ({
                    ...data,
                    _method: "patch",
                }))
                .post("/webtools/videos/" + currently_edited_video.id, {
                    onSuccess: () => (new_video_dialog_open = false),
                });
        } else {
            $new_video_form.post("/webtools/videos", {
                onSuccess: () => (new_video_dialog_open = false),
            });
        }
        $new_video_form.publication_date = previous_date;
    }

    function processDelete() {
        if (currently_edited_video) {
            router.delete("/webtools/videos/" + currently_edited_video.id, {
                onSuccess: () => {
                    deleteVideoDialogOpen = false;
                    new_video_dialog_open = false;
                },
            });
        }
    }

    let collectionPopoverOpen = $state(false);
    /** @type {HTMLButtonElement|null} */
    let triggerRef = $state(null);
    function closeAndFocusTrigger() {
        collectionPopoverOpen = false;
        tick().then(() => {
            triggerRef?.focus();
        });
    }

    /**
     * @param {number|null} id
     */
    function assignVideoFormValues(id) {
        $new_video_form.reset();
        if (id) {
            let video = videos.find((element) => element.id === id) ?? null;
            if (!video) {
                location.reload();
                return;
            }

            currently_edited_video = video;
            $new_video_form.id = video.id;
            $new_video_form.title = video.title;
            $new_video_form.description = video.description;
            $new_video_form.subject = video.subject;
            $new_video_form.link = video.link;
            $new_video_form.category = video.category;
            $new_video_form.publication_date = parseDate(
                video.publication_date,
            );
            $new_video_form.collection = video.collection;
            $new_video_form.roles = [...video.roles];
            $new_video_form.video_hours = [...video.video_hours];
        } else {
            currently_edited_video = null;
        }
        $new_video_form.poster = null;
        $new_video_form.poster_deleted = false;
        $new_video_form.preview = null;
        $new_video_form.preview_deleted = false;
        $new_video_form.thumbnail = null;
    }

    /**
     * @param {number} index
     */
    function nudgeVideoHourUp(index) {
        if (index < 1) return;
        [
            $new_video_form.video_hours[index - 1],
            $new_video_form.video_hours[index],
        ] = [
            $new_video_form.video_hours[index],
            $new_video_form.video_hours[index - 1],
        ];
    }

    /**
     * @param {number} index
     */
    function nudgeVideoHourDown(index) {
        if (index >= $new_video_form.video_hours.length - 1) return;
        [
            $new_video_form.video_hours[index + 1],
            $new_video_form.video_hours[index],
        ] = [
            $new_video_form.video_hours[index],
            $new_video_form.video_hours[index + 1],
        ];
    }
</script>

<svelte:head>
    <title>Videos - Webtools</title>
</svelte:head>

<main class="max-w-screen-xl mx-auto p-4 px-4 md:px-8 w-full overflow-scroll-y">
    <!-- New/edit video dialog -->
    <div class="flex justify-end">
        <Dialog.Root bind:open={new_video_dialog_open}>
            <form
                onsubmit={(e) => {
                    e.preventDefault();
                    processSubmit();
                }}
            >
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title class="text-2xl">
                            {#if $new_video_form.title}
                                {$new_video_form.title}
                            {:else}
                                New video
                            {/if}
                            {#if $new_video_form.publication_date}
                                <span class="text-bjelopic-blue-1"
                                    >({new Date(
                                        $new_video_form.publication_date,
                                    ).getFullYear()})</span
                                >
                            {/if}
                        </Dialog.Title>
                    </Dialog.Header>

                    <!-- Dialog Tabs -->
                    <Tabs.Root>
                        <Tabs.List class="grid grid-cols-3 w-full">
                            <Tabs.Trigger value="info">Info</Tabs.Trigger>
                            <Tabs.Trigger value="media">Media</Tabs.Trigger>
                            <Tabs.Trigger value="hours">Durations</Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content
                            value="hours"
                            class="overflow-y-scroll h-[450px]"
                        >
                            <div class="mt-2">
                                {#each $new_video_form.video_hours as hour, i (hour)}
                                    {@const banned_phases =
                                        $new_video_form.video_hours
                                            .map((el) => el.phase)
                                            .filter((el) =>
                                                el ? true : false,
                                            )}
                                    <div transition:slide class="mb-4" animate:flip={{duration: 300, delay: 1}}>
                                        <VideoHour
                                            onMoveUp={() => nudgeVideoHourUp(i)}
                                            onMoveDown={() =>
                                                nudgeVideoHourDown(i)}
                                            onDelete={() => {
                                                $new_video_form.video_hours =
                                                    $new_video_form.video_hours.toSpliced(
                                                        i,
                                                        1,
                                                    );
                                            }}
                                            onChange={({ phase }) => {
                                                if (
                                                    phase &&
                                                    !available_production_phases.find(
                                                        (p) => p === phase,
                                                    )
                                                ) {
                                                    available_production_phases =
                                                        [
                                                            ...available_production_phases,
                                                            phase,
                                                        ];
                                                }
                                            }}
                                            bind:phase={$new_video_form
                                                .video_hours[i].phase}
                                            bind:amount={$new_video_form
                                                .video_hours[i].amount}
                                            bind:unit={$new_video_form
                                                .video_hours[i].unit}
                                            {banned_phases}
                                            available_phases={available_production_phases.filter(
                                                (phase) => {
                                                    if (
                                                        phase ===
                                                        $new_video_form
                                                            .video_hours[i]
                                                            .phase
                                                    )
                                                        return true;
                                                    return !banned_phases.find(
                                                        (banned) =>
                                                            phase === banned,
                                                    );
                                                },
                                            )}
                                        />
                                    </div>
                                {/each}
                            </div>
                            <button
                                class="w-full flex justify-center px-4 py-2 bg-muted/50 hover:bg-muted rounded-md mt-4 transition-all"
                                onclick={() => {
                                    $new_video_form.video_hours.push({
                                        phase: null,
                                        amount: 1,
                                        unit: "hours",
                                    });
                                    $new_video_form.video_hours =
                                        $new_video_form.video_hours;
                                }}
                            >
                                <PlusIcon class="size-4 " />
                            </button>
                        </Tabs.Content>

                        <Tabs.Content
                            value="info"
                            class="h-[450px] overflow-y-scroll"
                        >
                            <Label for="new-video-title">Title*</Label>
                            <Input
                                id="new-video-title"
                                type="text"
                                required
                                bind:value={$new_video_form.title}
                            />

                            <Label for="new-video-description"
                                >Description</Label
                            >
                            <Textarea
                                id="new-video-description"
                                bind:value={$new_video_form.description}
                            />

                            <Label for="new-video-category">Category*</Label>
                            <Input
                                type="text"
                                id="new-video-category"
                                required
                                bind:value={$new_video_form.category}
                            />

                            <Label for="new-video-subject">Subject*</Label>
                            <Input
                                type="text"
                                id="new-video-subject"
                                required
                                bind:value={$new_video_form.subject}
                            />

                            <Label for="new-video-publication-date"
                                >Publication date*</Label
                            ><br />

                            <Popover.Root>
                                <Popover.Trigger
                                    id="new-video-publication-date"
                                >
                                    {#snippet child({ props })}
                                        <Button
                                            variant="outline"
                                            class={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !$new_video_form.publication_date &&
                                                    "text-muted-foreground",
                                            )}
                                            {...props}
                                        >
                                            <CalendarIcon
                                                class="mr-2 h-4 w-4"
                                            />
                                            {$new_video_form.publication_date
                                                ? df.format(
                                                      $new_video_form.publication_date.toDate(
                                                          getLocalTimeZone(),
                                                      ),
                                                  )
                                                : "Select a date"}
                                        </Button>
                                    {/snippet}
                                </Popover.Trigger>
                                <Popover.Content class="w-auto p-0">
                                    <Calendar
                                        type="single"
                                        bind:value={$new_video_form.publication_date}
                                        initialFocus
                                    />
                                </Popover.Content>
                            </Popover.Root>
                            <br />

                            <Label for="link">Link</Label>
                            <Input
                                type="text"
                                required
                                bind:value={$new_video_form.link}
                            />

                            <Accordion.Root type="multiple" class="mt-4">
                                <!-- Assign category -->
                                <Accordion.Item
                                    value="collections"
                                    class="border-0"
                                >
                                    <Accordion.Trigger class="py-2"
                                        >Collection</Accordion.Trigger
                                    >
                                    <Accordion.Content>
                                        <div
                                            class="flex gap-x-2 align-middle items-center"
                                        >
                                            <Popover.Root
                                                bind:open={collectionPopoverOpen}
                                            >
                                                <Popover.Trigger>
                                                    {#snippet child({ props })}
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={collections_open}
                                                            class="w-[222px] overflow-hidden justify-between {$new_video_form.collection
                                                                ? ''
                                                                : 'text-muted-foreground'}"
                                                            {...props}
                                                        >
                                                            {$new_video_form.collection
                                                                ? $new_video_form.collection
                                                                : "Select"}
                                                        </Button>
                                                    {/snippet}
                                                </Popover.Trigger>
                                                <Popover.Content
                                                    class="w-[222px] p-0"
                                                >
                                                    <Command.Root>
                                                        <Command.Input
                                                            placeholder="Search collections..."
                                                        />
                                                        <Command.Empty
                                                            >Collection not
                                                            found.</Command.Empty
                                                        >
                                                        <Command.Group>
                                                            {#each collections as collection}
                                                                <Command.Item
                                                                    value={collection}
                                                                    onSelect={() => {
                                                                        $new_video_form.collection =
                                                                            collection;
                                                                        closeAndFocusTrigger();
                                                                    }}
                                                                    >{collection}</Command.Item
                                                                >
                                                            {/each}
                                                        </Command.Group>
                                                    </Command.Root>
                                                </Popover.Content>
                                            </Popover.Root>
                                            {#if $new_video_form.collection}
                                                <Button
                                                    variant="destructive"
                                                    onclick={() =>
                                                        ($new_video_form.collection =
                                                            null)}
                                                    ><BadgeXIcon
                                                        class="w-4 h-4"
                                                    /></Button
                                                >
                                            {/if}

                                            <Popover.Root
                                                bind:open={new_collection_open}
                                            >
                                                <Popover.Trigger
                                                    bind:ref={triggerRef}
                                                >
                                                    {#snippet child({ props })}
                                                        <Button
                                                            variant="outline"
                                                            {...props}
                                                            ><PlusIcon
                                                                class="w-4 h-4"
                                                            /></Button
                                                        >
                                                    {/snippet}
                                                </Popover.Trigger>
                                                <Popover.Content
                                                    class="drop-shadow-md"
                                                >
                                                    <form
                                                        class="flex gap-x-2"
                                                        onsubmit={(e) => {
                                                            e.preventDefault();
                                                            collections.push(
                                                                new_collection_name,
                                                            );
                                                            new_collection_open = false;
                                                            $new_video_form.collection =
                                                                new_collection_name;
                                                            new_collection_name =
                                                                "";
                                                        }}
                                                    >
                                                        <Input
                                                            type="text"
                                                            bind:value={new_collection_name}
                                                        />
                                                        <Button
                                                            type="submit"
                                                            disabled={collections.find(
                                                                (element) =>
                                                                    element ===
                                                                    new_collection_name,
                                                            ) != undefined}
                                                            >Add</Button
                                                        >
                                                    </form>
                                                </Popover.Content>
                                            </Popover.Root>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>

                                <!-- Assign roles -->
                                <Accordion.Item value="roles" class="border-0">
                                    <Accordion.Trigger class="py-2"
                                        >Roles</Accordion.Trigger
                                    >
                                    <Accordion.Content>
                                        <div class="flex flex-col space-y-2">
                                            {#each available_roles as role}
                                                {@const checked =
                                                    $new_video_form.roles.includes(
                                                        role.role,
                                                    )}
                                                <div
                                                    class="flex gap-x-2 align-middle items-center"
                                                >
                                                    <Checkbox
                                                        {checked}
                                                        id="{role.id}-{role.role}"
                                                        onCheckedChange={(
                                                            v,
                                                        ) => {
                                                            if (v) {
                                                                $new_video_form.roles =
                                                                    [
                                                                        ...$new_video_form.roles,
                                                                        role.role,
                                                                    ];
                                                            } else
                                                                $new_video_form.roles =
                                                                    $new_video_form.roles.filter(
                                                                        (
                                                                            /** @type {string} */ item,
                                                                        ) =>
                                                                            item !==
                                                                            role.role,
                                                                    );
                                                        }}
                                                    />
                                                    <Label
                                                        class="hover:cursor-pointer"
                                                        for="{role.id}-{role.role}"
                                                    >
                                                        {role.role}
                                                    </Label>
                                                </div>
                                            {/each}
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                        </Tabs.Content>

                        <Tabs.Content
                            value="media"
                            class="h-[450px] overflow-x-clip overflow-y-scroll"
                        >
                            <Label for="new-video-thumbnail"
                                >Thumbnail (16:9)*</Label
                            >
                            <input
                                type="file"
                                class="hidden"
                                id="new-video-thumbnail"
                                required
                                accept="image/*"
                                oninput={(e) =>
                                    ($new_video_form.thumbnail =
                                        e.target.files[0])}
                            />
                            <label
                                for="new-video-thumbnail"
                                class="hover:brightness-110 transition"
                            >
                                <AspectRatio.Root
                                    ratio={16 / 9}
                                    class="bg-muted rounded-md overflow-clip"
                                >
                                    {#if $new_video_form.thumbnail || currently_edited_video}
                                        <img
                                            class="w-full h-full object-cover"
                                            src={currently_edited_video &&
                                            !$new_video_form.thumbnail
                                                ? currently_edited_video.thumbnail_url
                                                : URL.createObjectURL(
                                                      $new_video_form.thumbnail,
                                                  )}
                                            alt="New video thumbnail"
                                        />
                                    {/if}
                                </AspectRatio.Root>
                            </label>

                            <Label for="new-video-preview"
                                >Preview (.mp4, 16:9)</Label
                            >
                            <input
                                type="file"
                                class="hidden"
                                id="new-video-preview"
                                accept="video/mp4"
                                oninput={(e) =>
                                    ($new_video_form.preview =
                                        e.target.files[0])}
                            />
                            <label
                                for="new-video-preview"
                                class="md:hover:brightness-110 transition"
                            >
                                <AspectRatio.Root
                                    ratio={16 / 9}
                                    class="bg-muted rounded-md overflow-clip"
                                >
                                    {#if $new_video_form.preview || (currently_edited_video && currently_edited_video.preview_url && !$new_video_form.preview_deleted)}
                                        <div class="w-full h-full bg-black">
                                            <!-- svelte-ignore a11y_media_has_caption -->
                                            <video
                                                class="w-full h-full object-contain"
                                                src={currently_edited_video &&
                                                !$new_video_form.preview
                                                    ? currently_edited_video.preview_url
                                                    : URL.createObjectURL(
                                                          $new_video_form.preview,
                                                      )}
                                                controls
                                            ></video>
                                            <Button
                                                class="absolute top-0 left-0 m-2 opacity-25 md:hover:opacity-100 transition-opacity "
                                                onclick={(e) => {
                                                    $new_video_form.preview =
                                                        null;
                                                    $new_video_form.preview_deleted = true;
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                ><TrashIcon
                                                    class="w-4 h-4"
                                                /></Button
                                            >
                                        </div>
                                    {/if}
                                </AspectRatio.Root>
                            </label>

                            <Label for="new-video-poster"
                                >Poster (707:1000)</Label
                            >
                            <input
                                type="file"
                                class="hidden"
                                id="new-video-poster"
                                accept="image/*"
                                oninput={(e) =>
                                    ($new_video_form.poster =
                                        e.target.files[0])}
                            />
                            <label
                                for="new-video-poster"
                                class="md:hover:brightness-110 transition"
                            >
                                <AspectRatio.Root
                                    ratio={707 / 1000}
                                    class="bg-muted rounded-md overflow-clip"
                                >
                                    {#if $new_video_form.poster || (currently_edited_video && currently_edited_video.poster_url && !$new_video_form.poster_deleted)}
                                        <!-- svelte-ignore a11y_media_has_caption -->
                                        <img
                                            class="w-full h-full object-cover"
                                            src={currently_edited_video &&
                                            !$new_video_form.poster
                                                ? currently_edited_video.poster_url
                                                : URL.createObjectURL(
                                                      $new_video_form.poster,
                                                  )}
                                            alt="New video poster"
                                        />
                                        <Button
                                            class="absolute top-0 left-0 m-2 opacity-25 md:hover:opacity-100 transition-opacity"
                                            onclick={(e) => {
                                                $new_video_form.poster = null;
                                                $new_video_form.poster_deleted = true;
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            ><TrashIcon
                                                class="w-4 h-4"
                                            /></Button
                                        >
                                    {/if}
                                </AspectRatio.Root>
                            </label>
                        </Tabs.Content>
                    </Tabs.Root>

                    <Dialog.Footer>
                        <div
                            class="flex justify-between flex-row-reverse w-full"
                        >
                            <Button onclick={processSubmit}>Save</Button>
                            {#if currently_edited_video}
                                <div>
                                    <AlertDialog.Root
                                        bind:open={deleteVideoDialogOpen}
                                    >
                                        <AlertDialog.Trigger>
                                            {#snippet child({ props })}
                                                <Button
                                                    variant="destructive"
                                                    {...props}>Delete</Button
                                                >
                                            {/snippet}
                                        </AlertDialog.Trigger>
                                        <AlertDialog.Content>
                                            <AlertDialog.Header>
                                                <AlertDialog.Title
                                                    >Are you absolutely sure?</AlertDialog.Title
                                                >
                                            </AlertDialog.Header>
                                            <AlertDialog.Footer>
                                                <AlertDialog.Cancel
                                                    >Cancel</AlertDialog.Cancel
                                                >
                                                <AlertDialog.Action
                                                    type="button"
                                                    onclick={processDelete}
                                                    class="bg-destructive text-destructive-foreground hover:bg-destructive hover:brightness-90 transition"
                                                >
                                                    Delete
                                                </AlertDialog.Action>
                                            </AlertDialog.Footer>
                                        </AlertDialog.Content>
                                    </AlertDialog.Root>
                                </div>
                            {/if}
                        </div>
                    </Dialog.Footer>
                </Dialog.Content>
            </form>
        </Dialog.Root>
    </div>
    <div
        class="grid grid-cols-1 max-w-[450px] mx-auto md:max-w-none md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-6 w-full"
    >
        <button
            class="bg-bjelopic-neutral-8 w-full h-full rounded-md overflow-clip text-neutral-500 hover:text-white transition-colors"
            onclick={() => {
                assignVideoFormValues(null);
                new_video_dialog_open = true;
            }}
        >
            <AspectRatio.Root ratio={2.35}>
                <div class=" w-full h-full flex justify-center items-center">
                    <PlusIcon class="w-12 h-12" />
                </div>
            </AspectRatio.Root>
        </button>
        {#each videos as video}
            <button
                class="text-left"
                onclick={() => {
                    assignVideoFormValues(video.id);
                    new_video_dialog_open = true;
                }}
            >
                <div
                    class="flex flex-col box-content w-full rounded-md overflow-clip md:hover:scale-[101%] transition-all duration-500 md:hover:drop-shadow-glow-md hover:z-10 border border-neutral-800"
                >
                    <AspectRatio.Root ratio={16 / 9} class="overflow-clip">
                        <img
                            class="w-full h-full object-cover"
                            src={video.thumbnail_url}
                            alt="{video.title} thumbnail"
                        />
                    </AspectRatio.Root>
                    <div class="px-2 py-1 md:py-2 bg-neutral-900 border-t-0">
                        <span
                            class="text-lg md:text-xl block w-full whitespace-nowrap overflow-hidden text-ellipsis"
                            >{video.title}</span
                        >
                        <div
                            class="flex justify-between items-center align-middle"
                        >
                            <span class="text-neutral-500"
                                >{video.subject} ({new Date(
                                    video.publication_date,
                                ).getFullYear()})</span
                            >
                            <div class="flex gap-2 align-middle">
                                <a
                                    href={video.link}
                                    target="_blank"
                                    onclick={(e) => e.stopPropagation()}
                                    class="mr-1"
                                    ><EyeIcon
                                        class="w-6 h-6 text-neutral-500 hover:text-white transition"
                                    /></a
                                >
                                <Link
                                    as="button"
                                    onclick={(/**@type {MouseEvent} */ e) => {
                                        e.stopPropagation();
                                    }}
                                    href={"/webtools/videos/" +
                                        video.id +
                                        "/stills"}
                                    ><ImageIcon
                                        class="w-6 h-6 text-neutral-500 hover:text-white transition"
                                    /></Link
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        {/each}
    </div>
</main>
