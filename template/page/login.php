<script type="module" src="./public/script/login.esm.js"></script>
<main data-page="main">
    <section class="section_container">
        <h1>Witam</h1>

        <form data-form="login" class="align_center" novalidate>

            <span class="massage_error" data-form="message"></span>
            <fieldset class="wrap-input_my">
                <input class="input_my" type="text" name="login">
                <span class="focus-input_my"></span>
                <span class="label-input_my">Login</span>
            </fieldset>
            <fieldset class="wrap-input_my">
                <input class="input_my" type="password" name="password">
                <span class="focus-input_my"></span>
                <span class="label-input_my">Hasło</span>
            </fieldset>
            <button type="submit" class="button_subbmit">Zaloguj się</button>
        </form>
    </section>
</main>