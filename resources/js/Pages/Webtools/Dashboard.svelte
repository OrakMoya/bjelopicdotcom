<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import GridBoxButton from "$lib/components/ui/GridBoxButton.svelte";
    import { Chart } from "chart.js/auto";
    import { Film, Earth } from "lucide-svelte";
    import { onMount } from "svelte";

    export let distinct_visitor_count_by_date;

    let options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    let data = {
        labels: distinct_visitor_count_by_date.data.map(
            (element) => element.date,
        ),
        datasets: [
            {
                label: "Test",
                data: distinct_visitor_count_by_date.data.map(
                    (element) => element.total,
                ),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    onMount(async function () {
        const ctx = document.getElementById("barChart").getContext("2d");
        let chart = new Chart(ctx, {
            type: "bar",
            options: options,
            data: data,
        });
    });
</script>

<main class="max-w-screen-lg mx-auto p-4">
    <div class="flex flex-row flex-wrap gap-x-4 gap-y-4">
        <GridBoxButton href="/" subtext="Website">
            <Earth class="w-12 h-12" />
        </GridBoxButton>
        <GridBoxButton href="/webtools/videos" subtext="Videos">
            <Film class="w-12 h-12" />
        </GridBoxButton>
    </div>
    <canvas id="barChart" class="w-full h-full" />
</main>
