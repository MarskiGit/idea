<?php var_dump($param) ?>

<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="utf-8">
    <title>IDEA</title>
    <meta http-equiv="X-Ua-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="theme-color" content="#e8952b">
    <meta name="description" content="Pracowniczy prgoram pomysłów">
    <meta name="author" content="Mariusz Kępski">
    <meta name="copyright" content="Copyright owner">
    <meta name="robots" content="noindex, nofollow">
    <link rel="shortcut icon" href="public/img/idea.png" type="image/x-icon" sizes="16x16">
    <link rel="stylesheet" href="public/style/layout.css" type="text/css" media="all">



    <style>
        *,
        *:before,
        *:after {
            margin: 0;
            padding: 0;
            border: 0;
            outline: 0;
            vertical-align: baseline;
            background-color: transparent;
            -webkit-box-sizing: border-box;
            box-sizing: border-box
        }

        html {
            font-size: calc(16px + (28 - 16) * (100vw - 400px) / (1920 - 360));
            scroll-behavior: smooth;
        }

        a {
            display: block;
            text-decoration: none;
        }
    </style>

</head>

<body>
    <header id="section0">

    </header>
    <nav id="section0">
        <a class="btn " href="?action=list">Lista pomysłów</a>
        <a class="btn " href="?action=create">Napisz pomysł</a>
        <div class="logo_idea"></div>
    </nav>