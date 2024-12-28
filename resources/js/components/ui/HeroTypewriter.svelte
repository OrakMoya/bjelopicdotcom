<script>
    let { phrases, ...rest } = $props();
    let current = $state("...")
    let next = ""
    let index = 0;

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

        setTimeout(deleteCurrent, 3000);
    }

    function deleteCurrent() {
        if (current.length > 0) {
            current = current.substring(0, current.length - 1);
            setTimeout(deleteCurrent, 50);
            return;
        }

        setTimeout(pick, 200);
    }

    setTimeout(deleteCurrent, 1000);
</script>

<span class={rest.class}>
    {@html current || '&nbsp;'}
</span>
