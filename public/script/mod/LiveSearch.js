'use strict';
import {
    FetchAbstract
} from './FetchAbstract.js';
export {
    LiveSearch,
};

class LiveSearch extends FetchAbstract {
    constructor(search) {
        super();
        const [view, chosen, input, request] = search
        this.input = input;
        this.viewCreator = document.querySelector(`${view}`);
        this.chosenOnes = document.querySelector(`${chosen}`);
        this.creatorSearch = document.querySelector(`${input}`);
        this.listUser = document.createDocumentFragment();
        this.idUser = [];
        this.li = null;
        this.request = {
            action: request,
        };
        this.start();
    }
    start() {
        this.creatorSearch.addEventListener('input', this.debounced(this.search.bind(this), 500));
    };
    search({
        target
    }) {
        (this.verificationSymbol(target.value)) ? this.errorSymbol(1): this.checkSearch(target);
    };
    errorSymbol(bool) {
        if (bool) {
            this.creatorSearch.labels[0].style.color = 'red';
            this.creatorSearch.labels[0].textContent = 'Tylko znaki alfabetu i cyfry';
            this.creatorSearch.classList.add('errorSearch');
        } else {
            this.creatorSearch.labels[0].style.color = '';
            this.creatorSearch.labels[0].textContent = 'Wyszukaj i kliknij:';
            this.creatorSearch.classList.remove('errorSearch');
        };
    };
    checkSearch(target) {
        this.errorSymbol(0);
        (target.value.length >= 3) ? this.typeValueSought(target): this.viewCreator.classList.remove('on')
    };
    typeValueSought(target) {
        if (target.dataset.write === 'creator_search') {
            (target.value * 1) ? this.request.select = 'user_number': this.request.select = 'user_name';
            this.request.user_name = target.value;
        } else {
            this.request.area_name = target.value;
        };
        this.sendRequest();
    };
    answerFetch(data) {
        data.forEach(param => {
            this.createLi(param)
        });
        this.addListPage();
    };
    createLi({
        id_user,
        id_area,
        user_name,
        area_name,
        row
    }) {
        let li = document.createElement('li');
        li.setAttribute('class', `${(row)? 'view_li' : 'view_li creator_li'}`)
        li.setAttribute('data-id', `${(id_user)? id_user: id_area}`);
        li.innerText = `${(user_name)? user_name : area_name}`;
        this.listUser.appendChild(li);
    }
    addListPage() {
        this.viewCreator.innerText = '';
        this.viewCreator.classList.add('on')
        this.viewCreator.appendChild(this.listUser);
    };
    verificationSymbol = char => /[^A-Z-ŚŁŻŹĆa-z-ęóąśłżźćń\s0-9]/gi.test(char);
    debounced(f, t) {
        let l;
        return (...a) => {
            const c = this;
            clearTimeout(l), l = setTimeout(() => f.apply(c, a), t)
        };
    };
};