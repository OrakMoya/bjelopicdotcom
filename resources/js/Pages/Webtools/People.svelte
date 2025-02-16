<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import AddPersonForm from "./AddPersonForm.svelte";
    import GridPerson from "./GridPerson.svelte";

    let { people } = $props();
</script>

<div class="p-4">
    <section
        class="grid max-w-96 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:max-w-screen-xl"
    >
        <AddPersonForm />
        {#each people as person}
            <GridPerson {person} />
        {/each}
    </section>
</div>
