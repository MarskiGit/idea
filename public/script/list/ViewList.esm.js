'use strict';
export default class ViewList {
    #fragmetnList = document.createDocumentFragment();
    #tupleNumber = [];
    #status = null;
    constructor({ listContainer }) {
        this.listContainer = listContainer;
        this.endTuples = false;
        this.lastTuple = 0;
    }
    createList(data) {
        if (data.length) {
            data.forEach((idea) => {
                const { status, id_idea } = idea;
                this.#status = this.#statusInformation(status * 1);
                this.#tupleNumber.push(id_idea);
                const div = document.createElement('div');
                div.className = 'idea';
                div.setAttribute('data-id_idea', `${id_idea}`);
                div.insertAdjacentHTML('afterbegin', this.#renderIdea(idea));
                div.classList.add(`${this.#status.class}`);
                this.#fragmetnList.appendChild(div);
                if (id_idea * 1 === 1) this.endTuples = true;
            });
            this.lastTuple = Math.min(...this.#tupleNumber);
            this.#addListPage();
        } else if (this.lastTuple === 0) {
            this.#fragmetnList.innerHTML = '<div class=IdeaList"><h4 class="empty_idea">Brak elementów do wyświetlenia.</h4></div>';
        }
    }
    #renderIdea({ creators, id_idea, pkt_mod, date_added, before_value, after_value, date_implementation }) {
        return `
        <div class="tr ${this.#status.back}">
            <span class="th">${creators.length > 1 ? 'Pomysłodawcy' : 'Pomysłodawca'}</span>
            <span class="th">Status: ${this.#status.status}</span>
            <span class="th">Przyznane punkty: ${pkt_mod ? pkt_mod : 0}</span>
            <span class="th">Data dodania: ${date_added.slice(0, 10)}</span>
        </div>
        <div class="tr">
            <div class="td idea_authors">
                <ol>
                    ${creators.map((name) => `<li>${name}</li>`).join('')}
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
            ${this.#renderDataAdd(date_implementation)}
        </div>
        `;
    }
    #renderDataAdd = (date) => (date ? `<span class="th idea_date_add">Data wdrożenia: ${date}</span>` : '');
    #addListPage() {
        this.listContainer.appendChild(this.#fragmetnList);
    }
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
