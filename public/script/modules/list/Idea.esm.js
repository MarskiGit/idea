'use strict';
export default class Idea {
    #status = {
        class: 'waiting',
        back: 'waiting_back',
        status: 'Oczekuje',
    };
    #div = document.createElement('article');
    #id;
    #array_users;
    #date_added;
    #before_value;
    #after_value;
    #idea_status;
    #area_name;
    #token_idea;
    #date_implementation;
    constructor({ id_idea, id_area, after_value, before_value, others_value, array_users, area_name, date_added, date_implementation, idea_status, token_idea }) {
        this.#idea_status = idea_status;
        this.#id = id_idea;
        this.#area_name = id_area.area_name;
        this.#array_users = array_users;
        this.#date_added = date_added;
        this.#before_value = before_value;
        this.#after_value = after_value;
        this.#date_implementation = date_implementation;
        this.#token_idea = token_idea;
        this.#area_name = area_name.area_name;
        console.log(this.#area_name);
        this.#init();
    }
    getIdea = () => this.#div;
    #init() {
        this.#status = this.#statusInformation(parseInt(this.#idea_status, 10));
        this.#createElement();
    }
    #createElement() {
        this.#div.classList.add('idea', `${this.#status.class}`);
        this.#div.setAttribute('data-id', `${this.#token_idea}`);
        this.#div.insertAdjacentHTML('afterbegin', this.#renderHTML());
    }
    #renderHTML() {
        return `
        <div class="tr ${this.#status.back}">
            <span class="th">${this.#array_users.length > 1 ? 'Pomysłodawcy' : 'Pomysłodawca'}</span>
            <span class="th">Obszar: ${this.#area_name}</span>
            <span class="th">Status: ${this.#status.status}</span>
            <span class="th">Data dodania: ${this.#date_added}</span>
        </div>
        <div class="tr">
            <div class="td idea_authors">
                <ol>
                    ${this.#array_users.map((name) => `<li>${name}</li>`).join('')}
                </ol>
            </div>
            <div class="td idea_value">
                <span class="th"><em>Opis stanu obecnego</em></span>
                <p class="td"> ${this.#before_value} </p>
                <span class="th"><em>Propozycja usprawnienia</em></span>
                <p class="td"> ${this.#after_value} </p>
            </div>
        </div>
        <div class="tr">
            <span class="th">Numer propozycji: ${this.#token_idea}</span>
            ${this.#dataAdded(this.#date_implementation)}
        </div>
        `;
    }
    #dataAdded = (date) => (date ? `<span class="th idea_date_add">Data wdrożenia: ${date}</span>` : '');
    #statusInformation(st) {
        switch (st) {
            case 0:
                return {
                    class: 'waiting',
                    back: 'waiting_back',
                    status: 'Oczekuje',
                };
            case 1:
                return {
                    class: 'accepted',
                    back: 'accepted_back',
                    status: 'Zakceptowany',
                };
            case 2:
                return {
                    class: 'deployed',
                    back: 'deployed_back',
                    status: 'Wdrożony',
                };
            case 3:
                return {
                    class: 'rejected',
                    back: 'rejected_back',
                    status: 'Odrzucony',
                };
            case 4:
                return {
                    class: 'copy',
                    back: 'copy_back',
                    status: 'Kopia',
                };
            default:
                return {
                    class: '',
                    back: '',
                    status: '',
                };
        }
    }
}
