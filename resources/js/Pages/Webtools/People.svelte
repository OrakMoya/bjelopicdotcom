<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { Button } from "$lib/components/ui/button";
    import { PencilIcon, Trash, TrashIcon } from "lucide-svelte";
    import { Link } from "@inertiajs/svelte";

    import AddPersonForm from "./AddPersonForm.svelte";

    let { people } = $props();
</script>

<div class="p-4">
    <section class="grid grid-cols-3 gap-4 max-w-screen-xl mx-auto">
        <AddPersonForm />
        {#each people as person}
            <div
                class="group px-4 pt-3 pb-4 bg-neutral-950 border border-neutral-800 rounded-md"
            >
                <p class="mb-1 text-xl">
                    {person.first_name}
                    {person.last_name}
                </p>

                <p class="text-neutral-500">
                    {person.email ?? "/"}
                </p>

                <p class="text-neutral-500 mb-2">
                    {person.birthday
                        ? new Date(person.birthday).toJSON().slice(0, 10)
                        : "/"}
                </p>

                <div
                    class="text-neutral-600 flex items-center justify-end gap-x-2"
                >
                    <Link href="people/{person.id}"
                        ><PencilIcon
                            class="size-5 text-neutral-600 hover:text-white transition"
                        /></Link
                    >
                    <button
                        ><TrashIcon
                            class="size-5 hover:text-white transition"
                        /></button
                    >
                </div>
            </div>
        {/each}
    </section>
</div>
