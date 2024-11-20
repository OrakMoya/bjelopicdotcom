<script lang="ts">
    import Footer from "../Footer.svelte";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<div class="flex flex-col h-screen font-sans">
    <div class="flex-grow bg-black text-white relative">
        {@render children?.()}
    </div>

    <Footer />
</div>
