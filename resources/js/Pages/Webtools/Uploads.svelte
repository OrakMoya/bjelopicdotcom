<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import * as Table from "$lib/components/ui/table";
    import { Button } from "$lib/components/ui/button";
    import { CopyIcon, PlusIcon, TrashIcon } from "lucide-svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import { Link, useForm, router } from "@inertiajs/svelte";
    import { Input } from "$lib/components/ui/input";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { toast } from "svelte-sonner";
    import DatePicker from "$lib/components/ui/datepicker/DatePicker.svelte";
    import { Label } from "$lib/components/ui/label";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import {
        CalendarDate,
        getLocalTimeZone,
        today,
    } from "@internationalized/date";
    /**
     * @typedef {import ('@internationalized/date').DateValue} DateValue
     */

    let new_temporary_upload_dialog_open = false;
    let delete_temporary_upload_dialog_open = false;
    let screensize_md = 768;
    let innerWidth = 0;
    let form = useForm({
        file: null,
        expiry_date: today(getLocalTimeZone()).add({ days: 1 }),
        expiry_hours: 12,
        expiry_minutes: 0,
        expiry_seconds: 0,
        expires: true,
    });

    function processUpload() {
        $form
            .transform((data) => ({
                ...data,
                expiry_date: data.expiry_date.toString(),
            }))
            .post("/webtools/uploads", {
                preserveState: true,
                onSuccess: () => {
                    $form.reset();
                    new_temporary_upload_dialog_open = false;
                },
            });
    }

    export let temporary_uploads;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
    <title>Uploads - Webtools</title>
</svelte:head>

<main class="max-w-screen-xl mx-auto p-4">
    <Dialog.Root bind:open={new_temporary_upload_dialog_open}>
        <Dialog.Content class="text-white">
            <Dialog.Header>
                <Dialog.Title>Upload</Dialog.Title>
            </Dialog.Header>
            <form
                on:submit|preventDefault={processUpload}
                class="flex flex-col gap-y-2"
            >
                <Input
                    class="mb-2"
                    type="file"
                    required
                    on:input={(e) => ($form.file = e.target.files[0])}
                />

                <div class="flex items-center gap-x-2 text-sm">
                    <Checkbox bind:checked={$form.expires} id="expires" />
                    <Label for="expires">
                        {#if $form.expires}
                            <span>Expires on</span>
                        {:else}
                            <span>Never expires</span>
                        {/if}
                    </Label>
                </div>
                <div
                    class="flex flex-wrap sm:items-center gap-y-2 gap-x-2 w-full sm:w-fit {$form.expires
                        ? ''
                        : 'text-neutral-500'}"
                >
                    <DatePicker
                        bind:value={$form.expiry_date}
                        disabled={!$form.expires}
                    />
                    <div class="flex items-center gap-x-2 ">
                        <span
                            class={$form.expiry_date ? "" : "text-neutral-500"}
                            >@</span
                        >
                        <Input
                            class="w-20"
                            type="number"
                            bind:value={$form.expiry_hours}
                            readonly={!$form.expires || !$form.expiry_date}
                            on:input={() => {
                                $form.expiry_hours = Math.min(
                                    Math.max($form.expiry_hours, 0),
                                    23,
                                );
                            }}
                        />
                        <span
                            class={$form.expiry_date ? "" : "text-neutral-500"}
                            >hours</span
                        >
                    </div>
                </div>

                <Dialog.Footer class="mt-3">
                    <div class="flex gap-4">
                        <Button
                            variant="destructive"
                            on:click={() =>
                                (new_temporary_upload_dialog_open = false)}
                            >Cancel</Button
                        >
                        <Button type="submit" disabled={$form.processing}
                            >Upload</Button
                        >
                    </div>
                </Dialog.Footer>
            </form>
        </Dialog.Content>
    </Dialog.Root>

    <section class="border border-neutral-800 rounded-xl overflow-clip">
        <Table.Root>
            {#if temporary_uploads.length === 0}
                <Table.Caption>Empty...</Table.Caption>
            {/if}
            <Table.Header>
                <Table.Row>
                    <Table.Head>User</Table.Head>
                    <Table.Head>File name</Table.Head>
                    <Table.Head>Link</Table.Head>
                    <Table.Head>Expires on</Table.Head>
                    <Table.Head class="w-8 text-white">
                        <Button
                            on:click={() =>
                                (new_temporary_upload_dialog_open = true)}
                            variant="ghost"
                        >
                            <PlusIcon class="w-4 h-4" />
                        </Button>
                    </Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each temporary_uploads as upload}
                    <Table.Row>
                        <Table.Cell>{upload.user.name}</Table.Cell>
                        <Table.Cell>{upload.original_name}</Table.Cell>
                        <Table.Cell>
                            <button
                                class="p-2 hover:text-neutral-400 transition duration-200"
                                on:click={() => {
                                    let protocol = window.location.protocol;
                                    let host = window.location.host;
                                    let full_url = protocol + "//" + host + "/f/" + upload.sqid;
                                    navigator.clipboard.writeText(full_url);
                                    toast("Copied!");
                                }}
                            >
                                <CopyIcon class="w-5 h-5" />
                            </button>
                        </Table.Cell>
                        <Table.Cell>
                            {#if upload.expiry_datetime}
                                {upload.expiry_datetime}
                            {:else}
                                Never
                            {/if}
                        </Table.Cell>
                        <Table.Cell>
                            <AlertDialog.Root
                                bind:open={delete_temporary_upload_dialog_open}
                            >
                                <AlertDialog.Trigger asChild let:builder>
                                    <Button
                                        builders={[builder]}
                                        variant="ghost"
                                        class="text-red-500"
                                    >
                                        <TrashIcon class="w-4 h-4" />
                                    </Button>
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
                                        <Button
                                            on:click={() =>
                                                router.visit(
                                                    "/webtools/uploads/" +
                                                        upload.id,
                                                    {
                                                        method: "delete",
                                                        onSuccess: () =>
                                                            (delete_temporary_upload_dialog_open = false),
                                                    },
                                                )}
                                            variant="destructive">Delete</Button
                                        >
                                    </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog.Root>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </section>
</main>
