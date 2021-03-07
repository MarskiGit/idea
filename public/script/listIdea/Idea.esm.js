'use strict';
export default class Idea {
    #status = {
        class: 'waiting',
        back: 'waiting_back',
        status: 'Oczekuje',
    };
    #div = document.createElement('div');
    constructor(idea) {
        this.idea = idea;
        this.#init();
    }
    getIdea() {
        return this.#div;
    }
    #init() {
        this.#status = this.#statusInformation(parseInt(this.idea.status, 10));
        this.#createElement();
    }
    #createElement() {
        this.#div.classList.add('idea', `${this.#status.class}`);
        this.#div.setAttribute('data-id_idea', `${this.idea.id_idea}`);
        this.#div.insertAdjacentHTML('afterbegin', this.#render());
    }
    #render() {
        return `
        <div class="tr ${this.#status.back}">
            <span class="th">${this.idea.creators.length > 1 ? 'Pomysłodawcy' : 'Pomysłodawca'}</span>
            <span class="th">Status: ${this.#status.status}</span>
            <span class="th">Przyznane punkty: ${this.idea.pkt_mod ? this.idea.pkt_mod : 0}</span>
            <span class="th">Data dodania: ${this.idea.date_added.slice(0, 10)}</span>
        </div>
        <div class="tr">
            <div class="td idea_authors">
                <ol>
                    ${this.idea.creators.map((name) => `<li>${name}</li>`).join('')}
                </ol>
            </div>
            <div class="td idea_value">
                <span class="th"> Opis stanu obecnego </span>
                <p class="td"> ${this.idea.before_value} </p>
                <span class="th"> Propozycja usprawnienia </span>
                <p class="td"> ${this.idea.after_value} </p>
            </div>
        </div>
        <div class="tr">
            <span class="th">Numer propozycji: ${this.idea.id_idea}</span>
            ${this.#dataAdded(this.idea.date_implementation)}
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
