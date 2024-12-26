<script>
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Textarea } from "$lib/components/ui/textarea";
    import { useForm } from "@inertiajs/svelte";
    import { ClockIcon, MailIcon, SendIcon, UserIcon } from "lucide-svelte";

    /** @type {{[key: string]: any}}*/
    let { ...rest } = $props();

    let form = useForm({
        name: "",
        email: "",
        message: "",
        sendCopy: false,
    });

    /**
     * @param {SubmitEvent} event
     */
    function handleSubmit(event) {
        event.preventDefault();
        $form.post("/contact");
    }
</script>

<div class="px-8 w-full h-full relative overflow-clip">
    <div
        class="w-full h-full max-w-screen-xl flex flex-col items-center lg:items-start lg:flex-row justify-around gap-y-28 mx-auto py-28"
    >
        <div class="relative max-w-[450px] w-full">
            <MailIcon
                class="opacity-[6%] absolute top-[200px] lg:-top-[70px] -left-[250px] lg:left-[250px] w-[600px] h-[600px] rotate-12"
            />
            <section
                class="bg-neutral-900 px-8 py-6 rounded-xl border border-neutral-800 relative"
            >
                <div class="mb-5">
                    <h1
                        class="font-bold tracking-tighter text-4xl text-bjelopic-red-1"
                    >
                        Kontaktirajte nas
                    </h1>
                    <h2 class="text-neutral-400">Kako vam možemo pomoći?</h2>
                </div>
                <div class="flex flex-col gap-y-8 w-full">
                    <form class="flex flex-col gap-y-4" onsubmit={handleSubmit}>
                        <div>
                            <Label for="name" class="text-lg">Ime</Label>
                            <Input
                                class="text-lg"
                                id="name"
                                name="name"
                                type="text"
                                required
                                bind:value={$form.name}
                            />
                        </div>

                        <div>
                            <Label for="email" class="text-lg">Email</Label>
                            <Input
                                class="text-lg"
                                id="email"
                                name="email"
                                type="email"
                                required
                                bind:value={$form.email}
                            />
                        </div>

                        <div>
                            <Label for="message" class="text-lg">Poruka</Label>
                            <Textarea
                                id="message"
                                class="text-lg"
                                required
                                bind:value={$form.message}
                            />
                        </div>
                        {#if JSON.stringify(rest.errors) !== "{}" && rest.errors.submission}
                            <div class="text-red-500">
                                {rest.errors.submission}
                            </div>
                        {/if}
                        <div class="flex justify-between items-start mt-3">
                            <Label
                                for="send-confirmation"
                                class="flex items-center gap-2 text-neutral-300"
                            >
                                <Checkbox
                                    bind:checked={$form.sendCopy}
                                    id="send-confirmation"
                                /> Pošalji mi kopiju
                            </Label>
                            <button
                                class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-baseline"
                                type="submit"
                            >
                                <SendIcon class="w-5 h-5" />
                                <span>Pošalji</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
        <div class="">
            <section
                class="mx-6 sm:max-w-[550px] lg:max-w-[450px] relative w-full"
            >
                <h3 class="text-xl font-bold mb-5 md:mt-3 text-bjelopic-red-1">
                    Kontaktne Informacije
                </h3>
                <div class="flex gap-x-8 flex-col md:flex-row gap-y-6">
                    <div class="flex flex-col gap-y-6 lg:w-full">
                        <div>
                            <h4
                                class="text-lg font-bold flex items-center gap-x-2"
                            >
                                <MailIcon class="w-5 h-5" /> Info mail
                            </h4>
                            <a href="mailto:info@bjelopic.com"
                                >info@bjelopic.com</a
                            >
                            <p class="text-neutral-400 mt-1">
                                Izravno nam pošaljite mail i vratit ćemo Vam se
                                u najkraćem mogućem roku.
                            </p>
                        </div>

                        <div class="flex flex-col">
                            <h4
                                class="text-lg font-bold inline-flex items-center gap-x-2 mb-1"
                            >
                                <ClockIcon class="w-5 h-5" /> Radno vrijeme
                            </h4>
                            <p class="text-neutral-400">
                                Načelno kada stignemo.
                            </p>
                            <p class="text-neutral-400">
                                Praznicima i blagdanima (koji se slave ovisi
                                koga kontaktirate) radimo.
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-6 lg:w-full min-w-fit">
                        <div>
                            <h4
                                class="text-lg font-bold flex items-center gap-x-2"
                            >
                                <UserIcon class="w-5 h-5" /> Petar Klinac
                            </h4>
                            <p>Tel.: +385 98 593 058</p>
                            <p>
                                Email: <a href="mailto:petar@bjelopic.com"
                                    >petar@bjelopic.com</a
                                >
                            </p>
                        </div>
                        <div>
                            <h4
                                class="text-lg font-bold flex items-center gap-x-2"
                            >
                                <UserIcon class="w-5 h-5" /> Mate Pušić
                            </h4>
                            <p>Tel.: +385 91 308 0004</p>
                            <p>
                                Email: <a href="mailto:mate@bjelopic.com"
                                    >mate@bjelopic.com</a
                                >
                            </p>
                        </div>
                        <div>
                            <h4
                                class="text-lg font-bold flex items-center gap-x-2"
                            >
                                <UserIcon class="w-5 h-5" /> Filip Štimac
                            </h4>
                            <p>Tel.: +385 91 981 4085</p>
                            <p>
                                Email: <a href="mailto:filip@bjelopic.com"
                                    >filip@bjelopic.com</a
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
