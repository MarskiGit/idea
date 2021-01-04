<main>
    <h1>Propozycja</h1>
    <form data-create="form">
        <div class="board">
            <div class="title">
                <h3>Opis stanu obecnego</h3>
            </div>
            <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" data-create="before"></textarea>
            <p class="sign" data-create="be_sign"></p>
            <div class="title">
                <h3>Propozycja usprawnienia</h3>
            </div>
            <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" data-create="after"></textarea>
            <p class="sign" data-create="af_sign"></p>
        </div>
        <div class="board">
            <div class="title">
                <h3>Ocena propozycji</h3>
            </div>
            <ol class="rating">
                <li>
                    <label>Propozycja oszczędnościowa 5000 PLN w skali roku: </label>
                    <div class="select">
                        <select name="savings" data-select="savings">
                            <option value="0">NIE</option>
                            <option value="1">TAK</option>

                        </select>
                    </div>
                </li>
                <li>
                    <label for="any_suggestion">Każda propozycja usprawnieniowa zgłoszona i zaakceptowana: </label>
                    <div id="any_suggestion" class="select">
                        <select name="any_suggestion" data-select="number">
                            <option value="10">10pkt</option>
                            <option value="20">20pkt</option>
                        </select>
                    </div>
                </li>
                <li class="weight">Dodatkowo propozycje związane z:</li>
                <li>
                    <label for="bhp">Polepszenie BHP: </label>
                    <div id="bhp" class="select">
                        <select name="bhp" data-select="number">
                            <option value="0">0pkt</option>
                            <option value="10">10pkt</option>
                            <option value="20">20pkt</option>
                            <option value="30">30pkt</option>
                        </select>
                    </div>
                </li>
                <li>
                    <label for="other_savings">Oszczędność czasu energii, materiałów itp: </label>
                    <div id="other_savings" class="select">
                        <select name="other_savings" data-select="number">
                            <option value="0">0pkt</option>
                            <option value="10">10pkt</option>
                            <option value="20">20pkt</option>
                        </select>
                    </div>
                </li>
                <li>
                    <label for="independence">Samodzielne wdrożenie:</label>
                    <div id="independence" class="select">
                        <select name="independence" data-select="number">
                            <option value="0">0pkt</option>
                            <option value="10">10pkt</option>
                            <option value="20">20pkt</option>
                            <option value="30">30pkt</option>
                        </select>
                    </div>
                </li>
                <li class="sum_pkt"> <span>Suma punktów:&nbsp;</span><span class="pktnum">10</span><span>&nbsp;pkt.</span></li>
            </ol>
        </div>
        <div class="board">
            <div class="title">
                <h3>Pomysłodawcy</h3>
            </div>
            <div class="user_list">
                <div class="live_search">
                    <span class="error" data-search="error"></span>
                    <label for="search_name" class="list_label">Wyszukaj i kliknij: </label>
                    <input id="search_name" data-search="searchName" type="search" autocomplete="off" placeholder="Nazwisko">
                    <span data-load="live_search">M</span>
                    <div>
                        <ol id="sugestion_name" data-create="sugestionName"></ol>
                    </div>
                </div>
                <div class="user_add_list">
                    <label for="select_name" class="list_label">Lista pomysłodawców: </label>
                    <ol id="select_name" data-create="selectName"></ol>
                </div>
            </div>
        </div>
        <button class="add_idea" data-create="add">Wyślij</button>
    </form>
    <div class="messages" data-create="messages">
        <p> </p>
    </div>
    <div class="area_list popup" data-create="popupArea">
        <p>Wybierz obszar dla pomysłu</p>
        <select class="area" data-create="area">
        </select>
        <button class="btn_area" data-create="btnArea">Akceptuj</button>
    </div>
    <div class="repeat popup" data-user="repeatUser">
        <p>Ten pomysłodawca już jest na liście</p>
        <button class="repeat_ok" data-user="OK">OK</button>
    </div>
</main>