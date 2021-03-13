<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Kenny Lowell Ngaosi">
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
        <title>{{ env("APP_NAME") }}</title>
    </head>
    <body class="antialiased">

        <div id="app">
            <app-header></app-header>
            <app></app>
            <app-footer></app-footer>
        </div>
    </body>
    <script src="{{ mix('js/app.js') }}"></script>
</html>
