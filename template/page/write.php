<main data-page="main">
    <h1>Propozycja</h1>
    <form data-write="form" novalidate>

        <fieldset>
            <legend>Opis stanu obecnego</legend>
            <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" name="before" id="before" data-write="before" require></textarea>
            <span class="sign_number" data-write="sign_before"></span>
        </fieldset>

        <fieldset>
            <legend>Propozycja usprawnienia</legend>
            <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" name="after" id="after" data-write="after" require></textarea>
            <span class="sign_number" data-write="sign_after"></span>
        </fieldset>

        <fieldset>
            <legend>Ocena propozycji</legend>
            <div class="rating">
                <?php
                foreach ($params as $key => $value) {
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
                    <input id="creator_search" class="input_search" data-write="creator_search" type="search" autocomplete="off" placeholder="Nazwisko">
                    <ol class="view_ol" data-write="view_creator"></ol>
                    <span>Ten pomysłodawca jest na liście:</span>
                </div>
                <div class="chosen_ones">
                    <label for="select_name" class="list_label">Lista pomysłodawców:</label>
                    <ol class="ones_creator" data-write="chosen_ones"></ol>
                </div>
            </div>
            <span class="sign_number"></span>
        </fieldset>

        <fieldset>
            <legend>Obszar</legend>
            <div class="creator">
                <div class="container_search">
                    <label for="area_search" class="list_label">Wyszukaj i kliknij:</label>
                    <input id="area_search" class="input_search" data-write="area_search" type="search" autocomplete="off" placeholder="Obszar">
                    <ol class="view_ol" data-write="view_area"></ol>
                    <span>Ten obszar jest na liście:</span>
                </div>
                <div class="chosen_ones">
                    <label for="select_name" class="list_label">Wybrany Obszar:</label>
                    <ol class="ones_creator" data-write="chosen_ones_area"></ol>
                </div>
            </div>
            <span class="sign_number"></span>
        </fieldset>
        <button class="add_idea" data-write="add">Wyślij</button>
    </form>

</main>