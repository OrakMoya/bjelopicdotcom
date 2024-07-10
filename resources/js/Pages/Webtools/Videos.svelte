<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import {
        BadgeXIcon,
        CrossIcon,
        PencilIcon,
        PlusIcon,
        TrashIcon,
    } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Tabs from "$lib/components/ui/tabs";
    import { useForm } from "@inertiajs/svelte";
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
    import { document } from "postcss";

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
    });

    let collections = [
        {
            name: "DokuART Najavne Špice",
        },
    ];

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
    function deleteVideo() {}

    function closeAndFocusTrigger(triggerId) {
        collections_open = false;
        tick().then(() => {
            document.getElementById(triggerId)?.focus();
        });
    }

    function assignVideoFormValues(id) {
        console.log(id);
        if (id) {
            let video = videos.find((element) => element.id === id);
            currently_edited_video = video;
            $new_video_form.id = video.id;
            $new_video_form.title = video.title;
            $new_video_form.description = video.description;
            $new_video_form.subject = video.subject;
            $new_video_form.link = video.link;
            $new_video_form.publication_date = parseDate(
                video.publication_date,
            );
            $new_video_form.collection = video.collection;
        } else {
            currently_edited_video = null;
            $new_video_form.id = null;
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
</script>

<main class="max-w-screen-lg mx-auto p-4">
    <div class="flex justify-end mb-4">
        <Dialog.Root bind:open={new_video_dialog_open}>
            <Dialog.Trigger class="px-2 py-2" asChild let:builder>
                <Button
                    builders={[builder]}
                    on:click={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        assignVideoFormValues(null);
                    }}
                >
                    <PlusIcon class="w-4 h-4" />
                </Button>
            </Dialog.Trigger>
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
                        <Tabs.Content value="info">
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
                                                        class="w-[280px] justify-between {$new_video_form.collection
                                                            ? ''
                                                            : 'text-muted-foreground'}"
                                                    >
                                                        {$new_video_form.collection
                                                            ? $new_video_form.collection
                                                            : "Select"}
                                                    </Button>
                                                </Popover.Trigger>
                                                <Popover.Content
                                                    class="w-[280px] p-0"
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
                                                                    value={collection.name}
                                                                    onSelect={(
                                                                        currentValue,
                                                                    ) => {
                                                                        $new_video_form.collection =
                                                                            currentValue;
                                                                        closeAndFocusTrigger(
                                                                            ids.trigger,
                                                                        );
                                                                    }}
                                                                    >{collection.name}</Command.Item
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
                                                        variant="ghost"
                                                        builders={[builder]}
                                                        ><PlusIcon
                                                            class="w-4 h-4"
                                                        /></Button
                                                    >
                                                </Popover.Trigger>
                                                <Popover.Content>
                                                    <form
                                                        class="flex gap-x-2"
                                                        disabled={collections.find(
                                                            (element) =>
                                                                element.name ===
                                                                new_collection_name,
                                                        )}
                                                        on:submit|preventDefault={() => {
                                                            collections.push({
                                                                name: new_collection_name,
                                                            });
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
                                                                    element.name ===
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

                        <Tabs.Content value="media">
                            <ScrollArea class="h-[500px]">
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
                                    class="hover:brightness-110 transition"
                                >
                                    <AspectRatio.Root
                                        ratio={16 / 9}
                                        class="bg-muted rounded-md overflow-clip"
                                    >
                                        {#if $new_video_form.preview || (currently_edited_video && currently_edited_video.preview_path)}
                                            <Button
                                                class="absolute top-0 left-0 m-2 opacity-25 hover:opacity-100 transition-opacity"
                                                on:click={(e) => {
                                                    $new_video_form.preview =
                                                        null;
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
                                    class="hover:brightness-110 transition"
                                >
                                    <AspectRatio.Root
                                        ratio={707 / 1000}
                                        class="bg-muted rounded-md overflow-clip"
                                    >
                                        {#if $new_video_form.poster || (currently_edited_video && currently_edited_video.poster_path)}
                                            <Button
                                                class="absolute top-0 left-0 m-2 opacity-25 hover:opacity-100 transition-opacity"
                                                on:click={(e) => {
                                                    $new_video_form.poster =
                                                        null;
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
                            </ScrollArea>
                        </Tabs.Content>
                    </Tabs.Root>
                    <Dialog.Footer>
                        <div class="flex justify-between flex-row-reverse">
                            <Button on:click={processSubmit}>Save</Button>
                            {#if currently_edited_video}
                                <Button
                                    on:click={deleteVideo}
                                    variant="destructive">Delete</Button
                                >
                            {/if}
                        </div>
                    </Dialog.Footer>
                </Dialog.Content>
            </form>
        </Dialog.Root>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
        {#each videos as video}
            <div
                class="flex flex-col box-content w-full rounded-t-md overflow-clip hover:scale-[101%] transition duration-500 hover:drop-shadow-glow hover:z-10"
            >
                <img src={video.thumbnail_path} alt="{video.title} thumbnail" />
                <div
                    class="px-2 py-1 border rounded-b-md border-neutral-800 bg-neutral-900 border-t-0"
                >
                    <span
                        class="text-lg block w-full text-nowrap overflow-hidden text-ellipsis"
                        >{video.title}</span
                    >
                    <div class="flex justify-between items-center align-middle">
                        <span class="text-neutral-500"
                            >{video.subject} ({new Date(
                                video.publication_date,
                            ).getFullYear()})</span
                        >
                        <button
                            class="p-0"
                            on:click={() => {
                                assignVideoFormValues(video.id);
                                new_video_dialog_open = true;
                            }}
                            ><PencilIcon
                                class="w-4 h-4 text-neutral-500 hover:text-white transition"
                            /></button
                        >
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>
