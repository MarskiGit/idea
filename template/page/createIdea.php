<main data-page="main">
    <h1>Propozycja</h1>
    <form data-create="form">
        <div class="board">
            <h3 class="m_bottom">Opis stanu obecnego</h3>
            <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" data-create="before" require></textarea>
            <p class="sign" data-error="before"></p>
        </div>
        <div class="board">
            <h3 class="m_bottom">Propozycja usprawnienia</h3>
            <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" data-create="after" require></textarea>
            <p class="sign" data-error="after"></p>
        </div>
        <div class="board">
            <h3>Ocena propozycji</h3>
            <table class="rating" data-create="rating">
                <tbody>
                    <?php
                    foreach ($params as $key => $value) {
                        $title = $value['title'];
                        $value_option = $value['value_option'];
                        $name_option = $value['name_option'];
                        $header = $value['header'];
                        if (!$header) {
                            $value_option  = explode(',', $value_option);
                            echo "<tr><td>$title</td><td><div class='select'><select name='$name_option' data-select='$name_option'>";
                            foreach ($value_option as $key => $value) {
                                // $output = preg_replace('/[^0-9]/', '', $value);
                                echo "<option value=" . $value . ">$value</option>";
                            }
                        } else {
                            echo "<th>$title</th><th> </th>";
                        }
                        echo '</select></div></td></tr>';
                    }
                    ?>
                    <th> </th>
                    <th class="a_center"> <span>Suma punktów:&nbsp;</span><span class="pktnum" data-create="sum_pkt">10</span><span>&nbsp;pkt.</span></th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="board">
            <h3>Pomysłodawcy</h3>
            <div class="user_list">
                <div class="live_search">
                    <span class="error" data-search="error"></span>
                    <label for="search_name" class="list_label">Wyszukaj i kliknij: </label>
                    <input id="search_name" data-search="searchName" type="search" autocomplete="off" placeholder="Nazwisko">
                    <span data-load="live_search">M</span>
                    <div>
                        <ol id="sugestion_name" data-create="sugestionName"></ol>
                    </div>
                </div>
                <div class="user_add_list">
                    <label for="select_name" class="list_label">Lista pomysłodawców: </label>
                    <ol id="select_name" data-create="selectName"></ol>
                </div>
            </div>
        </div>
        <button class="add_idea" data-create="add">Wyślij</button>
    </form>
    <div class="messages" data-create="messages">
        <p> </p>
    </div>
    <div class="area_list popup" data-create="popupArea">
        <p>Wybierz obszar dla pomysłu</p>
        <select class="area" data-create="area">
        </select>
        <button class="btn_area" data-create="btnArea">Akceptuj</button>
    </div>
    <div class="repeat popup" data-user="repeatUser">
        <p>Ten pomysłodawca już jest na liście</p>
        <button type="submit" class="repeat_ok" data-user="OK">OK</button>
    </div>
</main>