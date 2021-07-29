 <!DOCTYPE html>
 <html lang="pl">
 <?php
    $account_rang = intval($_SESSION['account']['rang'] ?? 0);
    ?>

 <head>
     <meta charset="utf-8">
     <title>IDEA BOOK | Program pomysłów</title>
     <meta http-equiv="Cache-control" content="public">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <meta name="apple-mobile-web-app-capable" content="yes">
     <meta name="format-detection" content="telephone=no">
     <meta name="apple-mobile-web-app-status-bar-style" content="black">
     <meta name="description" content="Pracowniczy prgoram pomysłów">
     <meta name="author" content="marski.pl | Mariusz Kępski">
     <meta name="copyright" content="Copyright owner">
     <meta name="robots" content="noindex, nofollow">
     <meta name="csrf-token" content="<?php echo $_SESSION['tokens']['Token']['session'] ?>">
     <link rel="apple-touch-icon" sizes="180x180" href="public/img/favicon/apple-touch-icon.png">
     <link rel="icon" type="image/png" sizes="32x32" href="./public/img/favicon/favicon-32x32.png">
     <link rel="icon" type="image/png" sizes="16x16" href="./public/img/favicon/favicon-16x16.png">

     <link rel="stylesheet" href="./public/style/layout.min.css" type="text/css" media="all">
     <?php switch ($globalParams['action_GET']):
            case 'listOffers': ?>
             <link rel="stylesheet" href="./public/style/listOffers.min.css" type="text/css" media="all">
             <?php break; ?>
         <?php
            case 'formOffer': ?>
             <link rel="stylesheet" href="./public/style/formOffer.min.css" type="text/css" media="all">
             <?php break; ?>
         <?php
            case 'login': ?>
             <link rel="stylesheet" href="./public/style/login.min.css" type="text/css" media="all">
             <?php break; ?>
         <?php
            case 'admin': ?>
             <?php if ($account_rang === 2) : ?>
                 <link rel="stylesheet" href="./public/style/admin.min.css" type="text/css" media="all">
             <?php endif; ?>
             <?php break; ?>
         <?php
            case 'mod': ?>
             <?php if ($account_rang === 1) : ?>
                 <link rel="stylesheet" href="./public/style/mod.min.css" type="text/css" media="all">
             <?php endif; ?>
             <?php break; ?>
         <?php
            default: ?>
             <link rel="stylesheet" href="./public/style/statistics.min.css" type="text/css" media="all">
             <?php break; ?>
     <?php endswitch; ?>
     <script type="module" src="./public/script/layout.esm.js"></script>
 </head>

 <body>
     <nav class="menu" data-page="nav">
         <a rel="home start" href="<?php echo HTTP_SERVER ?>" class="link_home hover_img" data-page="home_nav"><img src="public/img/home_icon.svg" alt="Strona główna"><img src="public/img/border_icon.svg" class="load" data-page="status_indicator" alt=""></a>
         <a rel="list section" href="?action=listOffers" class="link_button <?php echo ($globalParams['action_GET'] === 'listOffers' ? 'active_link' : '') ?>">Lista pomysłów</a>
         <a rel="write section" href="?action=formOffer" class="link_button <?php echo ($globalParams['action_GET'] === 'formOffer' ? 'active_link' : '') ?>">Napisz pomysł</a>
         <div class="page_up hover_img" data-page="page_up"><img src="public/img/page_up.svg" alt="góra strony"></div>
         <div class="info_page">
             <span data-page="list_lenght"></span>
             <span data-page="render_count"></span>
         </div>

         <?php switch ($account_rang):
                case 1: ?>
                 <a rel="signin appendix" href="?action=logout" class="logo_idea">
                     <div class="countdown"><img class="img_logout" src="public/img/icon/logout.png" alt="Logout"><span data-time="countdown">05:00</span></div>
                 </a>
                 <a rel="admin subsection" href="?action=mod" class="link_button">Mod</a>
                 <script type="module" src="./public/script/countdown.esm.js"></script>
                 <?php break; ?>
             <?php
                case 2: ?>
                 <a rel="signin appendix" href="?action=logout" class="logo_idea">
                     <div class="countdown"><img class="img_logout" src="public/img/icon/logout.png" alt="Logout"><span class="countdown_text" data-time="countdown">05:00</span></div>
                 </a>
                 <a rel="admin subsection" href="?action=admin" class="link_button">Admin</a>
                 <script type="module" src="./public/script/countdown.esm.js"></script>
                 <?php break; ?>
             <?php
                default: ?>
                 <a rel="signin appendix" href="?action=login" class="logo_idea"><img src="public/img/idea.png" alt="Idea"></a>
                 <?php break; ?>
         <?php endswitch; ?>
     </nav>

     <div data-js="private" class="no_js">
         <p>Twoja przeglądarka nie wspiera w pełni technologi używanej na stronie.</p>
         <p>Spróbuj w Microsoft Edge lub Google Chrome.</p>
         <p>Jeżeli jednak to poczekaj na załadowanie modółow.</p>
     </div>