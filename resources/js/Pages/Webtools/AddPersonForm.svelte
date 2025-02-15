<script>
    import DatePicker from "$lib/components/ui/datepicker/DatePicker.svelte";
    import * as Dialog from "$lib/components/ui/dialog";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import { useForm } from "@inertiajs/svelte";
    import { PlusIcon } from "lucide-svelte";
    import * as i18n from "@internationalized/date";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import { Button } from "$lib/components/ui/button";
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";

    let form = useForm({
        first_name: "",
        last_name: "",
        /** @type {string | null} */
        birthday: null,
        email: "",
    });

    let open = $state(false);

    let birthday = $state(
        i18n.today(i18n.getLocalTimeZone()).subtract({ years: 18 }),
    );
    let birthday_enabled = $state(false);

    $effect(() => {
        birthday_enabled;
        birthday;
        setTimeout(() => {
            if (birthday_enabled) {
                $form.birthday = birthday.toString();
            } else $form.birthday = null;
        });
    });

    /**
     * @param {SubmitEvent} e
     */
    function handleSubmit(e) {
        e.preventDefault();
        $form.post("/webtools/people", {
            onSuccess: () => {
                $form.reset();
                open = false;
            },
        });
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger>
        <div
            class="w-full h-full flex items-center justify-center rounded-md bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 transition group"
        >
            <AspectRatio ratio={2.35}>
                <div class="w-full h-full flex items-center justify-center">
                    <PlusIcon
                        class="group-hover:opacity-100 opacity-50 transition"
                    />
                </div>
            </AspectRatio>
        </div>
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title class="capitalize"
                >{$form.first_name || $form.last_name
                    ? $form.first_name + " " + $form.last_name
                    : "New person"}</Dialog.Title
            >
        </Dialog.Header>
        <form id="new_person_form" onsubmit={handleSubmit}>
            <Label for="first_name">First name:</Label>
            <Input
                required
                class="capitalize mb-2"
                id="first_name"
                type="text"
                bind:value={$form.first_name}
            />

            <Label for="last_name">Last name:</Label>
            <Input
                required
                class="capitalize mb-2"
                id="last_name"
                type="text"
                bind:value={$form.last_name}
            />

            <Label for="email">Email:</Label>
            <Input class="mb-2" type="email" bind:value={$form.email} />

            <Label class="mb-1" for="picker">Birthday:</Label>
            <div class="flex gap-x-2 items-center w-fit">
                <Checkbox bind:checked={birthday_enabled} />
                <DatePicker
                    disabled={!birthday_enabled}
                    id="picker"
                    bind:value={birthday}
                />
            </div>
        </form>
        <Dialog.Footer>
            <Button variant="outline" onclick={() => (open = false)}
                >Cancel</Button
            >
            <Button form="new_person_form" type="submit">Save</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
