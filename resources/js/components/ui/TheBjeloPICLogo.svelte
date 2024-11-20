<script lang="ts">
    interface Props {
        [key: string]: any
    }

    let { ...rest }: Props = $props();
</script>


<div class="{rest.class}">
    <img src="/bjelopic_logo.png" alt="bjelopic" />
</div>
