<script>
    let { phrases, ...rest } = $props();
    let current = $state("................")
    let next = ""
    let index = 0;
    let first = true;

    function pick() {
        if (index >= phrases.length) {
            index = 0;
        }

        next = phrases[index];

        type();
        index++;
    }

    function type() {
        if (current !== next) {
            current = next.substring(0, current.length + 1);
            setTimeout(type, 50);
            return;
        }

        setTimeout(deleteCurrent, 2000);
    }

    function deleteCurrent() {
        if (current.length > 0) {
            current = current.substring(0, current.length - 1);
            setTimeout(deleteCurrent, 50);
            return;
        }

        setTimeout(pick, first ? 0 : 200);
        first = false;
    }

    setTimeout(deleteCurrent, 0);
</script>

<span class={rest.class}>
    {@html current || '&nbsp;'}
</span>
