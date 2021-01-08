'use strict';
import {
    dataFetch,
    windowScroll,
    ajaxException
} from './abstract.js';
document.addEventListener('DOMContentLoaded', function () {

    class IdeaList {
        constructor() {
            this.table = document.querySelector('[data-table="idea"]');
            this.load = document.querySelector('.border_icon');
            this.flag = {
                scrollList: true,
                listEnd: true
            };
            this.request = {
                action: 'listIdea',
                last_result: 0
            };
            this.tbody = document.createDocumentFragment();
            this.tr = null;
            this.statusInfo = null;
            this.ideaNumber = [];
            this.loadingIdeaList();
        };
        loadingIdeaList() {
            if (this.flag.scrollList) {
                windowScroll(this.throttled(this.getListIdea.bind(this), 950));
            };
            this.getListIdea();
            this.flag.scrollList = false;
        };
        getListIdea() {
            if (this.flag.listEnd) {
                this.load.classList.remove('load');
                dataFetch('ajax.php', this.request, 0).then(data => {
                    if (ajaxException(data)) this.renderIdea(data);
                }).finally(() => {
                    this.load.classList.add('load');
                });
            };
        };
        renderIdea(data) {
            if (data.length) {
                data.forEach(obj => {
                    this.statusInfo = this.renderInfo(obj.status * 1);
                    this.ideaNumber.push(obj.id_idea);
                    this.tr = document.createElement('div');
                    this.tr.className = 'tbody';
                    this.tr.setAttribute('data-id_idea', `${obj.id_idea}`);
                    this.tr.style.setProperty('--color', `${this.statusInfo.border}`);
                    this.tr.innerHTML = this.renderInner(obj);
                    this.tbody.appendChild(this.tr);
                    if (obj.id_idea * 1 === 1) this.flag.listEnd = false;
                });
                this.request.last_result = Math.min(...this.ideaNumber);
                this.addIdea();
            } else {
                this.table.innerHTML = '<div class=tbody"><h4 class="empty_idea">Brak elementów do wyświetlenia.</h4></div>';
            }
        };
        renderInner(obj) {
            return `
        <div class="tr" style="background-color: ${this.statusInfo.back};">
            <span class="th">${(obj.id_users.length > 1) ? 'Pomysłodawcy' : 'Pomysłodawca'}</span>
            <span class="th">Status: ${this.statusInfo.status}</span>
            <span class="th">Przyznane punkty: ${(obj.pkt_mod) ? obj.pkt_mod : 0}</span>
            <span class="th">Data dodania: ${(obj.date_added).slice(0,10)}</span>
        </div>
        <div class="tr">
            <div class="td author">
                <ol>
                    ${obj.id_users.map(name =>`<li>${name}</li>`).join('')}
                </ol>
            </div>
            <div class="td idea">
                <span class="th"> Opis stanu obecnego </span>
                <p class="td"> ${obj.before_value} </p>
                <span class="th"> Propozycja usprawnienia </span>
                <p class="td"> ${obj.after_value} </p>
            </div>
        </div>
        <div class="tr">
            <span class="th">Numer propozycji: ${obj.id_idea}</span>
            <span class="th date_add">${this.renderDataAdd(obj.date_implementation)}</span>
        </div>
        `;
        };
        renderDataAdd(date) {
            return (date) ? `Data wdrożenia: ${date}` : '';
        };
        addIdea() {
            this.table.appendChild(this.tbody);
        };
        renderInfo(st) {
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