@use('Illuminate\Support\Carbon')

<x-mail.layout>
    <div>
        <h2>Ispunjen kontakt obrazac</h2>
            <ul style="list-style: none; padding: 0;">
                <li><span style="color: rgb(163,163,163);">Ime: </span>{{$name}}</li>
                <li><span style="color: rgb(163,163,163);">Email: </span><a style="color: rgb(255,255,255);" href="mailto:{{$email}}">{{$email}}</a></li>
                <li><span style="color: rgb(163,163,163);">Vrijeme: </span>{{Carbon::now()}}</li>
            </ul>
            @foreach ($paragraphs as $paragraph)
                <p style="text-align: justify;">{{$paragraph}}</p>
            @endforeach
    </div>

    <x-mail.footer>
        Primate ovaj email zato što ste označili da želite kopiju svoga obrazca ili ste zaposlenik BjeloPICa.
    </x-mail.footer>
</x-mail.layout>

