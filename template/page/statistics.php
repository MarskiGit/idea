<script type="module" src="./public/script/home.esm.js"></script>
<?php

$counter = 1;

// dump($pageParams); 
?>
<main data-page="main">

    <section class="container">
        <div data-js="private">
            <p>Twoja przeglądarka nie wspiera w pełni technologi używanej na stronie.</p>
            <p>Spróbuj w Microsoft Edge lub Google Chrome.</p>
            <p>Jeżeli jednak to poczekaj na załadowanie modółow.</p>
        </div>
    </section>

    <h1>Statystyki</h1>
    <section class="container wrap_header">
        <h2>Top 10</h2>
    </section>
    <section class="container">
        <section class="wrap_context">
            <h3>Pomysłodawców</h3>
            <table>
                <thead>
                    <tr>
                        <th>Miejsce</th>
                        <th>Imie Nazwisko</th>
                        <th>Liczba propozycji</th>
                        <th>Zdobyte punkty</th>

                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($pageParams['topTen'] as $key => $value) : ?>
                        <tr>
                            <td><?php echo $counter ?></td>
                            <td><?php echo $value['full_name'] ?></td>
                            <td><?php echo $value['offers_implemented'] ?></td>
                            <td><?php echo $value['awarded_points']; ?></td>

                        </tr>
                        <?php $counter++ ?>
                    <?php endforeach; ?>
                <tbody>
            </table>
        </section>

        <section class="wrap_context">
            <h3>Działów</h3>
            <table>
                <thead>
                    <tr>
                        <th>Miejsce</th>
                        <th>Obszar</th>
                        <th>Zdobyte punkty</th>
                        <th>Liczba propozycji</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <?php foreach ($pageParams['topTen'] as $key => $value) : ?>
                        <tr>
                            <td><?php echo $counter ?></td>
                            <td><?php echo $value['full_name'] ?></td>
                            <td><?php echo $value['awarded_points']; ?></td>
                            <td><?php echo $value['offers_implemented'] ?></td>
                        </tr>
                        <?php $counter++ ?>
                    <?php endforeach; ?> -->
                <tbody>
            </table>
        </section>
    </section>
</main>
<!-- s9m2ajfPP[32^B: -->