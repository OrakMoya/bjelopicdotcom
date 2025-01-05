<script>
    import { Button } from "$lib/components/ui/button";
    import ExtendableCombobox from "$lib/components/ui/extendable-combobox/ExtendableCombobox.svelte";
    import { Input } from "$lib/components/ui/input";
    import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "lucide-svelte";

    let {
        available_phases,
        phase = $bindable(),
        banned_phases = $bindable(),
        amount = $bindable(1),
        unit = $bindable("hours"),
        onChange = () => {},
        onDelete = () => {},
        onMoveUp = () => {},
        onMoveDown = () => {},
    } = $props();

    $effect(() => onChange({ phase, amount, unit }));
</script>

<div
    class="flex items-center justify-center w-full mx-auto gap-x-4 border border-muted px-4 py-2 rounded-md bg-background"
>
    <div class="flex flex-col justify-around gap-2 w-full">
        <div class="grow">
            <ExtendableCombobox
                onSelect={(/** @type {string} */ value) => {
                    phase = value;
                }}
                value={phase?.toLowerCase()}
                options={available_phases}
            />
        </div>
        <div>
            <Input
                type="number"
                class="min-w-16"
                bind:value={amount}
                onchange={() => {
                    if (amount <= 0) amount = 1;
                }}
            />
        </div>
        <div class="flex gap-x-4 items-center grow h-full">
            <div
                class="flex justify-center items-center gap-x-2 py-1 h-10 sm:py-0 bg-neutral-900 px-2 grow max-w-32 rounded-md border border-neutral-800"
            >
                <button
                    class="{unit === 'hours'
                        ? 'border-neutral-800 bg-black '
                        : 'text-neutral-500 border-transparent'} border px-1 rounded-md"
                    onclick={() => (unit = "hours")}>Hours</button
                >
                <button
                    class="{unit === 'days'
                        ? 'border-neutral-800 bg-black '
                        : 'text-neutral-500 border-transparent'} border px-1 rounded-md"
                    onclick={() => (unit = "days")}>Days</button
                >
            </div>
            <div class="flex items-center w-full justify-end gap-x-2">
                <Button variant="destructive" class="w-fit" onclick={onDelete}
                    ><TrashIcon /></Button
                >
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-y-4">
        <button
            onclick={() => onMoveUp()}
            class="grow p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-all"
            ><ArrowUpIcon class="size-6" /></button
        >
        <button
            onclick={() => onMoveDown()}
            class="grow p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-all"
            ><ArrowDownIcon class="size-6" /></button
        >
    </div>
</div>
