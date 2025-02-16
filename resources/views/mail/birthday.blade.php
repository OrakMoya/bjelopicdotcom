@use('Illuminate\Support\Carbon')

<x-mail.layout>
    <div>
        <h3>BjeloPIC Vam želi srećan rođendan!</h3>

        @foreach ($paragraphs as $paragraph)
            <p>{{$paragraph}}</p>
        @endforeach

        <p style="color: rgb(123, 123, 123);">Lijepi pozdrav,<br>BjeloPIC Žičani Podatkovni Prijenos</p>
    </div>

    <x-mail.footer />
</x-mail.layout>
