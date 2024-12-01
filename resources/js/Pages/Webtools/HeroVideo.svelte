<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { Button } from "$lib/components/ui/button";
    import { useForm, router } from "@inertiajs/svelte";
    import axios from "axios";
    import { ArrowUp } from "lucide-svelte";

    let { heroUrl } = $props();

    let form = useForm({
        video: null,
    });

    /**
     * @param {SubmitEvent} e
     */
    function processSubmit(e) {
        e.preventDefault();
        $form.post("/webtools/hero", {
            onSuccess: () => location.reload(),
        });
    }
</script>

<main class="max-w-screen-lg mx-auto p-4 flex flex-col gap-y-4 mt-2">
    <form onsubmit={processSubmit}>
        <input
            type="file"
            class="hidden"
            id="new-hero-video"
            accept="video/webm"
            oninput={(e) => ($form.video = e.target.files[0])}
        />
        <div class="flex justify-center">
            <label
                for="new-hero-video"
                class="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-l-md {$form.video
                    ? ''
                    : 'rounded-r-md '} hover:opacity-80 items-center content-center text-sm"
            >
                {$form.video ? $form.video.name : "Select new hero video"}
            </label>
            {#if $form.video}
                <Button
                    type="submit"
                    class="rounded-l-none bg-green-600 hover:bg-green-600/90 text-primary-foreground"
                >
                    <ArrowUp />
                </Button>
            {/if}
        </div>
    </form>
    <video class="w-full rounded-md" controls>
        <track kind="captions" />
        <source src={heroUrl} type="video/webm" />
    </video>
</main>
