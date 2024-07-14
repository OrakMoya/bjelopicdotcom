<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import {
        BadgeXIcon,
        CrossIcon,
        EyeIcon,
        PencilIcon,
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
    import {
        DateFormatter,
        getLocalTimeZone,
        parseDate,
    } from "@internationalized/date";
    import { Calendar } from "$lib/components/ui/calendar";
    import { AspectRatio } from "bits-ui";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import * as Accordion from "$lib/components/ui/accordion";
    import * as Command from "$lib/components/ui/command";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";

    let new_video_form = useForm({
        id: null,
        title: null,
        description: null,
        subject: null,
        poster: null,
        preview: null,
        thumbnail: null,
        link: null,
        publication_date: null,
        collection: "",
        category: null,
    });

    export let collections;

    const df = new DateFormatter("en-US", {
        dateStyle: "long",
    });

    function processSubmit() {
        let previous_date = $new_video_form.publication_date;
        $new_video_form.publication_date =
            $new_video_form.publication_date.toString();
        if (currently_edited_video) {
            $new_video_form.post("/webtools/videos/update", {
                onSuccess: () => (new_video_dialog_open = false),
            });
        } else {
            $new_video_form.post("/webtools/videos/create", {
                onSuccess: () => (new_video_dialog_open = false),
            });
        }
        $new_video_form.publication_date = previous_date;
    }
    function deleteVideo(id) {
        router.visit("/webtools/videos/delete", {
            method: "post",
            data: {
                id: id,
            },
            onSuccess: () => {
                deleteVideoDialogOpen = false;
                new_video_dialog_open = false;
            },
        });
    }

    function closeAndFocusTrigger(triggerId) {
        collections_open = false;
        tick().then(() => {
            document.getElementById(triggerId)?.focus();
        });
    }

    function assignVideoFormValues(id) {
        if (id) {
            let video = videos.find((element) => element.id === id);
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
        } else {
            currently_edited_video = null;
            $new_video_form.id = null;
            $new_video_form.category = null;
            $new_video_form.title = null;
            $new_video_form.description = null;
            $new_video_form.subject = null;
            $new_video_form.link = null;
            $new_video_form.publication_date = null;
            $new_video_form.collection = null;
        }
        $new_video_form.poster = null;
        $new_video_form.preview = null;
        $new_video_form.thumbnail = null;
    }

    export let videos;
    let new_video_dialog_open = false;
    let collections_open = false;
    let new_collection_open = false;
    let new_collection_name;
    let currently_edited_video;
    let deleteVideoDialogOpen = false;
</script>

<main class="max-w-screen-xl mx-auto p-4 px-4 md:px-8 w-full overflow-scroll-y">
    <div class="flex justify-end">
        <Dialog.Root bind:open={new_video_dialog_open}>
            <form on:submit|preventDefault={processSubmit}>
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

                    <Tabs.Root>
                        <Tabs.List class="grid grid-cols-2 w-full">
                            <Tabs.Trigger value="info">Info</Tabs.Trigger>
                            <Tabs.Trigger value="media">Media</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content
                            value="info"
                            class="h-[450px] overflow-x-clip overflow-y-scroll"
                        >
                            <Label for="new-video-title">Title*</Label>
                            <Input
                                id="new-video-title"
                                type="text"
                                required
                                bind:value={$new_video_form.title}
                            />

                            <Label for="new-video-description"
                                >Description*</Label
                            >
                            <Textarea
                                id="new-video-description"
                                required
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

                            <Popover.Root openFocus>
                                <Popover.Trigger asChild let:builder>
                                    <Button
                                        variant="outline"
                                        class={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !$new_video_form.publication_date &&
                                                "text-muted-foreground",
                                        )}
                                        id="new-video-publication-date"
                                        builders={[builder]}
                                    >
                                        <CalendarIcon class="mr-2 h-4 w-4" />
                                        {$new_video_form.publication_date
                                            ? df.format(
                                                  $new_video_form.publication_date.toDate(
                                                      getLocalTimeZone(),
                                                  ),
                                              )
                                            : "Select a date"}
                                    </Button>
                                </Popover.Trigger>
                                <Popover.Content class="w-auto p-0">
                                    <Calendar
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

                            <Accordion.Root>
                                <Accordion.Item
                                    value="collections"
                                    class="border-0"
                                >
                                    <Accordion.Trigger
                                        >Collection</Accordion.Trigger
                                    >
                                    <Accordion.Content>
                                        <div
                                            class="flex gap-x-2 align-middle items-center"
                                        >
                                            <Popover.Root
                                                bind:open={collections_open}
                                                let:ids
                                            >
                                                <Popover.Trigger
                                                    asChild
                                                    let:builder
                                                >
                                                    <Button
                                                        builders={[builder]}
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={collections_open}
                                                        class="w-[222px] overflow-hidden justify-between {$new_video_form.collection
                                                            ? ''
                                                            : 'text-muted-foreground'}"
                                                    >
                                                        {$new_video_form.collection
                                                            ? $new_video_form.collection
                                                            : "Select"}
                                                    </Button>
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
                                                                    onSelect={(
                                                                        currentValue,
                                                                    ) => {
                                                                        $new_video_form.collection =
                                                                            currentValue;
                                                                        closeAndFocusTrigger(
                                                                            ids.trigger,
                                                                        );
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
                                                    on:click={() =>
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
                                                    asChild
                                                    let:builder
                                                >
                                                    <Button
                                                        variant="outline"
                                                        builders={[builder]}
                                                        ><PlusIcon
                                                            class="w-4 h-4"
                                                        /></Button
                                                    >
                                                </Popover.Trigger>
                                                <Popover.Content
                                                    class="drop-shadow-md"
                                                >
                                                    <form
                                                        class="flex gap-x-2"
                                                        disabled={collections.find(
                                                            (element) =>
                                                                element ===
                                                                new_collection_name,
                                                        )}
                                                        on:submit|preventDefault={() => {
                                                            collections.push(
                                                                new_collection_name,
                                                            );
                                                            new_collection_open = false;
                                                            $new_video_form.collection =
                                                                new_collection_name;
                                                            new_collection_name =
                                                                null;
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
                                                            )}>Add</Button
                                                        >
                                                    </form>
                                                </Popover.Content>
                                            </Popover.Root>
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
                                on:input={(e) =>
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
                                            src={currently_edited_video &&
                                            !$new_video_form.thumbnail
                                                ? currently_edited_video.thumbnail_path
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
                                on:input={(e) =>
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
                                    {#if $new_video_form.preview || (currently_edited_video && currently_edited_video.preview_path)}
                                        <Button
                                            class="absolute top-0 left-0 m-2 opacity-25 md:hover:opacity-100 transition-opacity"
                                            on:click={(e) => {
                                                $new_video_form.preview = null;
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            ><TrashIcon
                                                class="w-4 h-4"
                                            /></Button
                                        >
                                        <!-- svelte-ignore a11y-media-has-caption -->
                                        <video
                                            class="w-full h-full object-contain"
                                            src={currently_edited_video &&
                                            !$new_video_form.preview
                                                ? currently_edited_video.preview_path
                                                : URL.createObjectURL(
                                                      $new_video_form.preview,
                                                  )}
                                            alt="New video thumbnail"
                                            controls
                                        />
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
                                on:input={(e) =>
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
                                    {#if $new_video_form.poster || (currently_edited_video && currently_edited_video.poster_path)}
                                        <Button
                                            class="absolute top-0 left-0 m-2 opacity-25 md:hover:opacity-100 transition-opacity"
                                            on:click={(e) => {
                                                $new_video_form.poster = null;
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            ><TrashIcon
                                                class="w-4 h-4"
                                            /></Button
                                        >
                                        <!-- svelte-ignore a11y-media-has-caption -->
                                        <img
                                            class="w-full h-full object-cover"
                                            src={currently_edited_video &&
                                            !$new_video_form.poster
                                                ? currently_edited_video.poster_path
                                                : URL.createObjectURL(
                                                      $new_video_form.poster,
                                                  )}
                                            alt="New video poster"
                                        />
                                    {/if}
                                </AspectRatio.Root>
                            </label>
                        </Tabs.Content>
                    </Tabs.Root>
                    <Dialog.Footer>
                        <div
                            class="flex justify-between flex-row-reverse w-full"
                        >
                            <Button on:click={processSubmit}>Save</Button>
                            {#if currently_edited_video}
                                <div>
                                    <AlertDialog.Root
                                        bind:open={deleteVideoDialogOpen}
                                    >
                                        <AlertDialog.Trigger
                                            asChild
                                            let:builder
                                        >
                                            <Button
                                                builders={[builder]}
                                                variant="destructive"
                                                >Delete</Button
                                            >
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
                                                    asChild
                                                    let:builder
                                                >
                                                    <Button
                                                        on:click={() =>
                                                            deleteVideo(
                                                                currently_edited_video.id,
                                                            )}
                                                        builders={[builder]}
                                                        variant="destructive"
                                                        >Delete</Button
                                                    ></AlertDialog.Action
                                                >
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
            on:click={() => {
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
                on:click={() => {
                    assignVideoFormValues(video.id);
                    new_video_dialog_open = true;
                }}
            >
                <div
                    class="flex flex-col box-content w-full rounded-t-md overflow-clip md:hover:scale-[101%] transition duration-500 md:hover:drop-shadow-glow hover:z-10"
                >
                    <AspectRatio.Root ratio={16 / 9}>
                        <img
                            src={video.thumbnail_path}
                            alt="{video.title} thumbnail"
                        />
                    </AspectRatio.Root>
                    <div
                        class="px-2 py-1 md:py-2 border rounded-b-md border-neutral-800 bg-neutral-900 border-t-0"
                    >
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
                            <a
                                href={video.link}
                                target="_blank"
                                on:click|stopPropagation={() => {}}
                                class="mr-1"
                                ><EyeIcon
                                    class="w-6 h-6 text-neutral-500 hover:text-white transition"
                                /></a
                            >
                        </div>
                    </div>
                </div>
            </button>
        {/each}
    </div>
</main>
