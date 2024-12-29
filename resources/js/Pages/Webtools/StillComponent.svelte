<script>
    import { AspectRatio } from "$lib/components/ui/aspect-ratio";
    import { Button } from "$lib/components/ui/button";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import NumberInput from "$lib/components/ui/NumberInput.svelte";
    import { router } from "@inertiajs/svelte";
    import { TrashIcon } from "lucide-svelte";

    let {
        still,
        onDeleteRequest = (_id) => {},
        selectedChange = (_id, _state) => {},
        video,
        index,
        selected = $bindable(false),
    } = $props();

    export function getSelected() {
        return selected;
    }

    /**
     * @param {boolean} state
     */
     export function setSelected(state) {
        selected = state;
    }
</script>

<div
    class="flex md:flex-col border border-neutral-800 bg-neutral-900 rounded-md overflow-clip"
>
    <AspectRatio ratio={16 / 9} class="group bg-black">
        <img
            src={still.path}
            class="object-contain w-full h-full"
            alt={"Still no. " + (index + 1) + " for " + video.title}
        />
    </AspectRatio>
    <div
        class="px-2 py-2 flex flex-col-reverse md:flex-row items-center justify-between gap-2"
    >
        <div class="inline-flex flex-col-reverse md:flex-row items-center gap-2">
            <Checkbox
                bind:checked={selected}
            />
            <NumberInput
                number={still.position}
                onChange={(number) =>
                    router.patch(
                        "/webtools/videos/stills/" + still.id,
                        {
                            position: number,
                        },
                        {
                            preserveScroll: true,
                        },
                    )}
            />
        </div>
        <Button
            variant="destructive"
            class="transition-opacity p-2 h-fit"
            onclick={() => {
                onDeleteRequest(still.id);
            }}
        >
            <TrashIcon class="w-4 h-4" />
        </Button>
    </div>
</div>
