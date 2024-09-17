<script>
    import Resumable from "resumablejs";
    import { router, page } from "@inertiajs/svelte";
    import DatePicker from "$lib/components/ui/datepicker/DatePicker.svelte";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { toast } from "svelte-sonner";

    const csrf_token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    if (csrf_token) {
        headers.append("X-CSRF-TOKEN", csrf_token);
    }

    let formData = {
        expiry_date: today(getLocalTimeZone()).add({ days: 1 }),
        expiry_hours: 12,
        expiry_minutes: 0,
        expiry_seconds: 0,
        expires: true,
        resumable_identifier: null,
    };

    let resumable = new Resumable({
        target: "/webtools/uploads/upload",
        query: {
            _token: csrf_token,
            temporaryUploadId: null,
        },
        chunkSize: 10 * 1024 * 1024,
    });

    let progress = 0.0;
    let uploading = false;

    async function processSubmit() {
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
            resumable.opts.query.temporaryUploadId = response;
            resumable.opts.target += "/" + response

            resumable.on("complete", () => {
                toast.success("Done!");
                router.reload();
            });
            resumable.on("progress", () => {
                progress = resumable.progress();
            });
            resumable.on("uploadStart", () => (uploading = true));
            resumable.upload();
        } else {
            toast.error(response.message);
        }
    }
</script>

<div class="flex flex-col mb-4">
    <form
        class="flex items-center gap-x-4 mb-1 {uploading ? 'text-neutral-800' : ''}"
        on:submit|preventDefault={processSubmit}
    >
        <Input
            type="file"
            disabled={uploading}
            on:input={(e) => {
                resumable.files = [];
                resumable.addFile(e.target.files[0]);
            }}
        />
        <DatePicker disabled={uploading} bind:value={formData.expiry_date} />
        <span> @ </span>
        <Input
            disabled={uploading}
            type="number"
            bind:value={formData.expiry_hours}
            class="w-fit"
            on:input={() => {
                formData.expiry_hours = Math.min(
                    Math.max(formData.expiry_hours, 0),
                    23,
                );
            }}
        />
        <Button disabled={uploading} type="submit">Submit</Button>
    </form>
    {#if uploading}
        <div class="w-full h-1">
            <div
                class="bg-bjelopic-red-1 rounded h-1 transition-all duration-1000"
                style="width: {progress * 100}%;"
            ></div>
        </div>
    {/if}
</div>
