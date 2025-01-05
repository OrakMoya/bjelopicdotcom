<script lang="ts">
    import Check from "lucide-svelte/icons/check";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { cn } from "$lib/utils.js";
    import { PlusIcon } from "lucide-svelte";

    let {
        options,
        value = $bindable(),
        onSelect = (item: string) => {
            item;
        },
    } = $props();

    let converted_options = $derived(
        options.reduce((previous, current) => {
            return [
                ...previous,
                { label: current, value: current.toLowerCase() },
            ];
        }, []),
    );

    let open = $state(false);
    let customInput = $state("");
    let triggerRef = $state<HTMLButtonElement>(null!);

    const selectedValue = $derived(
        converted_options.find((f) => f.value === value)?.label,
    );

    $effect(() => {
        //
        if (selectedValue) onSelect(selectedValue);
    });

    // We want to refocus the trigger button when the user selects
    // an item from the list so users can continue navigating the
    // rest of the form with the keyboard.
    function closeAndFocusTrigger() {
        open = false;
        tick().then(() => {
            triggerRef.focus();
        });
    }
</script>

<Popover.Root bind:open>
    <Popover.Trigger bind:ref={triggerRef}>
        {#snippet child({ props })}
            <Button
                variant="outline"
                class="w-full justify-between"
                {...props}
                role="combobox"
                aria-expanded={open}
            >
                    {selectedValue || "Select..."}
                <ChevronsUpDown class="opacity-50" />
            </Button>
        {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-full p-0">
        <Command.Root>
            <Command.List>
                <Command.Empty>No framework found.</Command.Empty>
                <Command.Group>
                    {#each converted_options as framework}
                        <Command.Item
                            value={framework.value}
                            onSelect={() => {
                                value = framework.value;
                                closeAndFocusTrigger();
                            }}
                        >
                            <Check
                                class={cn(
                                    value !== framework.value &&
                                        "text-transparent",
                                )}
                            />
                            {framework.label}
                        </Command.Item>
                    {/each}
                    <Command.Item value="addNewPhase" class="p-0">
                        <div class="flex w-full justify-center py-2 px-4 gap-x-2">
                            <input
                                bind:value={customInput}
                                type="text"
                                class="bg-neutral-900 rounded-md text-white text-sm focus:outline-none ring-0 w-[100px] grow px-2"
                            />
                            <button
                                class=" hover:bg-neutral-900 border hover:border-neutral-700 border-transparent rounded-md transition-colors p-2"
                                onclick={() => {
                                    options = [...options, customInput];

                                    value = customInput.toLowerCase();
                                    closeAndFocusTrigger();
                                    customInput = "";
                                }}
                            >
                                <PlusIcon />
                            </button>
                        </div>
                    </Command.Item>
                </Command.Group>
            </Command.List>
        </Command.Root>
    </Popover.Content>
</Popover.Root>
