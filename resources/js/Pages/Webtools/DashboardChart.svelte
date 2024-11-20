<script>
    import { onMount } from "svelte";
    import { Chart } from "chart.js/auto";

    /**
     * @type {HTMLCanvasElement}
     */
    let canvas = $state();

    let ctx;
    let { type, options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                grid: {
                    color: "#444444",
                    display: false,
                },
                beginAtZero: true,
            },
            x: {
                grid: {
                    color: "#444444",
                    display: false,
                },
            },
        },
    }, data } = $props();

    onMount(async function () {
        ctx = canvas.getContext("2d");
        if (!ctx) return;

        new Chart(ctx, {
            type: type,
            options: options,
            data: data,
        });
    });
</script>

<div class="w-full h-full">
    <canvas bind:this={canvas}></canvas>
</div>
