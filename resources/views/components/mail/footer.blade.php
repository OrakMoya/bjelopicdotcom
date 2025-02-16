<footer style="max-width: 384px; margin: 0 auto; text-align: center; margin-top: 64px;">
    <div style="margin-bottom: 12px; font-weight: bold;">
        &copy; BjeloPIC {{date("Y")}} | Sva prava pridržana
    </div>
    @if ($slot)
        <div style="color: rgb(115, 115, 115); font-size: 0.875rem; line-height: 1.25rem;" >
            {{$slot}}
        </div>
    @endif
</footer>
