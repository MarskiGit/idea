<script defer type="module" src="./public/script/listOffers.esm.js"></script>
<main data-page="main">
    <h1>Idea Book</h1>
    <section class="search_container" data-list="search_container">
        <form data-list="form_search">
            <fieldset>
                <span>Wyszukaj po:</span>
                <div class="option_search">
                    <select name="option_search" aria-labelledby="option search" data-list="option_search">
                        <option value="contents">treści</option>
                        <option value="originators">pomysłodawcy</option>
                        <option value="id">numerze</option>
                        <option value="area">obszarze</option>
                    </select>
                </div>
            </fieldset>

            <input aria-labelledby="idea search" data-list="idea_search" type="search" id="select_search">
            <button>ZNAJDŹ</button>

        </form>
    </section>
    <section class="offers_container" data-list="offers_container"></section>

</main>