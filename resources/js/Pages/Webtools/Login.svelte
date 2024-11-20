<script module>
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { run, preventDefault } from 'svelte/legacy';

    import { useForm, page } from "@inertiajs/svelte";
    import { Toaster, toast } from "svelte-sonner";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Checkbox } from "$lib/components/ui/checkbox";

    let form = useForm({
        email: null,
        password: null,
        remember: false,
    });

    function handleSubmit() {
        $form.post("/webtools/login");
    }

    function processRefresh(props) {
        if (JSON.stringify(props.errors) !== "{}") {
            toast.error(props.errors.email);
        }
    }

    run(() => {
        processRefresh($page.props);
    });
</script>

<Toaster theme="dark" richColors />

<main class="max-w-screen-lg mx-auto p-4">
    <form onsubmit={preventDefault(handleSubmit)}>
        <Card.Root class="w-[350px] mx-auto">
            <Card.Header>
                <Card.Title>Login</Card.Title>
            </Card.Header>
            <Card.Content>
                <Label for="email">Email</Label>
                <Input
                    type="email"
                    bind:value={$form.email}
                    required
                    name="email"
                />
                <Label for="password">Password</Label>
                <Input
                    type="password"
                    bind:value={$form.password}
                    required
                    name="password"
                />
                <div class="flex gap-x-2 items-center mt-2">
                    <Checkbox bind:checked={$form.remember} id="rememberme" />
                    <Label for="rememberme">Remember me</Label>
                </div>
            </Card.Content>
            <Card.Footer>
                <Button variant="outline" type="submit">Login</Button>
            </Card.Footer>
        </Card.Root>
    </form>
</main>
