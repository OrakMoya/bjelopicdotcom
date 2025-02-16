<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { Button } from "$lib/components/ui/button";
    import { Link, useForm } from "@inertiajs/svelte";
    import {
        CakeIcon,
        ChevronLeftIcon,
        SaveIcon,
        UndoIcon,
    } from "lucide-svelte";
    import * as i18n from "@internationalized/date";
    import Calendar from "$lib/components/ui/calendar-years/calendar.svelte";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";

    let { person } = $props();

    let form = useForm({
        first_name: person.first_name,
        last_name: person.last_name,
        /** @type {string|null} */
        birthday: null,
        send_birthday_email: person.send_birthday_email,
        email: person.email,
        phone_number: person.phone_number,
        birthday_email_text: person.birthday_email_text,
    });

    let birthday = $state(
        i18n.today(i18n.getLocalTimeZone()).subtract({ years: 18 }),
    );
    if (person.birthday) {
        birthday = i18n.parseDate(person.birthday);
    }

    let birthday_present = $state(person.birthday ? true : false);

    $effect(() => {
        birthday_present;
        birthday;
        setTimeout(() => {
            $form.birthday = birthday_present ? birthday.toString() : null;
        });
    });

    function handleSubmit() {
        $form.patch("/webtools/people/" + person.id);
    }
</script>

<main class="sm:px-4 py-4 mb-48">
    <div class="max-w-screen-lg mx-auto">
        <div class="flex justify-between sm:px-0 px-4">
            <Link class="" href="/webtools/people"
                ><Button variant="outline"><ChevronLeftIcon /></Button></Link
            >
            <Button onclick={handleSubmit}><SaveIcon /></Button>
        </div>
        <div class="mt-4 mb-6 flex gap-x-4">
            <Input
                class="text-2xl sm:rounded-md border-y border-l-0 sm:border-x rounded-tl-none rounded-bl-none h-auto py-1"
                bind:value={$form.first_name}
            />
            <Input
                class="text-2xl sm:rounded-md border-y border-r-0 sm:border-x rounded-tr-none rounded-br-none h-auto py-1"
                bind:value={$form.last_name}
            />
        </div>

        <div class="grid md:grid-cols-2 gap-x-4">
            <div class="relative">
                <CakeIcon
                    class="absolute opacity-75 size-60 rotate-[15deg] text-neutral-900 -right-28 top-10"
                />
                <div
                    class="h-fit mb-3 text-lg px-4 pb-2 pt-2 bg-neutral-900/45 backdrop-blur border-y sm:border-x border-neutral-800 sm:rounded-md flex items-center gap-x-4 text-nowrap relative"
                >
                    <h3>Email</h3>
                    <Input
                        placeholder="None"
                        bind:value={$form.email}
                        class="w-full text-lg placeholder:text-neutral-600"
                        type="text"
                    />
                </div>
                <div
                    class="text-lg px-4 pb-2 pt-2 mb-3 bg-neutral-900/45 backdrop-blur border-y sm:border-x border-neutral-800 sm:rounded-md flex items-center gap-x-3 relative"
                >
                    <Checkbox
                        id="birthday-present"
                        bind:checked={birthday_present}
                    />
                    <label for="birthday-present" class="h-10 content-center">
                        Birthday
                    </label>
                </div>
                <div
                    class="relative w-full mb-3 bg-neutral-900/45 rounded-md border border-neutral-800 backdrop-blur"
                >
                    <div
                        class="mx-auto w-fit h-fit {birthday_present
                            ? ''
                            : 'opacity-50 pointer-events-none'} transition-opacity relative"
                    >
                        <Calendar bind:value={birthday} class="relative" />
                    </div>
                </div>
                <div
                    class="text-lg px-4 pb-2 pt-2 mb-3 bg-neutral-900/45 backdrop-blur border-y sm:border-x border-neutral-800 sm:rounded-md flex items-center gap-x-3 relative"
                >
                    <Checkbox
                        id="send-birthday-email"
                        disabled={!birthday_present}
                        bind:checked={$form.send_birthday_email}
                    />
                    <label
                        for="send-birthday-email"
                        class="h-10 content-center"
                    >
                        Send birthday email
                    </label>
                </div>
                <div
                    class="text-lg px-4 pb-2 pt-2 mb-3 bg-neutral-900/45 backdrop-blur border-y sm:border-x border-neutral-800 sm:rounded-md transition-all relative {!$form.send_birthday_email || !birthday_present
                        ? 'opacity-50 pointer-events-none'
                        : ''}"
                >
                    <label
                        for="birthday-email-text"
                        class="h-10 content-center"
                    >
                        Birthday email text
                    </label>
                    <Textarea
                        bind:value={$form.birthday_email_text}
                        disabled={!$form.send_birthday_email ||
                            !birthday_present}
                        class="mt-2 h-48"
                        id="birthday-email-text"
                    />
                </div>
            </div>
            <div
                class="h-fit text-lg px-4 pb-2 pt-2 bg-neutral-900/45 backdrop-blur border-y sm:border-x border-neutral-800 sm:rounded-md flex items-center gap-x-4 text-nowrap relative"
            >
                <h3>Phone number</h3>
                <Input
                    placeholder="None"
                    bind:value={$form.phone_number}
                    class="w-full text-lg placeholder:text-neutral-600"
                    type="text"
                />
            </div>
        </div>
    </div>
</main>
