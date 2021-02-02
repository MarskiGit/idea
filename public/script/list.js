'use strict';
import {
    eventWindowScroll,
    FetchAbstract
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {

    class ListIdea extends FetchAbstract {
        constructor() {
            super();
            this.ideaContainer = document.querySelector('[data-idea="idea_container"]');
            this.endTuples = false;
            this.request = {
                action: 'listIdea',
                last_tuple: 0
            };
            this.list = document.createDocumentFragment();
            this.div = null;
            this.status = null;
            this.tupleNumber = [];
            this.start();
        };
        start() {
            this.send();
            eventWindowScroll(this.throttled(this.send.bind(this), 950));
        };
        answer(data) {
            if (data.length) {
                data.forEach(idea => {
                    const {
                        status,
                        id_idea
                    } = idea;
                    this.status = this.statusInformation(status * 1);
                    this.tupleNumber.push(id_idea);
                    const div = document.createElement('div');
                    div.className = 'idea';
                    div.setAttribute('data-id_idea', `${id_idea}`);
                    div.style.setProperty('--color', `${this.status.border}`);
                    div.innerHTML = this.renderIdea(idea);
                    this.list.appendChild(div);
                    if (id_idea * 1 === 1) this.endTuples = true;
                });
                this.request.last_tuple = Math.min(...this.tupleNumber);
                this.addListPage();
            } else if (this.request.last_tuple === 0) {
                this.ideaContainer.innerHTML = '<div class=IdeaList"><h4 class="empty_idea">Brak elementów do wyświetlenia.</h4></div>';
            }
        };
        renderIdea({
            creators,
            id_idea,
            pkt_mod,
            date_added,
            before_value,
            after_value,
            date_implementation
        }) {
            return (`
        <div class="tr" style="background-color: ${this.status.back};">
            <span class="th">${(creators.length > 1) ? 'Pomysłodawcy' : 'Pomysłodawca'}</span>
            <span class="th">Status: ${this.status.status}</span>
            <span class="th">Przyznane punkty: ${(pkt_mod) ? pkt_mod : 0}</span>
            <span class="th">Data dodania: ${(date_added).slice(0,10)}</span>
        </div>
        <div class="tr">
            <div class="td idea_authors">
                <ol>
                    ${creators.map(name =>`<li>${name}</li>`).join('')}
                </ol>
            </div>
            <div class="td idea_value">
                <span class="th"> Opis stanu obecnego </span>
                <p class="td"> ${before_value} </p>
                <span class="th"> Propozycja usprawnienia </span>
                <p class="td"> ${after_value} </p>
            </div>
        </div>
        <div class="tr">
            <span class="th">Numer propozycji: ${id_idea}</span>
            ${this.renderDataAdd(date_implementation)}
        </div>
        `);
        };
        renderDataAdd(date) {
            return (date) ? `<span class="th idea_date_add">Data wdrożenia: ${date}</span>` : '';
        };
        addListPage() {
            this.ideaContainer.appendChild(this.list);
        };
        statusInformation(st) {
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