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
            <input aria-labelledby="idea search" data-list="idea_search" type="search" id="select_search" name="idea_search">
            <span class="massage_error list_massage" data-list="offer_message"></span>
            <button type="submit" class="btn_layout" data-list="button_submit">ZNAJDŹ</button>
        </form>
    </section>
    <section class="offers_container" data-list="offers_container"></section>
    <section class="offers_container last_element hide" data-list="empty_list">
        <div class="IdeaList">
            <h4 class="empty_idea">Brak elementów do wyświetlenia</h4>
        </div>
    </section>

</main>