<main data-page="main">

    <form class="align_center" data-form="form">
        <h1>Rejestracja</h1>
        <span></span>
        <fieldset>
            <div class="label"><i class="fas fa-sign-in-alt"></i></div>
            <input type="text" name="user_name" placeholder="Nazwa użytkownika">
        </fieldset>
        <fieldset>
            <div class="label"><i class="fas fa-key"></i></div>
            <input type="password" name="password" placeholder="Hasło">
        </fieldset>
        <fieldset>
            <div class="label"><i class="fas fa-hat-cowboy"></i></div>
            <div class="option_pkt">
                <select name="rang" data-select="number">
                    <option value="0">Użytkownik</option>
                    <option value="1">Moderator</option>
                    <option value="2">Administrator</option>
                </select>
            </div>
        </fieldset>
        <button type="submit" class="login_btn">Dodaj</button>
    </form>


</main>