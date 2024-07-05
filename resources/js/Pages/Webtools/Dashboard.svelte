<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import GridBoxButton from "../Shared/GridBoxButton.svelte";
    import { Film, Earth } from "lucide-svelte";
</script>

<main class="max-w-screen-lg mx-auto p-4">
    <div class="flex flex-row flex-wrap gap-x-4 gap-y-4">
        <GridBoxButton href="/" subtext="Website">
            <Earth class="w-12 h-12" />
        </GridBoxButton>
        <GridBoxButton href="/webtools/videos" subtext="Videos">
            <Film class="w-12 h-12" />
        </GridBoxButton>
    </div>
</main>
