<script lang="ts">
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import {
        type DateValue,
        DateFormatter,
        getLocalTimeZone,
    } from "@internationalized/date";
    import { cn } from "$lib/utils.js";
    import { Button } from "../Button";
    import { Calendar } from "../Calendar";
    import * as Popover from "../Popover";

    const df = new DateFormatter("en-US", {
        dateStyle: "long",
    });

    import type { HTMLInputAttributes } from "svelte/elements";
    import type { InputEvents } from "./index.js";

    type $$Props = HTMLInputAttributes;
    type $$Events = InputEvents;

    let className: $$Props["class"] = undefined;
    export let value: $$Props["value"] = undefined;
    export { className as class };
</script>

<Popover.Root>
    <Popover.Trigger asChild let:builder>
        <Button
            variant="outline"
            class={cn(
                "w-[280px] justify-start text-left font-normal",
                !value && "text-muted-foreground", className,
            )}
            builders={[builder]}
        >
            <CalendarIcon class="mr-2 h-4 w-4" />
            {value
                ? df.format(value.toDate(getLocalTimeZone()))
                : "Pick a date"}
        </Button>
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0">
        <Calendar bind:value initialFocus />
    </Popover.Content>
</Popover.Root>
