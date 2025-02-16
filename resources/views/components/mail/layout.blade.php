
<!DOCTYPE html>
<html style="
        padding: 0;
        background: rgb(20, 20, 20);
">
<head>
    <meta charset="utf-8">
    <meta name="darkreader" content="something">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="padding: 0; margin: 0;">
    <div style="
                height: 100%;
                background: rgb(20, 20, 20);
    ">
        <div style="
                    padding: 48px 16px;
                    max-width: 568px;
                    margin: 0 auto;
                    color: rgb(240,240,240);
                    font-family: 'sans';
        ">
            <x-mail.header />

            {{$slot}}

        </div>
    </div>
</body>
</html>

