<main data-page="main">
    <form data-form="registration" class="align_center" novalidate>
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
        <div class="meter">
            <span class="strength" data-form="strength-meter"></span>
        </div>
        <p class="strength-mesage" data-form="strength-mesage"></p>
        <fieldset>
            <div class="label"><img src="public/img/id_card.svg" alt="Id Card"></div>
            <input type="number" name="user_number" placeholder="Identyfikator" min="0" step="1" maxlength="4">
        </fieldset>
        <fieldset>
            <div class="label"><img src="public/img/user.svg" alt="User"></div>
            <div class="option">
                <select name="rang" data-select="number">
                    <option value="0">Użytkownik</option>
                    <option value="1">Moderator</option>
                    <option value="2">Administrator</option>
                </select>
            </div>
        </fieldset>
        <button type="submit" class="btn_add">Dodaj</button>
    </form>
</main>