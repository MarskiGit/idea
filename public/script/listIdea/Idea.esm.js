'use strict';
export default class Idea {
    #status = {
        class: 'waiting',
        back: 'waiting_back',
        status: 'Oczekuje',
    };
    #div = document.createElement('div');
    /**
     *  Klasa renderująca pomysł w HTML.
     * @param {!object} param0 Obiekt zawierający zestaw informacji potrzebny do wy renderowania pomysłu w HTML - destukturyzacja.
     */
    constructor({ status, id_idea, creators, pkt_mod, date_added, before_value, after_value, date_implementation }) {
        this.status = status;
        this.id = id_idea;
        this.creators = creators;
        this.pkt_mod = pkt_mod;
        this.date_added = date_added.slice(0, 10);
        this.before_value = before_value;
        this.after_value = after_value;
        this.date_implementation = date_implementation;
        this.#init();
    }
    /**
     * @returns Pobierz wy renderowany obiekt DOM.
     */
    getIdea() {
        return this.#div;
    }
    #init() {
        this.#status = this.#statusInformation(parseInt(this.status, 10));
        this.#createElement();
    }
    #createElement() {
        this.#div.classList.add('idea', `${this.#status.class}`);
        this.#div.setAttribute('data-id_idea', `${this.id}`);
        this.#div.insertAdjacentHTML('afterbegin', this.#renderHTML());
    }
    #renderHTML() {
        return `
        <div class="tr ${this.#status.back}">
            <span class="th">${this.creators.length > 1 ? 'Pomysłodawcy' : 'Pomysłodawca'}</span>
            <span class="th">Status: ${this.#status.status}</span>
            <span class="th">Przyznane punkty: ${this.pkt_mod ? this.pkt_mod : 0}</span>
            <span class="th">Data dodania: ${this.date_added}</span>
        </div>
        <div class="tr">
            <div class="td idea_authors">
                <ol>
                    ${this.creators.map((name) => `<li>${name}</li>`).join('')}
                </ol>
            </div>
            <div class="td idea_value">
                <span class="th"> Opis stanu obecnego </span>
                <p class="td"> ${this.before_value} </p>
                <span class="th"> Propozycja usprawnienia </span>
                <p class="td"> ${this.after_value} </p>
            </div>
        </div>
        <div class="tr">
            <span class="th">Numer propozycji: ${this.id}</span>
            ${this.#dataAdded(this.date_implementation)}
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
