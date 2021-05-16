<script type="module" src="./public/script/writeIdea.esm.js"></script>
<main data-page="main">

    <section class="section_container">
        <h1>Propozycja</h1>

        <form data-write="form" novalidate>

            <fieldset>
                <legend>Opis stanu obecnego</legend>
                <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" name="before" id="before" data-write="before" require></textarea>
                <span class="sign_number" data-write="sign_number"></span>
            </fieldset>

            <fieldset>
                <legend>Propozycja usprawnienia</legend>
                <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" name="after" id="after" data-write="after" require></textarea>
                <span class="sign_number" data-write="sign_number"></span>
            </fieldset>

            <fieldset>
                <legend>Ocena propozycji</legend>
                <div class="rating">
                    <?php
                    foreach ($pageParams as $key => $value) {
                        $title = $value['title'];
                        $value_option = $value['value_option'];
                        $name_option = $value['name_option'];
                        $header = $value['header'];
                        if (!$header) {
                            $value_option  = explode(',', $value_option);
                            echo "<div class='options_rating'><span>$title</span><div class='option_pkt'><select>";
                            foreach ($value_option as $key => $value) {
                                // $output = preg_replace('/[^0-9]/', '', $value); pozostawia tylko cyfry
                                echo "<option value=" . $value . ">$value</option>";
                            }
                            echo '</select></div></div>';
                        } else {
                            echo "<div class='title_rating'>$title</div>";
                        }
                    }
                    ?>
                    <div class="number_rating"> <span>Suma punktów:&nbsp;</span><span class="pktnum" data-write="view_points">10</span><span>&nbsp;pkt.</span></div>
                </div>
                <span class="sign_number"></span>
            </fieldset>

            <fieldset>
                <legend>Pomysłodawcy</legend>
                <div class="creator">
                    <div class="container_search">
                        <label for="creator_search" class="list_label">Wyszukaj i kliknij:</label>
                        <input id="creator_search" type="search" class="input_search" data-write="creator_search" type="search" autocomplete="off" placeholder="Nazwisko">
                        <ul class="view_ul" data-write="ul_creator"></ul>
                        <span>Ten pomysłodawca jest na liście:</span>
                    </div>
                    <div class="chosen_ones">
                        <label for="select_name" class="list_label">Lista pomysłodawców:</label>
                        <ul class="chosen_list" data-write="chosen_ones"></ul>
                    </div>
                </div>
                <span class="sign_number"></span>
            </fieldset>

            <fieldset>
                <legend>Obszar</legend>
                <div class="creator">
                    <div class="container_search">
                        <label for="area_search" class="list_label">Wyszukaj i kliknij:</label>
                        <input id="area_search" type="search" class="input_search" data-write="area_search" type="search" autocomplete="off" placeholder="Obszar">
                        <ul class="view_ul" data-write="ul_area"></ul>
                        <span>Ten obszar jest na liście:</span>
                    </div>
                    <div class="chosen_ones">
                        <label for="select_name" class="list_label">Wybrany Obszar:</label>
                        <ul class="chosen_list" data-write="chosen_ones_area"></ul>
                    </div>
                </div>
                <span class="sign_number"></span>
            </fieldset>
            <span class="write_error massage_error" data-write="form_error">Uzupełnij wszystkie pola.</span>
            <button class="btn_write" data-write="add">Wyślij</button>
        </form>
    </section>
</main>