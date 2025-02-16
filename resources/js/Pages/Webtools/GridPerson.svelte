<script>
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { PencilIcon, Trash, TrashIcon } from "lucide-svelte";
    import { Link, router } from "@inertiajs/svelte";

    let { person } = $props();

    let open = $state(false);
</script>

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

    <div class="text-neutral-600 flex items-center justify-end gap-x-2">
        <Link href="people/{person.id}"
            ><PencilIcon
                class="size-5 text-neutral-600 hover:text-white transition"
            /></Link
        >
        <AlertDialog.Root bind:open>
            <AlertDialog.Trigger
                ><TrashIcon class="size-5 hover:text-white transition" />
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Header>
                    <AlertDialog.Title
                        >Are you absolutely sure?</AlertDialog.Title
                    >
                </AlertDialog.Header>
                <AlertDialog.Footer>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action
                        onclick={() =>
                            router.delete("/webtools/people/" + person.id, {
                                onSuccess: () => (open = false),
                            })}
                        class={buttonVariants({
                            variant: "destructive",
                        })}
                    >
                        Delete
                    </AlertDialog.Action>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </div>
</div>
