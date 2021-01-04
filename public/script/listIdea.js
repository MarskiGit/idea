'use strict';
import {
    dataFetch,
    windowScroll
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {

    class IdeaList {
        constructor() {
            this.ol = document.querySelector('[data-ol="idea"]');
            this.flag = {
                scrollList: true,
                listEnd: true
            };
            this.lastResult = {
                action: 'listIdea',
                last_result: 0
            }
            this.getIdeaList();
        };
        getIdeaList() {
            if (this.flag.scrollList) {
                windowScroll(this.throttled(this.loadingListIdea.bind(this), 900));
            };
            this.loadingListIdea();
            this.flag.scrollList = false;
        };
        loadingListIdea() {
            if (this.flag.listEnd) {
                dataFetch('ajax.php', this.lastResult, 0).then(data => {
                    this.addDataToDOM(data);
                }).finally(() => {
                    console.log('end');
                });
            };
        };
        addDataToDOM(data) {
            if (data.length) {
                let color,
                    divDat = '';
                const lastResult = [],
                    listLi = document.createDocumentFragment();
                data.forEach(obj => {
                    color = this.border(obj.status * 1);
                    lastResult.push(obj.id_idea);
                    console.log(obj.id_users)
                    this.lastResult.last_result = Math.min(...lastResult);
                    const postElement = document.createElement('tbody');
                    postElement.setAttribute('data-id_idea', `${obj.id_idea}`);
                    postElement.style.setProperty('--color', `${color.border}`);
                    if (obj.date_implementation) {
                        divDat = `Data wdrożenia: ${(obj.date_implementation)}`;
                    };
                    postElement.innerHTML = `
                    <tr style="line-height: 1.2rem; background-color: ${color.back};">
                    <th class="idea_authors">${(obj.id_users.length > 1) ? 'Pomysłodawcy' : 'Pomysłodawca'}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th class="date_add">Data dodania: ${(obj.date_added).slice(0,10)}</th>
                </tr>
                <tr>
                    <td rowspan="5">
                        <ol>
                            ${obj.id_users.map(name =>`<li>${name}</li>`).join('')}
                        </ol>
                    </td>
                    <th colspan=" 4" class="title">
                        Opis stanu obecnego
                    </th>
                </tr>
                <tr>
                    <td colspan="4">
                        ${obj.before_value}
                    </td>
                </tr>
                <tr>
                    <th colspan="4" class="title">
                        Propozycja usprawnienia
                    </th>
                </tr>
                <tr>
                    <td colspan="4">
                        ${obj.after_value}
                    </td>
                </tr>
                <tr>
                    <th>Przyznane punkty: ${(obj.pkt_mod) ? obj.pkt_mod : 0}</th>
                    <th>Status: ${color.status}</th>
                    <th>Numer propozycji: ${obj.id_idea}</th>
                    <th>${divDat}</th>
                </tr>
    `;
                    divDat = '';
                    listLi.appendChild(postElement);
                    if (obj.id_idea * 1 === 1) this.flag.listEnd = false;
                })
                this.ol.appendChild(listLi);
            } else {
                this.ol.innerHTML = '<tr><td><h4 class="empty_idea">Brak elementów do wyświetlenia.</h4></td></tr>';
            }
        };
        border(st) {
            switch (st) {
                case 0:
                    return {
                        border: 'rgb(255, 209, 102)', back: 'rgba(255, 209, 102, 0.1)', status: 'Oczekuje'
                    };
                case 1:
                    return {
                        border: 'rgb(6, 214, 160)', back: 'rgba(6, 214, 160, 0.1)', status: 'Zakceptowany'
                    };
                case 2:
                    return {
                        border: 'rgb(17, 138, 178)', back: 'rgb(17, 138, 178, 0.1)', status: 'Wdrożony'
                    };
                case 3:
                    return {
                        border: 'rgb(239, 71, 111)', back: 'rgba(239, 71, 111, 0.1)', status: 'Odrzucony'
                    };
                case 4:
                    return {
                        border: 'rgb(7, 59, 76)', back: 'rgb(7, 59, 76, 0.1)', status: 'Kopia'
                    };
                default:
                    return {
                        border: '', back: '', status: ''
                    };
            };
        };
        throttled(f, t) {
            let l = Date.now();
            return function () {
                l + t - Date.now() < 0 && (f(), l = Date.now())
            };
        };
    };
    const IDEALIST = new IdeaList();

});