<script>
    import TheBjeloPic from "$lib/components/ui/TheBjeloPIC.svelte";
    import TheBjeloPicLogo from "$lib/components/ui/TheBjeloPICLogo.svelte";
    import { Link } from "@inertiajs/svelte";
    import * as Accordion from "$lib/components/ui/accordion";
    import FooterInfoLinks from "./FooterInfoLinks.svelte";
    import FooterSocials from "./FooterSocials.svelte";

    let innerWidth = $state(1024);
    let innerHeight = $state(0);
    const screensize_md = 768;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<footer
    class="px-4 py-8 bg-neutral-900 text-white w-full border-t border-t-neutral-800"
>
    <div
        class="max-w-screen-lg mx-auto flex flex-col gap-y-4 justify-center items-center md:items-start md:justify-between md:flex-row"
    >
        <div
            class="flex flex-col items-center md:items-start md:basis-1/2 gap-y-1"
        >
            <Link href="/" class="">
                <TheBjeloPicLogo class="w-10 h-10 md:w-8 md:h-8" />
            </Link>
            <Link href="/" class="">
                <TheBjeloPic class="text-3xl md:text-2xl" />
            </Link>
            <span class="text-neutral-500 text-base"
                >Bjelovarski filmski studio</span
            >
        </div>
        <div class="w-full max-w-96 md:basis-1/2 flex">
            {#if innerWidth >= screensize_md}
                <div class="w-full flex flex-col">
                    <h2 class="text-xl font-bold">Informacije</h2>
                    <FooterInfoLinks />
                </div>
                <div class="w-full flex flex-col">
                    <h2 class="text-xl font-bold">Društvene mreže</h2>
                    <FooterSocials />
                </div>
            {:else}
                <Accordion.Root
                    type="multiple"
                    class="flex flex-col justify-center w-full"
                >
                    <Accordion.Item value="info_links" class="border-0">
                        <Accordion.Trigger class="py-2">
                            <h2 class="text-lg font-bold">Informacije</h2>
                        </Accordion.Trigger>
                        <Accordion.Content>
                            <div class="flex flex-col gap-y-2 text-lg">
                                <FooterInfoLinks />
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="socials" class="border-0">
                        <Accordion.Trigger class="py-2">
                            <h2 class="text-lg font-bold">Društvene mreže</h2>
                        </Accordion.Trigger>
                        <Accordion.Content>
                            <div class="flex flex-col gap-y-2 text-lg">
                                <FooterSocials />
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            {/if}
        </div>
    </div>
    <span class="text-neutral-500 block w-fit mx-auto mt-8 text-sm sm:text-base"
        >&copy; BjeloPIC {new Date().getFullYear()} | Sva prava pridržana
    </span>
</footer>
