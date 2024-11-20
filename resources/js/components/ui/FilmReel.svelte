<script lang="ts">
    interface Props {
        width?: number;
    }

    let { width = 24 }: Props = $props();
</script>

<div
    class="flex w-full h-4 md:h-6 bg-repeat relative
                                    "
    style="
            background-image: url('rect1.svg');
            background-size: auto {width}px;
            background-repeat: repeat;
            "
></div>
