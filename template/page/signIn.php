<main data-page="main">
    <section class="section_container">
        <h1>Witam</h1>

        <form data-signin="form" class="align_center" novalidate>

            <span class="massage_error" data-signin="form_error">Uzupełnij wszystkie pola.</span>
            <fieldset class="wrap-input_my">
                <input class="input_my" type="text" name="user_name">
                <span class="focus-input_my"></span>
                <span class="label-input_my">Login</span>
            </fieldset>
            <fieldset class="wrap-input_my">
                <input class="input_my" type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
                <span class="focus-input_my"></span>
                <span class="label-input_my">Hasło</span>
            </fieldset>

            <button type="submit" class="btn_login">Zaloguj się</button>
        </form>

    </section>
    <a href="?action=registration" class="r_btn">Rejestracja</a>
</main>