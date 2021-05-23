<?php if (isset($_SESSION['account'])) : ?>

    <script type="module" src="./public/script/admin.esm.js"></script>
    <section class="container">
        <h2>Witaj: <?php echo  $_SESSION['account']['name'] ?></h2>
        <ul>
            <li class="<?php echo $pageParams['actve_link'] === 'home' ? 'display' : 'hide' ?>">
                <a rel="admin section" href="?action=admin&admin=home" data-link="menu" class="li_button">
                    <img src="public/img/icon/mangament.png" alt="Zarządzanie">
                    <span>Zarządzanie</span>
                </a>
            </li>
            <li class="<?php echo $pageParams['actve_link'] === 'area' ? 'display' : 'hide' ?>">
                <a rel="admin section" href="?action=admin&admin=area" data-link="menu" class="li_button">
                    <img src="public/img/icon/area.png" alt="Obszar">
                    <span>Obszar</span>
                </a>
            </li>
            <li class="<?php echo $pageParams['actve_link'] === 'user' ? 'display' : 'hide' ?>">
                <a rel="admin section" href="?action=admin&admin=user" data-link="menu" class="li_button">
                    <img src="public/img/icon/user.png" alt="Użytkownik">
                    <span>Użytkownik</span>
                </a>
            </li>
            <li class="<?php echo $pageParams['actve_link'] === 'statistics' ? 'display' : 'hide' ?>">
                <a rel="admin section" href="?action=admin&admin=statistics" data-link="menu" class="li_button">
                    <img src="public/img/icon/statistics.png" alt="Statystyki">
                    <span>Statystyki</span>
                </a>
            </li>
        </ul>
    </section>
    <section class="container"></section>
<?php else : ?>
    <?php header("location: index.php"); ?>
<?php endif; ?>