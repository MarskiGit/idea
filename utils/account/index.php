<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="utf-8">
    <title>Login z haszem</title>
    <link rel="stylesheet" href="style.css" type="text/css" media="all">
    <script type="module" src="./account.esm.js"></script>

</head>

<body>
    <main>
        <section class="wrap_form">
            <h4>Dodawanie Super Admina</h4>
            <form data-registration="form" class="align_center" novalidate>

                <span class="massage_error" data-registration="form_error">Uzupełnij wszystkie pola.</span>
                <fieldset class="wrap-input_my">
                    <span class="label-input_my">Imie i Nazwisko</span>
                    <input class="input_my" type="text" name="full_name">

                </fieldset>
                <fieldset class="wrap-input_my">
                    <span class="label-input_my">Login</span>
                    <input class="input_my" type="text" name="login">
                </fieldset>

                <fieldset class="wrap-input_my">
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

                </fieldset>

                <fieldset class="wrap-input_my">
                    <span class="label-input_my">Identyfikator</span>
                    <input class="input_my" type="number" name="id_pass" min="0" step="1" maxlength="4">

                </fieldset>
                <fieldset class="wrap-input_my">
                    <span class="label-input_my">Ranga</span>
                    <select class="input_my has-val" name="rang" data-select="number">
                        <option value="2">Administrator</option>
                    </select>



                </fieldset>
                <button type="submit" class="button_subbmit">Dodaj</button>
            </form>
        </section>

    </main>



</body>

</html>