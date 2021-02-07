'use strict';
import FetchAbstract from './FetchAbstract.js';
export default class LiveSearch extends FetchAbstract {
    constructor({
        view,
        chosenOnes,
        inputSearch,
        request
    }) {
        super();
        this.view = view;
        this.chosenOnes = chosenOnes;
        this.inputSearch = inputSearch;
        this.listUser = document.createDocumentFragment();
        this.idUser = [];
        this.request = {
            action: request
        };
        this.start();
    }
    start() {
        this.inputSearch.addEventListener('input', this.debounced(this.search, 500));
    };
    search = ({
        target
    }) => {
        (this.verificationSymbol(target.value)) ? this.errorSymbol(1): this.checkSearch(target);
    };
    errorSymbol(bool) {
        if (bool) {
            this.inputSearch.labels[0].style.color = 'red';
            this.inputSearch.labels[0].textContent = 'Tylko znaki alfabetu i cyfry';
            this.inputSearch.classList.add('errorSearch');
        } else {
            this.inputSearch.labels[0].style.color = '';
            this.inputSearch.labels[0].textContent = 'Wyszukaj i kliknij:';
            this.inputSearch.classList.remove('errorSearch');
        };
    };
    checkSearch(target) {
        this.errorSymbol(0);
        (target.value.length >= 3) ? this.typeValueSought(target): this.view.classList.remove('on')
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
            this.createLi(param);
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
        const li = document.createElement('li');
        li.setAttribute('class', `${(row)? 'view_li' : 'view_li creator_li'}`);
        li.setAttribute('data-id', `${(id_user)? id_user: id_area}`);
        li.innerText = `${(user_name)? user_name : area_name}`;
        this.listUser.appendChild(li);
    }
    addListPage() {
        this.view.innerText = '';
        this.view.classList.add('on');
        this.view.appendChild(this.listUser);
    };
    verificationSymbol = char => /[^A-Z-ŚŁŻŹĆa-z-ęóąśłżźćń\s0-9]/gi.test(char);
    debounced(f, t) {
        let l;
        return (...a) => {
            const c = this;
            clearTimeout(l), l = setTimeout(() => f.apply(c, a), t);
        };
    };
};