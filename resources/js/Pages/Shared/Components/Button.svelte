<script>
    import { Button } from "bits-ui";
    export let href;
    export let type;
</script>

<Button.Root class="text-sm active:scale-95 transition w-fit mt-4 py-2 px-4 bg-white text-black rounded-md {$$restProps.class}" {href} {type}><slot /></Button.Root>
