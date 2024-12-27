<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="darkreader-lock">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
     <link rel="icon" type="image/x-icon" href="/favicon.ico">
     <link rel="icon" type="image/x-icon" href="/favicon48.ico">
     <link rel="icon" type="image/x-icon" href="/favicon64.ico">
    <title>BjeloPIC</title>


    @vite('resources/js/app.js')
    @vite(['resources/css/app.css'])
    @inertiaHead
    @googlefonts
  </head>
  <body class="dark overflow-x-clip">
    @inertia
  </body>
</html>
