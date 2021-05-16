<main data-page="main">
    <?php if (isset($_SESSION['account'])) : ?>
        <script type="module" src="./public/script/admin.esm.js"></script>
        <section class="section_container">
            <p>Witaj: <?php echo  $_SESSION['account']['name'] ?></p>
        </section>

        <section class="section_container">
            <div class="added">
                <section>
                    <h4>Dodaj Obszar</h4>
                    <form data-registration="form_area" novalidate>

                        <span class="massage_error" data-registration="area_error">Uzupełnij wszystkie pola.</span>
                        <fieldset class="wrap-input_my">
                            <input class="input_my" type="text" name="area_name">
                            <span class="focus-input_my"></span>
                            <span class="label-input_my">Nazwa Obszaru</span>
                        </fieldset>
                        <button type="submit" class="button_subbmit">Dodaj</button>
                    </form>
                </section>
                <section>
                    <h4>Dodaj Użytkownika</h4>
                    <form data-registration="form_account" novalidate>

                        <span class="massage_error" data-registration="account_error">Uzupełnij wszystkie pola.</span>
                        <fieldset class="wrap-input_my">
                            <input class="input_my" type="text" name="full_name">
                            <span class="focus-input_my"></span>
                            <span class="label-input_my">Imie i Nazwisko</span>
                        </fieldset>

                        <div style="display: none">
                            <p class="strength_message" data-registration="strength_message"></p>
                            <div class="meter">
                                <span class="strength" data-registration="strength_meter"></span>
                            </div>
                            <fieldset class="wrap-input_my">
                                <input class="input_my" type="password" name="password" data-registration="password">
                                <span class="focus-input_my"></span>
                                <span class="label-input_my">Hasło</span>
                            </fieldset>
                            <fieldset class="wrap-input_my">
                                <input class="input_my" type="password" name="repeat_password" data-registration="repeat_password">
                                <span class="focus-input_my"></span>
                                <span class="label-input_my">Powtórz hasło</span>
                            </fieldset>

                        </div>
                        <fieldset class="wrap-input_my">
                            <input class="input_my" type="number" name="id_pass" min="0" step="1" maxlength="4">
                            <span class="focus-input_my"></span>
                            <span class="label-input_my">Identyfikator</span>
                        </fieldset>
                        <fieldset class="wrap-input_my">
                            <input class="input_my" type="text" name="id_pass" min="0" step="1" maxlength="4">
                            <span class="focus-input_my"></span>
                            <span class="label-input_my">Obszar</span>

                        </fieldset>
                        <fieldset class="wrap-input_my">
                            <select class="input_my has-val" name="area" data-select="area">
                                <option value="0">Użytkownik</option>
                                <option value="1">Moderator</option>
                            </select>
                            <span class="focus-input_my"></span>
                            <span class="label-input_my">Rola</span>

                        </fieldset>
                        <button type="submit" class="button_subbmit">Dodaj</button>
                    </form>

                </section>
            </div>
        </section>

        <section class="section_container"></section>

    <?php else : ?>
        <?php header("location: index.php"); ?>
    <?php endif; ?>
</main>