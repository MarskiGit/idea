<script type="module" src="./public/script/formOffer.esm.js"></script>
<main data-page="main">
    <h1>Propozycja</h1>
    <form data-form="offer" novalidate>
        <fieldset>
            <legend>Opis stanu obecnego</legend>
            <textarea maxlength=" 2000" rows="15" placeholder="Proszę wypełnić to pole" name="before" id="before" data-write="before" require></textarea>
            <div class="characters">
                <span class="sign caption">Liczba słów:&nbsp</span> <span class="sign number" data-form="before-words">0</span>
                <span class="sign caption">Liczba zdań:&nbsp</span> <span class="sign number" data-form="before-sentences">0</span>
                <span class="sign caption">Liczba Znaków:&nbsp</span> <span class="sign number" data-form="before-characters">0</span>
            </div>
        </fieldset>

        <fieldset>
            <legend>Propozycja usprawnienia</legend>
            <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" name="after" id="after" data-write="after" require></textarea>
            <div class="characters">
                <span class="sign caption">Liczba słów:&nbsp</span> <span class="sign number" data-form="after-words">0</span>
                <span class="sign caption">Liczba zdań:&nbsp</span> <span class="sign number" data-form="after-sentences">0</span>
                <span class="sign caption">Liczba Znaków:&nbsp</span> <span class="sign number" data-form="after-characters">0</span>
            </div>
        </fieldset>

        <fieldset>
            <legend>Ocena propozycji</legend>
            <div class="rating">
                <?php foreach ($pageParams['offerRating'] ?? [] as $key => $value) : ?>
                    <?php if ((int)$value['header']) : ?>
                        <div class='title_rating'><?php echo $value['title'] ?></div>
                    <?php else : ?>
                        <div class='options_rating'>
                            <span><?php echo $value['title'] ?></span>
                            <div class='option_pkt' id="<?php echo $value['name_option'] ?>">
                                <select aria-labelledby="<?php echo $value['name_option'] ?>" name="<?php echo $value['name_option'] ?>">
                                    <?php $value_option  = explode(',', $value['value_option']); ?>
                                    <?php foreach ($value_option as $option) : ?>
                                        <option value="<?php echo $option ?> "><?php echo $option ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>
                <div class="number_rating"> <span>Suma punktów:&nbsp;</span><span class="pktnum" data-form="view_points">10</span><span>&nbsp;pkt.</span></div>
            </div>
            <span class="sign_number"></span>
        </fieldset>

        <fieldset>
            <legend>Pomysłodawcy</legend>
            <div class="creator">
                <div class="container_search">
                    <label for="creator_search" class="list_label">Wyszukaj i kliknij:</label>
                    <input id="creator_search" type="search" class="input_search" data-search="creator_search" type="search" autocomplete="off" placeholder="Nazwisko">
                    <ul class="search_ul" data-search="ul_creator"></ul>
                    <span>Ten pomysłodawca jest na liście:</span>
                </div>
                <div class="chosen_ones">
                    <label for="select_name" class="list_label">Lista pomysłodawców:</label>
                    <ul class="chosen_ul" data-search="chosen_ones"></ul>
                </div>
            </div>
            <span class="sign_number"></span>
        </fieldset>

        <fieldset>
            <legend>Obszar</legend>
            <div class="creator">
                <div class="container_search">
                    <label for="area_search" class="list_label">Wyszukaj i kliknij:</label>
                    <input id="area_search" type="search" class="input_search" data-search="area_search" type="search" autocomplete="off" placeholder="Obszar">
                    <ul class="search_ul" data-search="ul_area"></ul>
                    <span>Ten obszar jest na liście:</span>
                </div>
                <div class="chosen_ones">
                    <label for="select_name" class="list_label">Wybrany Obszar:</label>
                    <ul class="chosen_ul" data-search="chosen_ones_area"></ul>
                </div>
            </div>
            <span class="sign_number"></span>
        </fieldset>
        <span class="massage_error offer_massage" data-form="offer_message"></span>
        <button class="offer_button" data-form="add">Wyślij</button>
    </form>
</main>