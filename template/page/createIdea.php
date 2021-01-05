<?php dump($params) ?>


<main>
    <h1>Propozycja</h1>
    <form data-create="form">
        <div class="board">
            <h3 class="m_bottom">Opis stanu obecnego</h3>
            <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" data-create="before"></textarea>
            <p class="sign" data-create="be_sign"></p>
        </div>
        <div class="board">
            <h3 class="m_bottom">Propozycja usprawnienia</h3>
            <textarea maxlength="2000" rows="15" placeholder="Proszę wypełnić to pole" data-create="after"></textarea>
            <p class="sign" data-create="af_sign"></p>
        </div>
        <div class="board">
            <h3>Ocena propozycji</h3>
            <table class="rating">
                <tbody>
                    <tr>
                        <td> Propozycja oszczędnościowa 5000 PLN w skali roku:</td>
                        <td>
                            <div class="select">
                                <select name="savings" data-select="savings">
                                    <option value="0">NIE</option>
                                    <option value="1">TAK</option>

                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td> Każda propozycja usprawnieniowa zgłoszona i zaakceptowana: </td>
                        <td>
                            <div class="select">
                                <select name="any_suggestion" data-select="number">
                                    <option value="10">10pkt</option>
                                    <option value="20">20pkt</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>Dodatkowo propozycje związane z:</th>
                        <th> </th>
                    </tr>
                    <tr>
                        <td>Polepszenie BHP: </td>
                        <td>
                            <div class="select">
                                <select name="bhp" data-select="number">
                                    <option value="0">0pkt</option>
                                    <option value="10">10pkt</option>
                                    <option value="20">20pkt</option>
                                    <option value="30">30pkt</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td> Oszczędność czasu energii, materiałów itp:</td>
                        <td>
                            <div class="select">
                                <select name="other_savings" data-select="number">
                                    <option value="0">0pkt</option>
                                    <option value="10">10pkt</option>
                                    <option value="20">20pkt</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td> Samodzielne wdrożenie:</td>
                        <td>
                            <div class="select">
                                <select name="independence" data-select="number">
                                    <option value="0">0pkt</option>
                                    <option value="10">10pkt</option>
                                    <option value="20">20pkt</option>
                                    <option value="30">30pkt</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th> </th>
                        <th> <span>Suma punktów:&nbsp;</span><span class="pktnum">10</span><span>&nbsp;pkt.</span></th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="board">
            <h3>Pomysłodawcy</h3>
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