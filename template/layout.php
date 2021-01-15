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
    <script defer type="module" src="public/script/idea.js"></script>
    <?php switch ($params['action']):
        case 'listIdea': ?>
            <link rel="stylesheet" href="public/style/list.css" type="text/css" media="all">
            <script defer type="module" src="public/script/list.js"></script>
            <?php break; ?>
        <?php
        case 'writeIdea': ?>
            <link rel="stylesheet" href="public/style/write.css" type="text/css" media="all">
            <script defer type="module" src="public/script/write.js"></script>
            <?php break; ?>
        <?php
        case 'loginIdea': ?>
            <link rel="stylesheet" href="public/style/login.css" type="text/css" media="all">
            <script defer type="module" src="public/script/login.js"></script>
            <?php break; ?>
        <?php
        default: ?>
            <link rel="stylesheet" href="public/style/statistics.css" type="text/css" media="all">
            <!-- <script defer type="module" src="public/script/statistics.js"></script> -->
            <?php break; ?>
    <?php endswitch; ?>
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
            color: #ffffff;
        }
    </style>

</head>

<body>
    <scroll-page id="top_page"></scroll-page>
    <header>

    </header>
    <nav data-page="nav">

        <a href="http://h.localhost/01_MOJE/01_GIT/idea/" class="home_nav hover_img"><img src="public/img/home_icon.svg"><img src="public/img/border_icon.svg" class="load" data-page="status_indicator"></a>
        <a href="?action=list" class="a_btn">Lista pomysłów</a>
        <a href="?action=write" class="a_btn">Napisz pomysł</a>
        <a href="#top_page" class="page_up hover_img" data-page="page_up"><img src="public/img/page_up.svg"></a>
        <a href="?action=login" class="logo_idea"><img src="public/img/idea.png" alt="Idea"></a>

    </nav>