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
                windowScroll(this.throttled(this.loadingListIdea.bind(this), 800));
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
                    lastResult.push(obj.id_idea)
                    this.lastResult.last_result = Math.min(...lastResult);
                    const postElement = document.createElement('li');
                    postElement.classList.add('idea_li');
                    postElement.setAttribute('data-id_idea', `${obj.id_idea}`);
                    postElement.style.setProperty('--color', `${color.border}`);
                    if (obj.date_implementation) {
                        divDat = `<div><span class="idea_date_imp">Data wdrożenia: ${(obj.date_implementation)}</span></div>`;
                    };

                    postElement.innerHTML = `
    <span class="idea_date_in font_pattern">Data dodania: ${(obj.date_added).slice(0,10)}</span>
    <div class="idea_container">
        <ol class="idea_authors">
            <span class="idea_title font_pattern">${(obj.id_users.length > 1) ? 'Pomysłodawcy' : 'Pomysłodawca'}</span>
            ${obj.id_users.map(name =>`<li>${name}</li>`).join('')}
        </ol>
        <div class="idea_value">
            <span class="idea_title font_pattern">Opis stanu obecnego</span>
            <p class="idea_contents">${obj.before_value}</p>
            <span class="idea_title font_pattern">Propozycja usprawnienia</span>
            <p class="idea_contents">${obj.after_value}</p>
        </div>
    </div>
    <div class="idea_footer font_pattern" style="background-color: ${color.back}">
        <div><span class="idea_pkt">Przyznane punkty: ${(obj.pkt_mod) ? obj.pkt_mod : 0}</span></div>
        <div><span class="idea_stat">Status: ${color.status}</span></div>
        <div><span class="idea_num">Numer propozycji: ${obj.id_idea}</span></div>
        ${divDat}
    </div>
    `;
                    divDat = '';
                    listLi.appendChild(postElement);
                    if (obj.id_idea * 1 === 1) this.flag.listEnd = false;
                })
                this.ol.appendChild(listLi);
            } else {
                this.ol.innerHTML = '<li><h4 class="empty_idea">Brak elementów do wyświetlenia.</h4></li>';
            }
        };
        border(st) {
            switch (st) {
                case 0:
                    return {
                        border: 'rgb(255, 209, 102)', back: 'rgba(255, 209, 102, 0.2)', status: 'Oczekuje'
                    };
                case 1:
                    return {
                        border: 'rgb(6, 214, 160)', back: 'rgba(6, 214, 160, 0.2)', status: 'Zakceptowany'
                    };
                case 2:
                    return {
                        border: 'rgb(17, 138, 178)', back: 'rgb(17, 138, 178, 0.2)', status: 'Wdrożony'
                    };
                case 3:
                    return {
                        border: 'rgb(239, 71, 111)', back: 'rgba(239, 71, 111, 0.2)', status: 'Odrzucony'
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