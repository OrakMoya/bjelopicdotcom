<script>
    import { Toaster } from "$lib/components/ui/sonner";
    import { toast } from "svelte-sonner";
    import { page } from "@inertiajs/svelte";

    const error_count = 2;

    /**
     * @param {{ status: string|null; errors: any; }} props
     */
    function process(props) {
        let status = props.status;
        if (status) toast.success(status);

        let errors = props.errors;
        if (JSON.stringify(errors) !== "{}") {
            toast.error(errors[Object.keys(errors)[0]]);
        }
    }

    $: process($page.props);
</script>

<Toaster richColors theme="dark" />
