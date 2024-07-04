<script>
    export let id = "";
    export let name = "";
    export let type = "";
    export let placeholder = "";
    export let value;

    const handleInput = (e) => {
        value = type.match(/^(number|range)$/)
            ? +e.target.value
            : e.target.value;
    };
</script>

<input
    class="p-2 mb-1 rounded-md w-full h-fit bg-black box-border outline outline-neutral-900 focus:outline-2 focus:outline-white {$$restProps.class}"
    {id}
    {name}
    {type}
    {placeholder}
    on:input={handleInput}
/>
