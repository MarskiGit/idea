<main data-page="main">
    <form data-signin="form" class="align_center" novalidate>
        <h1>Witam</h1>
        <span data-signin="form_error"></span>
        <fieldset>
            <div class="label"><img src="public/img/login_arrow.svg" alt="Login Arrow"></div>
            <input type="text" name="user_name" placeholder="Login">
        </fieldset>
        <fieldset>
            <div class="label"><img src="public/img/key.svg" alt="Key"></div>
            <input type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Hasło">
        </fieldset>

        <button type="submit" class="login_btn">Zaloguj się</button>
    </form>
    <a href="?action=registration" class="r_btn">Rejestracja</a>
</main>