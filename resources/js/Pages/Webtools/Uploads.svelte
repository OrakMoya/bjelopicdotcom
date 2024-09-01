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
    import {toast} from "svelte-sonner";

    let open = false;
    let screensize_md = 768;
    let innerWidth = 0;
    let form = useForm({
        file: null,
        expiry_datetime: null,
    });

    function processUpload() {
        $form.post("/webtools/uploads");
        open = false;
    }

    export let uploads;
    console.log(uploads);
</script>

<svelte:window bind:innerWidth />

<main class="max-w-screen-xl mx-auto p-4">
    <Dialog.Root bind:open>
        <Dialog.Content class="text-white">
            <Dialog.Header>
                <Dialog.Title>Upload</Dialog.Title>
            </Dialog.Header>

            <Input
                type="file"
                required
                on:input={(e) => ($form.file = e.target.files[0])}
            />

            <Dialog.Footer>
                <div class="flex gap-4">
                    <Button
                        variant="destructive"
                        on:click={() => (open = false)}>Cancel</Button
                    >
                    <Button on:click={processUpload}>Upload</Button>
                </div>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
    <section class="border border-neutral-800 rounded-xl overflow-clip">
        <Table.Root>
            {#if uploads.length === 0}
                <Table.Caption>Empty...</Table.Caption>
            {/if}
            <Table.Header>
                <Table.Row>
                    <Table.Head>User</Table.Head>
                    <Table.Head>File name</Table.Head>
                    <Table.Head>Link</Table.Head>
                    <Table.Head>Expires on</Table.Head>
                    <Table.Head class="w-8 text-white">
                        <Button on:click={() => (open = true)} variant="ghost">
                            <PlusIcon class="w-4 h-4" />
                        </Button>
                    </Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each uploads as upload}
                    <Table.Row>
                        <Table.Cell>{upload.user.name}</Table.Cell>
                        <Table.Cell>{upload.original_name}</Table.Cell>
                        <Table.Cell
                        >
                            <button class="p-2 hover:text-neutral-400 transition duration-200" on:click={()=>{
                                let host = window.location.host;
                                let full_url = host + "/f/"+upload.sqid;
                                navigator.clipboard.writeText(full_url);
                                toast("Copied!");
                            }}>
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
                            <AlertDialog.Root>
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
                                        <AlertDialog.Action asChild let:builder>
                                            <Button
                                                builders={[builder]}
                                                on:click={() =>
                                                    router.visit(
                                                        "/webtools/uploads/" +
                                                            upload.id,
                                                        {
                                                            method: "delete",
                                                        },
                                                    )}
                                                variant="destructive"
                                                >Delete</Button
                                            >
                                        </AlertDialog.Action>
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
