'use strict';
import { TimeApp } from './modules/seting.esm.js';
import Api from './modules/Api.esm.js';
import TbodyTopTen from './modules/statistics/TbodyTopTen.esm.js';

const statisticsDOM = {
    request: 'topTen',
    users: {
        quarter: document.querySelector('[data-statistics="user_quarter"]'),
        list: document.querySelector('[data-statistics="users_list"]'),
    },
    area: {
        quarter: document.querySelector('[data-statistics="area_quarter"]'),
        list: document.querySelector('[data-statistics="areas_list"]'),
    },
};

class TopTen {
    #requestParam;
    #Api;
    #userDOM;
    #areaDOM;
    #flagQuarter = 0;
    #flagButton = 0;

    constructor(statisticsDOM) {
        this.#requestParam = {
            request: statisticsDOM.request,
            quarter: TimeApp.quarterYear(),
        };
        this.#Api = new Api();
        this.#userDOM = statisticsDOM.users;
        this.#areaDOM = statisticsDOM.area;
    }
    init() {
        this.#requestAPI();
        this.#eventListeners();
    }
    #requestAPI = () => {
        document.body.style.cursor = 'progress';
        this.#Api
            .getJson(this.#requestParam)
            .then((data) => {
                this.apiData = data;
                this.#responseAPI();
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #responseAPI() {
        if (this.#requestParam.request !== this.#flagButton || this.apiData.quarter !== this.#flagQuarter) {
            const { user, area, quarter } = this.apiData;
            this.#flagQuarter = quarter;
            this.#flagButton = this.#requestParam.request;

            switch (this.#flagButton) {
                case 'topUsers':
                    this.#displayTopTen(user, this.#userDOM);
                    break;
                case 'topArea':
                    this.#displayTopTen(area, this.#areaDOM);
                    break;
                case 'topTen':
                    this.#displayTopTen(user, this.#userDOM);
                    this.#displayTopTen(area, this.#areaDOM);
                    break;
            }
        }
    }
    #eventListeners() {
        this.#userDOM.quarter.addEventListener('click', this.#changeQuarter);
        this.#areaDOM.quarter.addEventListener('click', this.#changeQuarter);
    }
    #changeQuarter = (event) => {
        if (event.target.nodeName === 'BUTTON') {
            this.#requestParam.quarter = event.target.getAttribute('data-quarter');
            this.#requestParam.request = event.target.getAttribute('data-request');
            if (this.#flagQuarter != this.#requestParam.quarter || this.#flagButton != this.#requestParam.request) this.#requestAPI(this.#requestParam);
        }
    };

    #displayTopTen(data, view) {
        const viewList = view.list;
        if (data.length > 0) {
            this.#cleanTable(viewList);
            viewList.appendChild(new TbodyTopTen(data).get());
        } else {
            this.#cleanTable(viewList);
        }
        this.#changeOrnament(view.quarter);
    }
    #changeOrnament(quarter) {
        [...quarter.children].forEach((li) => {
            if (li.classList.contains('ornament_line')) li.classList.remove('ornament_line');
        });

        [...quarter.children][this.#flagQuarter - 1].classList.add('ornament_line');
    }
    #cleanTable(viewList) {
        if (viewList.tBodies.length > 0) {
            const tbody = viewList.tBodies[0];
            tbody.parentNode.removeChild(tbody);
        }
    }
}

new TopTen(statisticsDOM).init();
