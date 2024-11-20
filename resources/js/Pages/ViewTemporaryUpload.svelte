<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { File } from "lucide-svelte";

    let { temporary_upload } = $props();
</script>

<svelte:head>
    <title>{temporary_upload.original_name.substring(0, 12)} - BjeloPIC</title>
</svelte:head>

<main
    class="max-w-screen-lg mx-auto h-full flex flex-col items-center justify-center p-4 gap-y-2"
>
    <div
        class="bg-neutral-950 border border-neutral-800 rounded-xl w-fit p-8 relative flex flex-col sm:flex-row items-center gap-x-4 gap-y-4"
    >
        <div class="flex items-center gap-x-4">
            <File class="w-10 h-10" />
            <div class="flex flex-col">
                <div
                    class="text-lg max-w-72 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis"
                >
                    {temporary_upload.original_name}
                </div>
                <div class="text-sm text-neutral-500">
                    {temporary_upload.size}
                    {#if temporary_upload.expiry_datetime}
                        - Expires on {temporary_upload.expiry_datetime}
                    {:else}
                        - Never expires
                    {/if}
                </div>
            </div>
        </div>
        <a href="/f/{temporary_upload.sqid}/download" class="w-full sm:w-fit">
            <Button
                class="bg-bjelopic-red-1 w-full py-8 text-base sm:py-4 sm:text-sm sm:w-fit text-white hover:bg-bjelopic-red-2"
                >Download</Button
            >
        </a>
    </div>
</main>
