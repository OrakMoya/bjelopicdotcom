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
        .space-b{
            margin-bottom: 8px;
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
            padding: 12px 12px 0 12px;
            height: 50px;
        }
        header img{
            height: 100%;
        }
        .light{
            color: rgb(240,240,240);
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
            <img src="https://bjelopic.com/bjelopic_banner.png" alt="bjelopic-banner" />
        </a>
    </header>
    <div class="main">
        <h1 class="light">New contact form submission</h1>
        <span class="darker smaller">A user submitted the contact form on the website. The details are below:</span>
        <div>
            <ul class="bigger light">
                <li class="light"><span>Name: </span>{{$name}}</li>
                <li class="light"><span>Email: </span><a class="links" href="mailto:{{$email}}">{{$email}}</a></li>
                <li class="light"><span>Time: </span>{{Carbon::now()}}</li>
            </ul>

            <span class="darker smaller">The user wrote:</span>

            <span class="bigger light">{{$contents}}</span>
        </div>
    </div>
    <footer>
        <div class="bold space-b">
            &copy; BjeloPIC {{date("Y")}} | Sva prava pridržana
        </div>
        <div class="darker smaller">
            You received this email either because you either opted into sending a copy of your form submission to you, or because you are BjeloPIC staff.
        </div>
    </footer>
</body>
</html>

