<!-- <?php dump($_SESSION); ?> -->
<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="utf-8">
    <title>IDEA | Program pomysłów</title>
    <meta http-equiv="X-Ua-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="description" content="Pracowniczy prgoram pomysłów">
    <meta name="author" content="Mariusz Kępski">
    <meta name="copyright" content="Copyright owner">
    <meta name="robots" content="noindex, nofollow">
    <link rel="shortcut icon" href="public/img/idea.png" type="image/x-icon" sizes="16x16">

    <link rel="stylesheet" href="public/style/layout.min.css" type="text/css" media="all">
    <script defer type="module" src="./public/script/layout.esm.js"></script>
    <?php switch ($params['action']):
        case 'listIdea': ?>
            <link rel="stylesheet" href="public/style/list.min.css" type="text/css" media="all">
            <script defer type="module" src="public/script/list.esm.js"></script>
            <?php break; ?>
        <?php
        case 'writeIdea': ?>
            <link rel="stylesheet" href="public/style/write.min.css" type="text/css" media="all">
            <script defer type="module" src="public/script/write.esm.js"></script>
            <?php break; ?>
        <?php
        case 'signinIdea': ?>
            <link rel="stylesheet" href="public/style/signIn.min.css" type="text/css" media="all">
            <script defer type="module" src="public/script/signIn.esm.js"></script>
            <?php break; ?>
        <?php
        case 'adminIdea': ?>
            <?php if (intval($_SESSION['account']['rang'] ?? 0) === 2) : ?>
                <link rel="stylesheet" href="public/style/admin.min.css" type="text/css" media="all">
                <script defer type="module" src="public/script/admin.esm.js"></script>
            <?php endif; ?>
            <?php break; ?>
        <?php
        case 'modIdea': ?>
            <link rel="stylesheet" href="public/style/admin.min.css" type="text/css" media="all">
            <script defer type="module" src="public/script/admin.esm.js"></script>
            <?php break; ?>
        <?php
        case 'registrationIdea': ?>
            <link rel="stylesheet" href="public/style/registration.min.css" type="text/css" media="all">
            <script defer type="module" src="public/script/registration.esm.js"></script>
            <?php break; ?>
        <?php
        default: ?>
            <link rel="stylesheet" href="public/style/home.min.css" type="text/css" media="all">
            <!-- <script defer type="module" src="public/script/home.js"></script> -->
            <?php break; ?>
    <?php endswitch; ?>
</head>

<body>
    <nav class="menu" data-page="nav">
        <a href="http://h.localhost/01_MOJE/01_GIT/idea/" class="home_nav hover_img" data-page="home_nav"><img src="public/img/home_icon.svg"><img src="public/img/border_icon.svg" class="load" data-page="status_indicator"></a>
        <a href="?action=list" class="a_btn">Lista pomysłów</a>
        <a href="?action=write" class="a_btn">Napisz pomysł</a>
        <a href="#" class="page_up hover_img" data-page="page_up"><img src="public/img/page_up.svg"></a>
        <a href="?action=signin" class="logo_idea"><img src="public/img/idea.png" alt="Idea"></a>
        <?php if (intval($params['account']['rang'] ?? 0) === 2) : ?> <a href="?action=admin" class="a_btn">Admin</a> <?php endif; ?>
        <?php if (intval($params['account']['rang'] ?? 0) === 1) : ?> <a href="?action=admin" class="a_btn">Mod</a> <?php endif; ?>
    </nav>