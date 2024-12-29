<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import Hero from "./Home/Hero.svelte";
    import Section1 from "./Home/Section1.svelte";

    let { heroUrl, videos } = $props();
</script>

<Hero {heroUrl} />
<!--
<Section1 {videos} />
-->
