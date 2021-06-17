'use strict';
import AjaxRequest from './modules/AjaxRequest.esm.js';
import { quarterYear } from './modules/seting.esm.js';

const homeObjects = {
    message: document.querySelector('[data-js="private"]'),
};

const topTenObjects = {
    request: 'topTen',
    users: {
        userQuarter: document.querySelector('[data-topuser="user_quarter"]'),
        usersList: document.querySelector('[data-topuser="users_list"]'),
    },
    area: {
        areaQuarter: document.querySelector('[data-toparea="area_quarter"]'),
        areasList: document.querySelector('[data-toparea="areas_list"]'),
    },
};

class Private {
    #message;
    constructor(homeObjects) {
        this.#message = homeObjects.message;
        this.#hide();
    }
    #hide() {
        this.#message.style.display = 'none';
    }
}

class TopTen {
    #AjaxRequest;
    #ajaxData;
    #requestParam = {};
    #usersDOM;
    #areaDOM;
    #fragmentDOM = document.createDocumentFragment();
    #quarterYear;
    #topTen;
    constructor(topTenObjects) {
        this.#usersDOM = topTenObjects.users;
        this.#areaDOM = topTenObjects.area;
        this.#AjaxRequest = new AjaxRequest(topTenObjects.request);
        this.#quarterYear = quarterYear(new Date());
    }
    init() {
        this.#requestParam.quarter = this.#quarterYear;
        this.#sendRequest();
        this.#eventListeners();
        this.#quarterYearOrnament();
    }
    #eventListeners() {}
    #quarterYearOrnament() {
        [...this.#usersDOM.userQuarter.children][this.#quarterYear - 1].classList.add('ornament_line');
        [...this.#areaDOM.areaQuarter.children][this.#quarterYear - 1].classList.add('ornament_line');
    }
    #sendRequest = () => {
        document.body.style.cursor = 'progress';
        this.#AjaxRequest
            .getJson(this.#requestParam)
            .then((data) => {
                const { user } = this.#AjaxRequest.getData(data);
                this.userArray = user;
                this.#renderHTML(user);
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #renderHTML(user) {
        const tbody = document.createElement('tbody'),
            firstIn = [],
            lastIn = [];
        let pkt = [],
            bool = 0,
            i = 1;

        user.sort((a, b) => b.points - a.points);
        for (const td of user) {
            pkt.push(parseInt(td.points));
        }

        for (const [l, { points }] of user.entries()) {
            let intPoint = parseInt(points);

            firstIn.push(pkt.indexOf(intPoint));
            lastIn.push(pkt.lastIndexOf(intPoint));
            if (pkt[l + 1] === intPoint && l > bool) {
                let fragmentOffer = [];
                this.#topTen = [...user];
                fragmentOffer = this.#topTen.slice(firstIn[l], lastIn[l] + 1);

                fragmentOffer.sort((a, b) => b.offers - a.offers);

                this.#topTen.splice(firstIn[l], fragmentOffer.length, ...fragmentOffer);

                bool = fragmentOffer.length + l - 1;
            }
        }

        for (const td of this.#topTen) {
            tbody.insertAdjacentHTML('beforeend', this.#renderTr(i, td));
            i++;
        }

        this.#addDOM(tbody);
    }
    #addDOM(tbody) {
        this.#usersDOM.usersList.appendChild(tbody);
    }
    #renderTr(i, { full_name, offers, points }) {
        let stat = i <= 3 ? this.#statusInformation(i) : '';
        return `
        <tr>
        <td class="${stat.class}">${i}</td>
        <td>${full_name}</td>
        <td>${offers}</td>
        <td>${points}</td>
        </tr>
        `;
    }
    #statusInformation(st) {
        switch (st) {
            case 1:
                return {
                    class: 'gold',
                };
            case 2:
                return {
                    class: 'silver',
                };
            case 3:
                return {
                    class: 'brown',
                };
            default:
                return {
                    class: '',
                };
        }
    }
    #winer() {
        const points = [77.25, 45.75, 20.5, 45];
        const offers = [3, 3, 1, 2];

        let offer = [...offers];
        const firstIn = [];
        const lastIn = [];
        let bool = 0;
        for (const [l, td] of points.entries()) {
            lastIn.push(points.lastIndexOf(td));
            firstIn.push(points.indexOf(td));

            if (points[l + 1] === td && l > bool) {
                let fragmentOffer = [];
                offer = [...offers];
                fragmentOffer = offer.slice(firstIn[l], lastIn[l] + 1);

                fragmentOffer.sort((a, b) => b - a);

                offer.splice(firstIn[l], fragmentOffer.length, ...fragmentOffer);

                bool = fragmentOffer.length + l - 1;
            }

            console.log(`${l} punkty: ${td}, ofert ${offer[l]}`);
            // offer = [...this.offers];
        }
    }
}

new Private(homeObjects);
new TopTen(topTenObjects).init();
