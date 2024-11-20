<script lang="ts">
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import {
        type DateValue,
        DateFormatter,
        getLocalTimeZone,
    } from "@internationalized/date";
    import { cn } from "$lib/utils.js";
    import { Button } from "$lib/components/ui/button";
    import { Calendar } from "$lib/components/ui/calendar";
    import * as Popover from "$lib/components/ui/popover";

    const df = new DateFormatter("en-US", {
        dateStyle: "long",
    });

    interface Props {
        value?: DateValue | undefined;
        disabled?: boolean;
        [key: string]: any
    }

    let { value = $bindable(undefined), disabled = false, ...rest }: Props = $props();
</script>

<Popover.Root openFocus>
    <Popover.Trigger asChild >
        {#snippet children({ builder })}
                <Button
                variant="outline"
                class="{cn(
                    "w-[280px] justify-start text-left font-normal",
                    !value && "text-muted-foreground",
                )} {rest.class}"
                builders={[builder]}
                {disabled}
            >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {value
                    ? df.format(value.toDate(getLocalTimeZone()))
                    : "Select a date"}
            </Button>
                    {/snippet}
        </Popover.Trigger>
    <Popover.Content class="w-auto p-0">
        <Calendar bind:value initialFocus />
    </Popover.Content>
</Popover.Root>
