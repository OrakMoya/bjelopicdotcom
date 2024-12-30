<script>
    import HeroCarousel from "../HeroCarousel.svelte";
    import TcTextComponent from "../TCTextComponent.svelte";

    let timestamp = 1588291200 * 1000;
    let now = Date.now();
    let difference = (now - timestamp) / 1000;

    let years = $state(0);
    let days = $state(0);
    let hours = $state(0);
    let minutes = $state(0);
    let seconds = $state(0);
    let frame = $state(0);

    let siy = 31557600;
    let sid = 86400;
    let sih = 3600;
    let sim = 60;

    function calc() {
        let initial = difference;

        years = Math.floor(difference / siy);
        difference = difference - years * siy;

        days = Math.floor(difference / sid);
        difference = difference - days * sid;

        hours = Math.floor(difference / sih);
        difference = difference - hours * sih;

        minutes = Math.floor(difference / sim);
        difference = difference - minutes * sim;

        seconds = Math.floor(difference);

        difference = initial;
    }
    function calcFrame() {
        frame++;

        // Izgleda vise in sync ako kasni 1 frame, nez zast
        if (frame == 0) {
            tcFlipped = !tcFlipped;
        }

        if (frame >= 25) {
            frame = 0;
            difference++;
            calc();
        }
        setTimeout(calcFrame, 40);
    }

    let tcFlipped = $state(false);

    calc();
    calcFrame();
</script>

<div class="relative bg-black overflow-clip px-8">
    <section class="pt-32 pb-32 relative max-w-screen-xl mx-auto">
        <div
            class="flex flex-col items-start sm:items-center sm:justify-center w-full sm:w-fit max-w-[350px] sm:max-w-full mx-auto"
        >
            <div
                class="w-full text-xl sm:text-lg lg:text-xl font-bold text-neutral-500 mb-4 sm:mb-0"
            >
                ...a u igri smo već
            </div>
            <div
                class="flex flex-col sm:flex-row gap-y-1 sm:gap-x-1 lg:gap-x-2 justify-center items-start sm:items-center box-border mb-2"
            >
                <div
                    class="text-lg font-bold px-2 py-[2px] sm:text-base lg:text-xl rounded-sm text-black w-fit h-fit tracking-tighter mr-1 lg:mr-2
                    {tcFlipped ? 'bg-bjelopic-red-1' : 'bg-white'}"
                >
                    TCR
                </div>
                <TcTextComponent appendColon suffix="y">{years}</TcTextComponent
                >
                <TcTextComponent appendColon suffix="d">{days}</TcTextComponent>
                <TcTextComponent appendColon suffix="h"
                    >{hours < 10 ? 0 : ""}{hours}</TcTextComponent
                >
                <TcTextComponent appendColon suffix="m"
                    >{minutes < 10 ? 0 : ""}{minutes}</TcTextComponent
                >
                <TcTextComponent appendColon suffix="s"
                    >{seconds < 10 ? 0 : ""}{seconds}</TcTextComponent
                >
                <TcTextComponent suffix="f"
                    >{frame < 10 ? 0 : ""}{frame}</TcTextComponent
                >
            </div>
            <div
                class="w-full text-xl sm:text-lg lg:text-xl font-bold text-neutral-500 mb-4 sm:mb-0 sm:text-right"
            >
                ...ili od naše 16-e
            </div>
        </div>
    </section>
</div>
