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
     <meta name="author" content="marski.pl | Mariusz Kępski">
     <meta name="copyright" content="Copyright owner">
     <meta name="robots" content="noindex, nofollow">
     <link rel="apple-touch-icon" sizes="180x180" href="public/img/favicon/apple-touch-icon.png">
     <link rel="icon" type="image/png" sizes="32x32" href="public/img/favicon/favicon-32x32.png">
     <link rel="icon" type="image/png" sizes="16x16" href="public/img/favicon/favicon-16x16.png">
     <link rel="manifest" href="public/img/favicon/site.webmanifest">
     <meta name="msapplication-TileColor" content="#da532c">
     <meta name="theme-color" content="#ffffff">


     <link rel="stylesheet" href="./public/style/layout.min.css" type="text/css" media="all">
     <script type="module" src="./public/script/layout.esm.js"></script>
     <?php switch ($globalParams['action_GET']):
            case 'list': ?>
             <link rel="stylesheet" href="./public/style/list.min.css" type="text/css" media="all">
             <script defer type="module" src="./public/script/list.esm.js"></script>
             <?php break; ?>
         <?php
            case 'form': ?>
             <link rel="stylesheet" href="./public/style/write.min.css" type="text/css" media="all">
             <script type="module" src="./public/script/writeIdea.esm.js"></script>
             <?php break; ?>
         <?php
            case 'signin': ?>
             <link rel="stylesheet" href="./public/style/signIn.min.css" type="text/css" media="all">
             <script type="module" src="./public/script/signIn.esm.js"></script>
             <?php break; ?>
         <?php
            case 'admin': ?>
             <?php if (intval($_SESSION['account']['rang'] ?? 0) === 2) : ?>
                 <link rel="stylesheet" href="./public/style/admin.min.css" type="text/css" media="all">
                 <script type="module" src="./public/script/admin.esm.js"></script>
             <?php endif; ?>
             <?php break; ?>
         <?php
            case 'mod': ?>
             <link rel="stylesheet" href="./public/style/admin.min.css" type="text/css" media="all">
             <script type="module" src="./public/script/admin.esm.js"></script>
             <?php break; ?>
         <?php
            case 'registration': ?>
             <link rel="stylesheet" href="./public/style/registration.min.css" type="text/css" media="all">
             <script type="module" src="./public/script/registration.esm.js"></script>
             <?php break; ?>
         <?php
            default: ?>
             <link rel="stylesheet" href="./public/style/home.min.css" type="text/css" media="all">
             <!-- <script defer type="module" src="public/script/home.js"></script> -->
             <?php break; ?>
     <?php endswitch; ?>
 </head>

 <body>
     <nav class="menu" data-page="nav">
         <a rel="home start" href="<?php echo HTTP_SERVER ?>" class="link_home hover_img" data-page="home_nav"><img src="public/img/home_icon.svg" alt="Strona główna"><img src="public/img/border_icon.svg" class="load" data-page="status_indicator" alt=""></a>
         <a rel="list section" href="?action=list" class="link_button">Lista pomysłów</a>
         <a rel="write section" href="?action=form" class="link_button">Napisz pomysł</a>
         <div class="page_up hover_img" data-page="page_up"><img src="public/img/page_up.svg" alt="góra strony"></div>
         <a rel="signin appendix" href="?action=signin" class="logo_idea"><img src="public/img/idea.png" alt="Idea"></a>
         <?php if (intval($params['action_GET']['rang'] ?? 0) === 2) : ?> <a rel="admin subsection" href="?action=admin" class="link_button">Admin</a> <?php endif; ?>
         <?php if (intval($params['action_GET']['rang'] ?? 0) === 1) : ?> <a rel="admin subsection" href="?action=mod" class="link_button">Mod</a> <?php endif; ?>
     </nav>