'use strict';
export default class Idea {
    #status;
    #article;
    #topic;
    #after_value;
    #before_value;
    #rating_user;
    #mod_comment;
    #array_users;
    #area_name;
    #awarded_points;
    #date_added;
    #date_implementation;
    #idea_status;
    #token_idea;
    render({
        topic,
        after_value,
        before_value,
        rating_user,
        mod_comment,
        array_users,
        area_name,
        awarded_points,
        date_added,
        date_implementation,
        idea_status,
        token_idea,
    }) {
        this.#article = document.createElement('article');
        this.#topic = topic;
        this.#after_value = after_value;
        this.#before_value = before_value;
        this.#rating_user = rating_user;
        this.#array_users = array_users;
        this.#mod_comment = mod_comment;
        this.#area_name = area_name;
        this.#awarded_points = awarded_points;
        this.#date_added = date_added;
        this.#date_implementation = date_implementation;
        this.#idea_status = idea_status;
        this.#token_idea = token_idea;
        this.#init();
    }
    get = () => this.#article;
    #init() {
        this.#status = this.#statusInformation(parseInt(this.#idea_status, 10));
        if (this.#awarded_points) this.#awarded_points = this.#awarded_points.replace(/(\.0|\.00)$|(0)$/, '');
        this.#createElement();
    }
    #createElement() {
        this.#article.classList.add('idea');
        this.#article.setAttribute('data-token_idea', `${this.#token_idea}`);
        this.#article.insertAdjacentHTML('afterbegin', this.#renderHTML());
    }
    #renderHTML() {
        return `
        <h3 class="topic"><span>${this.#topic || ''}</span></h3>
        <div class="shadow ${this.#status.class}">
            <div class="tr ${this.#status.back}">
                <span class="th">${this.#array_users.length > 1 ? 'Pomysłodawcy' : 'Pomysłodawca'}</span>
                <span class="th">Obszar: ${this.#area_name}</span>
                <span class="th">Status: ${this.#status.status}</span>
                <span class="th">Data dodania: <span class="font_number">${this.#date_added}</span></span>
            </div>
            <div class="tr">
                <div class="td idea_authors">
                    <ol>
                        ${this.#array_users.map((name) => `<li class="idea_text">${name}</li>`).join('')}
                    </ol>
                </div>
                <div class="td idea_value">
                    <span class="th"><em>Opis stanu obecnego</em></span>
                    <p class="td idea_text"> ${this.#before_value} </p>
                    <span class="th"><em>Propozycja usprawnienia</em></span>
                    <p class="td idea_text"> ${this.#after_value} </p>
                    ${this.#setInfo('Oszczędności', this.#saving(this.#rating_user.saving))}
                    ${this.#modComment()}
                </div>
            </div>
            <div class="tr">
                ${this.#setInfo('Numer pomysłu', this.#token_idea)}
                ${this.#setInfo('Data wdrożenia', this.#date_implementation)}
                ${this.#setInfo('Przyznane punkty', this.#awarded_points)}
        
            </div>
        </div>
        `;
    }
    #modComment = () => (this.#mod_comment ? `<p class="th"><em>Komentarz Moderatora</em></p> <p class="td idea_text"> ${this.#mod_comment} </p>` : '');
    #setInfo = (text, data) => (data ? `<span class="th">${text}: <span class="font_number">${data * 1 ? data + 'pkt' : data}</span></span>` : '');
    #saving = (str) => (str === 'TAK' || str == 1 ? 'TAK' : '');
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
