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
     <link rel="icon" type="image/png" href="./public/img/favicon.png" />

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
     <?php if ($globalParams['supportJS']) : ?>
         <script type="module" src="./public/script/index.esm.js"></script>
     <?php endif; ?>
 </head>

 <body>
     <nav class="menu" data-page="nav">
         <a rel="home start" href="<?php echo HTTP_SERVER ?>" class="link_home btn_layout <?php echo ($globalParams['action_GET'] === 'statistics' ? 'active_btn' : '') ?>" data-page="home_nav">
             <span>H</span>
             <img src="public/img/home_icon.svg" alt="Strona główna" class="img_home">
         </a>
         <a rel="list section" href="?action=listOffers" class="btn_layout <?php echo ($globalParams['action_GET'] === 'listOffers' ? 'active_btn' : '') ?>">Lista pomysłów</a>
         <a rel="write section" href="?action=formOffer" class="btn_layout <?php echo ($globalParams['action_GET'] === 'formOffer' ? 'active_btn' : '') ?>">Napisz pomysł</a>
         <div class="btn_layout hover_img" data-page="page_up"><img src="public/img/page_up.svg" alt="góra strony" class="img_home"><span>H</span></div>
         <div class="info_page">
             <span data-page="list_lenght"></span>
             <span data-page="render_count"></span>
         </div>

         <?php switch ($account_rang):
                case 1: ?>
                 <a rel="signin appendix" href="?action=logout" class="logo_idea">
                     <div class="btn_layout countdown"><img class="img_logout" src="public/img/icon/logout.svg" alt="Logout"><span data-time="countdown">05:00</span></div>
                 </a>
                 <a rel="admin subsection" href="?action=mod" class="btn_layout">Mod</a>
                 <?php break; ?>
             <?php
                case 2: ?>
                 <a rel="signin appendix" href="?action=logout" class="logo_idea">
                     <div class="btn_layout countdown"><img class="img_logout" src="public/img/icon/logout.svg" alt="Logout"><span class="countdown_text" data-time="countdown">05:00</span></div>
                 </a>
                 <a rel="admin subsection" href="?action=admin" class="btn_layout <?php echo ($globalParams['action_GET'] === 'admin' ? 'active_btn' : '') ?>">Admin</a>
                 <?php break; ?>
             <?php
                default: ?>
                 <a rel="signin appendix" href="?action=login" class="logo_idea"><img src="public/img/idea_book.svg" alt="Idea"></a>
                 <?php break; ?>
         <?php endswitch; ?>
     </nav>

     <?php if (!$globalParams['supportJS']) : ?>
         <div data-js="private" class="no_js">
             <p>Twoja przeglądarka nie wspiera w pełni technologi używanej na stronie.</p>
             <p>Z tego powodu jej dalsze działanie jest zatrzymane.</p>
             <p>Spróbuj w Microsoft Edge lub Google Chrome.</p>
         </div>
     <?php endif; ?>