<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import GridBoxButton from "../Shared/GridBoxButton.svelte";
    import { Film } from "lucide-svelte";
</script>

<main class="max-w-screen-lg mx-auto p-4">
    <div class="flex flex-row flex-wrap">
        <GridBoxButton href="/webtools/videos" subtext="Videos">
            <Film class="w-12 h-12" />
        </GridBoxButton>
    </div>
</main>
