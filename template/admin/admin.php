<main data-page="main">
    <?php if (isset($_SESSION['account'])) : ?>
        <script type="module" src="./public/script/admin.esm.js"></script>
        <section class="container">
            <p>Witaj: <?php echo  $_SESSION['account']['name'] ?></p>
        </section>

        <section class="container">
            <section class="wrap_form">
                <h4>Dodaj Obszar</h4>
                <form data-registration="form_area" novalidate>
                    <span class="massage_error" data-registration="area_error">Uzupełnij wszystkie pola.</span>
                    <fieldset class="wrap-input_my">
                        <span class="label-input_my">Nazwa Obszaru</span>
                        <input class="input_my" type="text" name="area_name">
                    </fieldset>
                    <button type="submit" class="button_subbmit">Dodaj</button>
                </form>
            </section>
            <section class="wrap_form">
                <h4>Dodaj Użytkownika</h4>
                <form data-registration="form_account" novalidate>
                    <span class="massage_error" data-registration="account_error">Uzupełnij wszystkie pola.</span>
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
                    <button type="submit" class="button_subbmit">Dodaj</button>
                </form>

            </section>
        </section>

        <section class="container"></section>

    <?php else : ?>
        <?php header("location: index.php"); ?>
    <?php endif; ?>
</main>