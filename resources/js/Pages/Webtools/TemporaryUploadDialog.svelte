<script>
    import { preventDefault } from "svelte/legacy";

    import Resumable from "resumablejs";
    import { router, page } from "@inertiajs/svelte";
    import DatePicker from "$lib/components/ui/datepicker/DatePicker.svelte";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { toast } from "svelte-sonner";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";
    import * as Dialog from "$lib/components/ui/dialog";
    import { flushSync } from "svelte";
    /** @import {CalendarDate, DateValue} from "@internationalized/date" */

    const csrf_token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");
    const headers = new Headers();
    const screensize_md = 768;

    let innerWidth = $state(0);

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    if (csrf_token) {
        headers.append("X-CSRF-TOKEN", csrf_token);
    }

    let formData = $state({
        /** @type {string | CalendarDate | DateValue} */
        expiry_date: today(getLocalTimeZone()).add({ days: 1 }),
        expiry_hours: 12,
        expiry_minutes: 0,
        expiry_seconds: 0,
        expires: true,
        /** @type {?string} */
        resumable_identifier: null,
    });

    let resumable = new Resumable({
        target: "/webtools/uploads/upload",
        query: {
            _token: csrf_token ?? "",
            temporaryUploadId: null,
        },
        chunkSize: 10 * 1024 * 1024,
    });

    /**
     * @type {Resumable.ResumableFile[]}
     */
    let files = $state([]);
    resumable.files = files;

    let progress = $state(0.0);
    let uploading = $state(false);

    /**
     * @param {SubmitEvent} e
     */
    async function processSubmit(e) {
        e.preventDefault();
        let processedFormData = formData;

        processedFormData.expiry_date =
            processedFormData.expiry_date.toString();
        if (resumable.files.length)
            processedFormData.resumable_identifier =
                resumable.files[0].uniqueIdentifier;

        const result = await fetch("/webtools/uploads", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: headers,
        });
        const response = await result.json();
        if (typeof response === "number") {
            // @ts-ignore
            resumable.opts.query.temporaryUploadId = response;
            resumable.opts.target += "/" + response;

            resumable.on("complete", () => {
                toast.success("Done!");
                router.reload();
            });
            resumable.on("progress", () => {
                progress = resumable.progress();
            });
            resumable.on("uploadStart", () => (uploading = true));
            resumable.upload();
            dialogOpen = false;
        } else {
            toast.error(response.message);
        }
    }

    let dialogOpen = $state(false);

    $effect(() => {
        $inspect(files);
    });
</script>

<svelte:window bind:innerWidth />

<div class="flex flex-col">
    <input
        type="file"
        class="hidden"
        id="file-input-field"
        onchange={(e) => {
            let target = /** @type {HTMLInputElement}*/ (e.target);
            if (!target.files) return;
            resumable.files.length = 0;
            resumable.addFile(target.files[0]);
        }}
    />
    {#if innerWidth < screensize_md}
        <Dialog.Root bind:open={dialogOpen}>
            <Dialog.Trigger>
                {#snippet child({ props })}
                    {#if !uploading}
                        <Button {...props} disabled={uploading}>Upload</Button>
                    {:else}
                        <div
                            class="flex px-4 py-2 items-center text-sm justify-center bg-neutral-500 text-black rounded-md relative overflow-clip h-10"
                        >
                            <div
                                class="absolute bottom-0 left-0 h-full bg-white opacity-100 transition-all duration-500"
                                style="width: {progress * 100}%;"
                            ></div>
                            <span class="z-10"> Uploading </span>
                        </div>
                    {/if}
                {/snippet}
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Upload</Dialog.Title>
                </Dialog.Header>
                <form
                    class="flex flex-col items-left md:items-center gap-x-4 gap-y-2 mb-1}"
                    onsubmit={processSubmit}
                >
                    <label
                        class="hover:bg-accent hover:cursor-pointer text-sm px-4 py-2 border border-accent rounded-md text-ellipsis overflow-hidden text-nowrap"
                        for="file-input-field"
                        >{files[0]?.fileName ?? "No file selected"}</label
                    >
                    <div class="flex items-center gap-x-2">
                        <Checkbox
                            bind:checked={formData.expires}
                            id="expires-box"
                        />
                        <Label for="expires-box">Expires</Label>
                    </div>
                    <div
                        class="flex flex-row flex-wrap items-center justify-left gap-x-4 gap-y-2 {!formData.expires
                            ? 'text-neutral-800'
                            : ''}"
                    >
                        <DatePicker
                            disabled={uploading || !formData.expires}
                            bind:value={formData.expiry_date}
                        />
                        <div class="flex items-center gap-x-2">
                            <span> @ </span>
                            <Input
                                disabled={uploading || !formData.expires}
                                type="number"
                                bind:value={formData.expiry_hours}
                                class="w-28"
                                oninput={() => {
                                    formData.expiry_hours = Math.min(
                                        Math.max(formData.expiry_hours, 0),
                                        23,
                                    );
                                }}
                            />
                            <span>h</span>
                        </div>
                    </div>
                    <Dialog.Footer>
                        <Button
                            disabled={!resumable.files.length || uploading}
                            type="submit">Submit</Button
                        >
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    {/if}
    <div class={innerWidth < screensize_md ? "hidden" : ""}>
        <form
            class="flex justify-center items-center gap-x-4 mb-1}"
            onsubmit={processSubmit}
        >
            <label
                class="hover:bg-accent hover:cursor-pointer text-sm px-4 py-2 border border-accent rounded-md text-ellipsis overflow-hidden text-nowrap"
                for="file-input-field"
                >{files[0]?.fileName ?? "No file selected"}</label
            >
            <div class="flex items-center gap-x-2">
                <Checkbox bind:checked={formData.expires} id="expires-box" />
                <Label for="expires-box">Expires</Label>
            </div>
            <DatePicker
                disabled={uploading || !formData.expires}
                bind:value={formData.expiry_date}
            />
            <span class={!formData.expires ? "text-neutral-800" : ""}> @ </span>
            <div class="flex items-center gap-x-2">
                <Input
                    disabled={uploading || !formData.expires}
                    type="number"
                    bind:value={formData.expiry_hours}
                    class="w-20"
                    oninput={() => {
                        formData.expiry_hours = Math.min(
                            Math.max(formData.expiry_hours, 0),
                            23,
                        );
                    }}
                />
            </div>
            {#if !uploading}
                <Button
                    type="submit"
                    disabled={!resumable.files.length || uploading}
                    >Upload</Button
                >
            {:else}
                <div
                    class="flex px-4 py-2 items-center text-sm justify-center bg-neutral-500 text-black rounded-md relative overflow-clip h-10"
                >
                    <div
                        class="absolute bottom-0 left-0 h-full bg-white opacity-100 transition-all duration-500"
                        style="width: {progress * 100}%;"
                    ></div>
                    <span class="z-10"> Uploading </span>
                </div>
            {/if}
        </form>
    </div>
</div>
