<script>
    import { ArrowDown, ArrowUp } from "lucide-svelte";

    /** @typedef  Props
     *   @prop {Number} [number]
     *   @prop {(num: Number)=>void} onChange
     */

    /** @type {Props & { [key: string]: any }} */
    let { number = $bindable(0), onChange = (_) => {}, ...rest } = $props();
</script>

<div
    class="flex flex-col md:flex-row w-fit items-center rounded-md bg-black px-2 py-1 gap-1 md:h-full {rest.class}"
>
    <button
        onclick={() => {
            number--;
            onChange(number);
        }}
        ><ArrowUp
            class="w-5 h-5 hover:translate-y-[2px] transition-transform"
        /></button
    >
    <button
        onclick={() => {
            number++;
            onChange(number);
        }}
        ><ArrowDown
            class="w-5 h-5 hover:-translate-y-[2px] transition-transform "
        /></button
    >
</div>
