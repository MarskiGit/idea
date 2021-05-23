<section class="container">
    <section class="wrap_form">
        <form data-form="account" novalidate>
            <legend>Dodaj Użytkownika</legend>
            <fieldset class="wrap-input_my">

                <span class="label-input_my">Imie i Nazwisko</span>
                <input class="input_my" type="text" name="full_name">
            </fieldset>

            <div style="display: none">
                <!-- <fieldset class="wrap-input_my">
                                <p class="strength_message" data-registration="strength_message"></p>
                                <div class="meter">
                                    <span class="strength" data-registration="strength_meter"></span>
                                </div>
                                <span class="label-input_my">Hasło</span>
                                <input class="input_my" type="password" name="password" data-registration="password">
                                
                            </fieldset>
                            <fieldset class="wrap-input_my">
                                <p class="strength_message" data-registration="identical_message"></p>
                                <span class="label-input_my">Powtórz hasło</span>
                                <input class="input_my" type="password" name="repeat_password" data-registration="repeat_password">
                            </fieldset> -->
            </div>

            <fieldset class="wrap-input_my">
                <span class="label-input_my">Identyfikator</span>
                <input class="input_my" type="number" name="id_pass" min="0" step="1" maxlength="4">
            </fieldset>
            <fieldset class="wrap-input_my">
                <span class="label-input_my">Obszar</span>
                <input class="input_my" type="text" name="id_pass" min="0" step="1" maxlength="4">
            </fieldset>
            <fieldset class="wrap-input_my">
                <span class="label-input_my">Rola</span>
                <select class="input_my has-val" name="area" data-select="area">
                    <option value="0">Użytkownik</option>
                    <option value="1">Moderator</option>
                </select>
            </fieldset>
            <span class="massage_error" data-form="account_message"></span>
            <button type="submit" class="button_subbmit">Dodaj</button>
        </form>

    </section>
</section>