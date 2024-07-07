<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { PlusIcon, TrashIcon } from "lucide-svelte";
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
    import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
    import { Calendar } from "$lib/components/ui/calendar";
    import { AspectRatio } from "bits-ui";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import * as Card from "$lib/components/ui/card";

    let new_video_form = useForm({
        title: null,
        description: null,
        subject: null,
        poster: null,
        preview: null,
        thumbnail: null,
        link: null,
        publication_date: null,
    });

    const df = new DateFormatter("en-US", {
        dateStyle: "long",
    });

    let current_tab = "info";

    $: console.log(current_tab);

    function processSubmit() {
        let previous_date = $new_video_form.publication_date;
        $new_video_form.publication_date =
            $new_video_form.publication_date.toDate();
        $new_video_form.post("/webtools/videos/create");
        $new_video_form.publication_date = previous_date;
    }

    export let videos;
</script>

<main class="max-w-screen-lg mx-auto p-4">
    <div class="flex justify-end">
        <Dialog.Root>
            <Dialog.Trigger class="px-2 py-2" asChild let:builder>
                <Button builders={[builder]}>
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

                    <Tabs.Root bind:value={current_tab}>
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
                        </Tabs.Content>
                        <Tabs.Content value="media">
                            <ScrollArea class="h-[500px]">
                                <Label for="new-video-thumbnail"
                                    >Thumbnail*</Label
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
                                        {#if $new_video_form.thumbnail}
                                            <img
                                                src={URL.createObjectURL(
                                                    $new_video_form.thumbnail,
                                                )}
                                                alt="New video thumbnail"
                                            />
                                        {/if}
                                    </AspectRatio.Root>
                                </label>

                                <Label for="new-video-preview">Preview</Label>
                                <input
                                    type="file"
                                    class="hidden"
                                    id="new-video-preview"
                                    accept="video/*"
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
                                        {#if $new_video_form.preview}
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
                                                src={URL.createObjectURL(
                                                    $new_video_form.preview,
                                                )}
                                                alt="New video thumbnail"
                                                controls
                                            />
                                        {/if}
                                    </AspectRatio.Root>
                                </label>
                                <Label for="new-video-poster">Poster</Label>
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
                                        {#if $new_video_form.poster}
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
                                                src={URL.createObjectURL(
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
                        <Button on:click={processSubmit}>Save</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </form>
        </Dialog.Root>
    </div>
    <div class="flex flex-wrap">
        {#each videos as video}
            <Card.Root>
                <Card.Content>
                    <img src="{video.thumbnail_path}" />
                    {video.title}
                </Card.Content>
            </Card.Root>
        {/each}
    </div>
</main>
