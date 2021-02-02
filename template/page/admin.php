<main data-page="main">
    <?php if (intval($_SESSION['account']['rang'] ?? 0) === 2) : ?>
        <button class="btn_logout" data-admin="logOut">Wyloguj</button>
        <section class="container">
            <section>
                <form data-form="form">
                    <h1>Rejestracja</h1>
                    <span></span>
                    <fieldset>
                        <div class="label"><img src="public/img/login_arrow.svg" alt="Login Arrow"></div>
                        <input type="text" name="user_name" placeholder="Nazwa użytkownika">
                    </fieldset>
                    <fieldset>
                        <div class="label"><img src="public/img/key.svg" alt="Key"></div>
                        <input type="password" name="password" placeholder="Hasło">
                    </fieldset>
                    <fieldset>
                        <div class="label"><img src="public/img/id_card.svg" alt="Id Card"></div>
                        <input type="number" name="user_number" placeholder="Identyfikator" min="0" step="0.1"><span class="validity"></span>
                    </fieldset>
                    <fieldset>
                        <div class="label"><img src="public/img/user.svg" alt="User"></div>
                        <div class="option_pkt">
                            <select name="rang" data-select="number">
                                <option value="0">Użytkownik</option>
                                <option value="1">Moderator</option>
                                <option value="2">Administrator</option>
                            </select>
                        </div>
                    </fieldset>
                    <button type="submit" class="btn_add">Dodaj</button>
                </form>
            </section>


        </section>
    <?php endif; ?>
</main>