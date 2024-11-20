<script lang="ts">
    interface Props {
        [key: string]: any
    }

    let { ...rest }: Props = $props();
    let subtitles = [
        'Producenti "ORIGINALNIH BJELOVARSKIH BLOCKBUSTERA"',
        "Jednostavno superiorniji",
        "NK Bjelovar nam još nije isplatio",
    ];

    function pickSubtitle() {
        let random = Math.random();
        if (random < 0.9) return subtitles[0];
        if (random >= 0.9 && random < 0.99) return subtitles[1];
        else return subtitles[2];
    }
</script>

<span class={rest.class}>{pickSubtitle()}</span>
