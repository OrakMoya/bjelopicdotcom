<script context="module">
    export { default as layout } from "./Layout.svelte";
</script>

<script>
    import DashboardChart from "./DashboardChart.svelte";

    export let distinct_visitor_count_by_date;

    let data = {
        labels: distinct_visitor_count_by_date.data.map(
            (/** @type {{ date: any; }} */ element) => element.date,
        ),
        datasets: [
            {
                label: "Test",
                data: distinct_visitor_count_by_date.data.map(
                    (/** @type {{ total: any; }} */ element) => element.total,
                ),
                backgroundColor: ["rgb(53, 132, 228, 0.3)"],
                borderColor: ["rgb(53, 132, 228)"],
                borderWidth: 2,
            },
        ],
    };
</script>

<svelte:head>
    <title>Webtools - BjeloPIC</title>
</svelte:head>

<main class="max-w-screen-lg mx-auto p-4">
    <div class="flex flex-col space-y-4">
        <div class="p-4 bg-neutral-900 border rounded-md border-neutral-800">
            <DashboardChart {data} type="bar" />
        </div>
    </div>
</main>
