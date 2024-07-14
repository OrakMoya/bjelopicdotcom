<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100..900&display=swap" rel="stylesheet" />
     <link rel="icon" type="image/x-icon" href="/favicon.ico">
     <link rel="icon" type="image/x-icon" href="/favicon48.ico">
     <link rel="icon" type="image/x-icon" href="/favicon64.ico">

    @vite('resources/js/app.js')
    @vite(['resources/css/app.css'])
    @inertiaHead
  </head>
  <body class="dark overflow-x-clip">
    @inertia
  </body>
</html
