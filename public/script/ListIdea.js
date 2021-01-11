'use strict';
import {
    dataFetch,
    eventWindowScroll,
    displayException,
    pageLoadingStatus
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {

    class ListIdea {
        constructor() {
            this.ideaContainer = document.querySelector('[data-idea="idea_container"]');
            this.endTuples = false;
            this.request = {
                action: 'ideaList',
                last_tuple: 0
            };
            this.list = document.createDocumentFragment();
            this.div = null;
            this.status = null;
            this.tupleNumber = [];
            this.ListIdea();
        };
        ListIdea() {
            this.getIdeaList();
            eventWindowScroll(this.throttled(this.getIdeaList.bind(this), 950));
        };
        getIdeaList() {
            if (!this.endTuples) {
                pageLoadingStatus(1);
                dataFetch('ajax.php', this.request, 0)
                    .then(data => {
                        (data.exception) ? displayException(data): this.renderList(data);
                    })
                    .finally(() => {
                        pageLoadingStatus(0);
                    });
            };
        };
        renderList(listIdea) {
            if (listIdea.length) {
                listIdea.forEach(idea => {
                    this.status = this.state(idea.status * 1);
                    this.tupleNumber.push(idea.id_idea);
                    this.div = document.createElement('div');
                    this.div.className = 'idea';
                    this.div.setAttribute('data-id_idea', `${idea.id_idea}`);
                    this.div.style.setProperty('--color', `${this.status.border}`);
                    this.div.innerHTML = this.renderIdea(idea);
                    this.list.appendChild(this.div);
                    if (idea.id_idea * 1 === 1) this.endTuples = true;
                });
                this.request.last_tuple = Math.min(...this.tupleNumber);
                this.addListPage();
            } else {
                this.ideaContainer.innerHTML = '<div class=IdeaList"><h4 class="empty_idea">Brak elementów do wyświetlenia.</h4></div>';
            }
        };
        renderIdea(idea) {
            return `
        <div class="tr" style="background-color: ${this.status.back};">
            <span class="th">${(idea.id_users.length > 1) ? 'Pomysłodawcy' : 'Pomysłodawca'}</span>
            <span class="th">Status: ${this.status.status}</span>
            <span class="th">Przyznane punkty: ${(idea.pkt_mod) ? idea.pkt_mod : 0}</span>
            <span class="th">Data dodania: ${(idea.date_added).slice(0,10)}</span>
        </div>
        <div class="tr">
            <div class="td idea_authors">
                <ol>
                    ${idea.id_users.map(name =>`<li>${name}</li>`).join('')}
                </ol>
            </div>
            <div class="td idea_value">
                <span class="th"> Opis stanu obecnego </span>
                <p class="td"> ${idea.before_value} </p>
                <span class="th"> Propozycja usprawnienia </span>
                <p class="td"> ${idea.after_value} </p>
            </div>
        </div>
        <div class="tr">
            <span class="th">Numer propozycji: ${idea.id_idea}</span>
            <span class="th idea_date_add">${this.renderDataAdd(idea.date_implementation)}</span>
        </div>
        `;
        };
        renderDataAdd(date) {
            return (date) ? `Data wdrożenia: ${date}` : '';
        };
        addListPage() {
            this.ideaContainer.appendChild(this.list);
        };
        state(st) {
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
    const LISTIDEA = new ListIdea();

});