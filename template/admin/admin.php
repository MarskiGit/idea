<?php if (isset($_SESSION['account'])) : ?>
    <section class="container">
        <p>Administrator</p>
        <h2><?php echo  $_SESSION['account']['name'] ?></h2>
        <ul class="menu_adimn">
            <li class="<?php echo $pageParams['actve_link'] === 'home' ? 'actve_link' : '' ?>">
                <a rel="admin section" href="?action=admin&admin=home" data-link="menu" class="li_button">
                    <img src="public/img/icon/statistics.svg" alt="Statystyki">
                    <span>Statystyki</span>
                </a>
            </li>
            <li class="<?php echo $pageParams['actve_link'] === 'points' ? 'actve_link' : '' ?>">
                <a rel="admin section" href="?action=admin&admin=points" data-link="menu" class="li_button">
                    <img src="public/img/icon/podium.svg" alt="Zarządzanie">
                    <span>Punkty</span>
                </a>
            </li>
            <li class="<?php echo $pageParams['actve_link'] === 'management' ? 'actve_link' : '' ?>">
                <a rel="admin section" href="?action=admin&admin=management" data-link="menu" class="li_button">
                    <img src="public/img/icon/management.svg" alt="Statystyki">
                    <span>Zarządzanie</span>
                </a>
            </li>
            <li class="<?php echo $pageParams['actve_link'] === 'area' ? 'actve_link' : '' ?>">
                <a rel="admin section" href="?action=admin&admin=area" data-link="menu" class="li_button">
                    <img src="public/img/icon/area.svg" alt="Obszar">
                    <span>Obszar</span>
                </a>
            </li>
            <li class="<?php echo $pageParams['actve_link'] === 'user' ? 'actve_link' : '' ?>">
                <a rel="admin section" href="?action=admin&admin=user" data-link="menu" class="li_button">
                    <img src="public/img/icon/user.svg" alt="Użytkownik">
                    <span>Użytkownik</span>
                </a>
            </li>
        </ul>
    </section>
    <section class="container"></section>
<?php else : ?>
    <?php header("location: index.php"); ?>
<?php endif; ?>