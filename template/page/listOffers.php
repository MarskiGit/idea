<main data-page="main">
    <h1>Idea Book</h1>
    <section class="search_container" data-list="search_container">
        <div class="search_toggle" data-list="search_toggle">
            <img src="public/img/search.svg" alt="Szukaj">
        </div>
        <form data-list="form_search">
            <fieldset class="option_search">
                <select name="option_search" aria-labelledby="option search" data-list="option_search">
                    <option value="contents">Pomysł:</option>
                    <option value="originators">Pomysłodawca:</option>
                    <option value="topic">Temat:</option>
                    <option value="area">Obszar:</option>
                </select>
            </fieldset>
            <input aria-labelledby="idea search" data-list="idea_search" type="search" id="select_search">
            <button type="submit">ZNAJDŹ</button>
        </form>
    </section>
    <section class="offers_container" data-list="offers_container"></section>

</main>