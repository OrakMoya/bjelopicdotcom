<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { PlusIcon } from "lucide-svelte";
    import * as Dialog from "../../Components/Dialog";
</script>

<main class="max-w-screen-lg mx-auto p-4">
    <Dialog.Root>
        <Dialog.Trigger class="px-2 py-2"
            ><PlusIcon class="w-4 h-4" /></Dialog.Trigger
        >
        <Dialog.Content>
        </Dialog.Content>
    </Dialog.Root>
    <div class="flex flex-col"></div>
</main>
