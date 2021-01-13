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
            <div class="rating" name="after" id="rating" data-write="rating">
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
                <div class="number_rating"> <span>Suma punktów:&nbsp;</span><span class="pktnum" data-write="sum_pkt">10</span><span>&nbsp;pkt.</span></div>
            </div>
            <span class="sign_number" data-write=""></span>
        </fieldset>


        <fieldset>
            <legend>Pomysłodawcy</legend>
            <div class="user_list" name="originators" id="originators">
                <div class="live_search">
                    <span class="error" data-search="error"></span>
                    <label for="search_name" class="list_label">Wyszukaj i kliknij: </label>
                    <input id="search_name" data-search="searchName" type="search" autocomplete="off" placeholder="Nazwisko">
                    <span data-load="live_search">M</span>
                    <div>
                        <ol id="sugestion_name" data-write="sugestionName"></ol>
                    </div>
                </div>
                <div class="user_add_list">
                    <label for="select_name" class="list_label">Lista pomysłodawców: </label>
                    <ol id="select_name" data-write="selectName"></ol>
                </div>
            </div>
        </fieldset>
        <button class="add_idea" data-write="add">Wyślij</button>
    </form>


    <div class="messages" data-write="messages">
        <p> </p>
    </div>
    <div class="area_list popup" data-write="popupArea">
        <p>Wybierz obszar dla pomysłu</p>
        <select class="area" data-write="area">
        </select>
        <button class="btn_area" data-write="btnArea">Akceptuj</button>
    </div>
    <div class="repeat popup" data-user="repeatUser">
        <p>Ten pomysłodawca już jest na liście</p>
        <button type="submit" class="repeat_ok" data-user="OK">OK</button>
    </div>
</main>