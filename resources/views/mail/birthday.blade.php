@use('Illuminate\Support\Carbon')
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="darkreader" content="something">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .body{
            background: rgb(20, 20, 20);
            padding: 32px 0;
        }
        .main{
            padding: 12px;
            max-width: 768px;
            margin: 0 auto;
            color: rgb(240,240,240);
            font-family: 'sans';
        }
        .links{
            color: white;
        }
        .h1{
            margin: 0;
        }
        li span{
            font-weight: bold;
            margin: 0 4px 0 0;
        }
        ul{
            margin-top: 4px;
        }
        footer{
            font-family: 'sans';
            max-width: 450px;
            margin: 64px auto 0 auto;
            text-align: center;
            color: rgb(240,240,240);
        }
        .space-b-none{
            margin-bottom: 0px;
        }
        .title{
            font-size: 40px;
        }
        .darker{
            color: rgb(127, 127, 127);
            display: block;
        }
        .bigger{
            font-size: 18px;
        }
        .smaller{
            font-size: 14px;
        }
        p{
            margin: 0 0 8px 0;
        }
        .bold{
            font-weight: bold;
        }
        header{
            max-width: 768px;
            margin: 0 auto;
            padding: 0 12px 0 12px;
            height: 50px;
        }
        header img{
            height: 100%;
        }
        .light{
            color: rgb(240,240,240);
        }
        .space-b{
            margin-bottom: 32px;
        }
        .space-b-small{
            margin-bottom: 12px;
        }
        .block{
            display: block;
        }
        .h-full{
            height: 100%;
        }
    </style>
</head>
<body class="body">
    <header>
        <a class="block h-full" href="https://bjelopic.com">
            <img src="https://bjelopic.com/bjelopic_banner_smaller.png" alt="bjelopic-banner" />
        </a>
    </header>
    <div class="main">
        <h3 class="light space-b">BjeloPIC Vam želi srećan rođendan!</h3>

        @foreach ($paragraphs as $paragraph)
            <p class="light space-b-small">{{$paragraph}}</p>
        @endforeach

        <div class="space-b"></div>

        <p class="darker space-b-none">Lijepi pozdrav,</p>
        <p class="darker">BjeloPIC Žičani Podatkovni Prijenos</p>
    </div>
    <footer>
        <div class="bold space-b">
            &copy; BjeloPIC {{date("Y")}} | Sva prava pridržana
        </div>
    </footer>
</body>
</html>

