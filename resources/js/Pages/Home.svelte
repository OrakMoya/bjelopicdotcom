<script>
    import { AspectRatio } from "bits-ui";
</script>

<main class="max-w-screen-lg mx-auto w-full p-4 lg:px-0 ">
    <section class="flex flex-col w-full">
        <div class="flex w-full bg-white rounded-md overflow-clip -mb-16 sm:-mb-36"
        style="
            -webkit-mask-image: -webkit-linear-gradient( top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) );
            ">
            <AspectRatio.Root ratio={16/9}>
            </AspectRatio.Root>
        </div>
        <div class="flex gap-x-5 px-2 sm:px-7">
            <div class="w-32 sm:w-40 md:w-52 h-fit ">
                <AspectRatio.Root
                    ratio={707 / 1000}
                    class="flex-col flex justify-center"
                >
                    <img class="rounded-lg drop-shadow" src="plakat.jpg" />
                </AspectRatio.Root>
            </div>
            <section class="flex flex-col justify-end gap-y-2 drop-shadow">
                <span class="text-xl font-bold sm:font-normal sm:text-4xl md:text-6xl ">Treba Imat Dušu</span>
                <span class="sm:text-lg md:text-2xl">Nekakav film o nečemu nez</span>
            </section>
        </div>
    </section>
</main>
