<!-- @migration-task Error while migrating Svelte code: Cannot read properties of undefined (reading 'end') -->
<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import * as Table from "$lib/components/ui/table";
    import { Button } from "$lib/components/ui/button";
    import { CopyIcon, TrashIcon } from "lucide-svelte";
    import { router } from "@inertiajs/svelte";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { toast } from "svelte-sonner";
    import TemporaryUploadDialog from "./TemporaryUploadDialog.svelte";
    import { page } from "@inertiajs/svelte";

    let innerWidth = 0;
    let delete_temporary_upload_dialog_open = false;

    export let temporary_uploads;

    let delete_candidate_temporary_upload_id = -1;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
    <title>Uploads - Webtools</title>
</svelte:head>

<main class="max-w-screen-xl mx-auto p-4">
    {#key $page}
        <TemporaryUploadDialog />
    {/key}
    <AlertDialog.Root bind:open={delete_temporary_upload_dialog_open}>
        <AlertDialog.Trigger></AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Header>
                <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            </AlertDialog.Header>
            <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <Button
                    onclick={() =>
                        router.visit("/webtools/uploads/" + delete_candidate_temporary_upload_id, {
                            method: "delete",
                            onSuccess: () =>
                                (delete_temporary_upload_dialog_open = false),
                        })}
                    variant="destructive">Delete</Button
                >
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog.Root>

    <section class="border border-neutral-800 rounded-xl overflow-clip">
        <Table.Root>
            {#if temporary_uploads.length === 0}
                <Table.Caption class="mb-3">Empty...</Table.Caption>
            {/if}
            <Table.Header>
                <Table.Row>
                    <Table.Head>User</Table.Head>
                    <Table.Head>File name</Table.Head>
                    <Table.Head>Link</Table.Head>
                    <Table.Head>Expires on</Table.Head>
                    <Table.Head class="w-8"></Table.Head>
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
                                    let full_url =
                                        protocol +
                                        "//" +
                                        host +
                                        "/f/" +
                                        upload.sqid;
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
                            <Button
                                onclick={() => {
                                    delete_candidate_temporary_upload_id = upload.id;
                                    delete_temporary_upload_dialog_open = true;
                                }}
                                variant="ghost"
                                class="text-red-500"
                            >
                                <TrashIcon class="w-4 h-4" />
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </section>
</main>
