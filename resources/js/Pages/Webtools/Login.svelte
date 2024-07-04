<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import { useForm } from "@inertiajs/svelte";
    import Button from "../Shared/Components/Button.svelte";
    import CardRoot from "../Shared/Components/CardRoot.svelte";
    import CardTitle from "../Shared/Components/CardTitle.svelte";
    import Input from "../Shared/Components/Input.svelte";
    import Label from "../Shared/Components/Label.svelte";

    let form = useForm({
        email: null,
        password: null,
        remember: false,
    });

    function handleSubmit() {
        console.log($form.email);
        console.log("submitted");
    }
</script>

<main class="max-w-screen-lg mx-auto p-4">
    <div class="w-fit mx-auto">
        <form on:submit|preventDefault={handleSubmit}>
            <CardRoot>
                <CardTitle>Login</CardTitle>
                <Label target="email">E-mail</Label>
                <Input
                    bind:value={$form.email}
                    id="email"
                    type="email"
                    name="email"
                />
                <Label target="password">Password</Label>
                <Input
                    bind:value={$form.password}
                    id="password"
                    type="password"
                    name="password"
                />

                <Button type="submit">Login</Button>
            </CardRoot>
        </form>
    </div>
</main>
