<script defer type="module" src="./public/script/listOffers.esm.js"></script>
<main data-page="main">
    <h1>Idea Book</h1>
    <section class="search_container" data-list="search_container">
        <form data-list="form_search">
            <fieldset>
                <label for="select_search">Wyszukaj</label>
                <select name="select_search" id="select_search" data-list="select_search">
                    <option value="contents">treści</option>
                    <option value="originators">pomysłodawcy</option>
                    <option value="id">numerze</option>
                    <option value="area">obszarze</option>
                </select>
            </fieldset>

            <input data-list="idea_search" type="search" id="select_search">
            <button>ZNAJDŹ</button>

        </form>
    </section>
    <section class="offers_container" data-list="offers_container"></section>

</main>