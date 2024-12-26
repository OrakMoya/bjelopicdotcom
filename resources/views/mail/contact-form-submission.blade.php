<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  @vite('resources/css/app.css')
</head>
<body>
    <h1 class="">New contact form submission</h1>
    <ul>
        <li>Name: {{$name}}</li>
        <li>Email: {{$email}}</li>
    </ul>
    <p>{{$contents}}</p>
</body>
</html>

